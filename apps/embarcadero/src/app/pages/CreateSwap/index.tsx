import { ArrowDownIcon } from '@radix-ui/react-icons'
import { Box, Button, Flex, triggerToast } from '@siafoundation/design-system'
import axios from 'axios'
import { useCallback, useMemo, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Input } from '../../components/Input'
import { Message } from '../../components/Message'
import { routes } from '../../routes'

type Direction = 'SCtoSF' | 'SFtoSC'

export function CreateSwap() {
  const history = useHistory()
  const { hash: encodedHash } = useParams<{ hash?: string }>()
  const hash = useMemo(
    () => (encodedHash ? decodeURIComponent(encodedHash) : undefined),
    [encodedHash]
  )
  const [direction, setDirection] = useState<Direction>('SCtoSF')
  const [sc, setSc] = useState<string>()
  const [sf, setSf] = useState<string>()
  const offerSc = direction === 'SCtoSF'

  const handleCreate = useCallback(
    (sc: number, sf: number) => {
      const func = async () => {
        const offer = offerSc ? `${sc}SC` : `${sf}SF`
        const receive = offerSc ? `${sf}SF` : `${sc}SC`

        try {
          const response = await axios({
            method: 'post',
            url: 'http://localhost:8080/api/create',
            headers: {
              'Content-Type': 'application/json',
            },
            data: {
              offer,
              receive,
            },
          })

          history.push(
            routes.step.replace(':hash', encodeURIComponent(response.data.hash))
          )
        } catch (e) {
          if (e instanceof Error) {
            console.log(e.message)
          }
        }
      }
      func()
    },
    [offerSc, history]
  )

  return (
    <Flex direction="column" align="center" gap="3">
      <Flex direction="column" align="center" css={{ width: '100%' }}>
        <Box css={{ width: '100%', order: offerSc ? 1 : 3 }}>
          <Input
            currency="SC"
            type="decimal"
            disabled={!!hash}
            value={sc}
            onChange={setSc}
            isOffer={offerSc}
          />
        </Box>
        <Box css={{ width: '100%', order: offerSc ? 3 : 1 }}>
          <Input
            currency="SF"
            type="integer"
            disabled={!!hash}
            value={sf}
            onChange={setSf}
            isOffer={!offerSc}
          />
        </Box>
        <Box css={{ height: '$2', zIndex: '$1', order: 2 }}>
          <Box
            onClick={() => {
              if (hash) {
                return
              }
              setDirection(direction === 'SCtoSF' ? 'SFtoSC' : 'SCtoSF')
            }}
            css={{
              position: 'relative',
              top: '-15px',
              height: '40px',
              width: '40px',
              backgroundColor: '$panel',
              borderRadius: '15px',
            }}
          >
            <Flex
              align="center"
              justify="center"
              css={{
                backgroundColor: '$gray7',
                borderRadius: '$4',
                position: 'absolute',
                transform: 'translate(-50%, -50%)',
                left: '50%',
                color: '$hiContrast',
                top: '50%',
                height: '30px',
                width: '30px',
                transition: 'background 0.1s linear',
                '&:hover': !hash && {
                  backgroundColor: '$siaGreenA10',
                },
              }}
            >
              <ArrowDownIcon />
            </Flex>
          </Box>
        </Box>
      </Flex>
      <Message
        message={`
          The party that contributes SC is responsible for paying the miner
          fee.
      `}
      />
      <Button
        size="3"
        disabled={!(sc && sf)}
        variant="green"
        css={{ width: '100%', textAlign: 'center' }}
        onClick={() => handleCreate(Number(sc), Number(sf))}
      >
        Generate swap
      </Button>
    </Flex>
  )
}
