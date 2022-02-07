import { ArrowDownIcon } from '@radix-ui/react-icons'
import {
  Box,
  Button,
  copyToClipboard,
  Flex,
  Text,
  TextArea,
} from '@siafoundation/design-system'
import {
  SiacoinInput,
  SiacoinOutput,
  SiafundInput,
  SiafundOutput,
  TransactionSignature,
} from '@siafoundation/sia-js'
import axios from 'axios'
import { useCallback, useState } from 'react'
import { Input } from '../Input'

type Direction = 'SCtoSF' | 'SFtoSC'

type SwapTransaction = {
  siacoinInputs: SiacoinInput
  siafundInputs: SiafundInput
  siacoinOutputs: SiacoinOutput
  siafundOutputs: SiafundOutput
  signatures: TransactionSignature
}

type Swap = {
  transaction: SwapTransaction
  hash: string
}

export function Create() {
  const [direction, setDirection] = useState<Direction>('SCtoSF')
  const [sc, setSc] = useState<string>()
  const [sf, setSf] = useState<string>()
  const [swap, setSwap] = useState<Swap>()
  const offerSc = direction === 'SCtoSF'

  const handleCreate = useCallback(
    (sc: number, sf: number, direction: Direction) => {
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
          console.log(response)
          setSwap(response.data)
        } catch (e: any) {
          console.log(e.response)
        }
      }
      func()
    },
    [offerSc]
  )

  return (
    <Flex direction="column" align="center" gap="3">
      <Flex direction="column" align="center" css={{ width: '100%' }}>
        <Box css={{ width: '100%', order: offerSc ? 1 : 3 }}>
          <Input
            currency="SC"
            type="decimal"
            value={sc}
            onChange={setSc}
            isOffer={offerSc}
          />
        </Box>
        <Box css={{ width: '100%', order: offerSc ? 3 : 1 }}>
          <Input
            currency="SF"
            type="integer"
            value={sf}
            onChange={setSf}
            isOffer={!offerSc}
          />
        </Box>
        <Box css={{ height: '$2', zIndex: '$1', order: 2 }}>
          <Box
            onClick={() => {
              if (swap) {
                return
              }
              setDirection(direction === 'SCtoSF' ? 'SFtoSC' : 'SCtoSF')
            }}
            css={{
              position: 'relative',
              top: '-15px',
              height: '40px',
              width: '40px',
              backgroundColor: '#fff',
              borderRadius: '15px',
            }}
          >
            <Flex
              align="center"
              justify="center"
              css={{
                backgroundColor: '$gray4',
                borderRadius: '$4',
                position: 'absolute',
                transform: 'translate(-50%, -50%)',
                left: '50%',
                top: '50%',
                height: '30px',
                width: '30px',
                transition: 'all 0.1s linear',
                '&:hover': !swap && {
                  backgroundColor: '$gray8',
                },
              }}
            >
              <ArrowDownIcon />
            </Flex>
          </Box>
        </Box>
      </Flex>
      <Box css={{ width: '100%' }}>
        <Button
          size="3"
          disabled={!(sc && sf)}
          variant="green"
          css={{ width: '100%', textAlign: 'center' }}
          onClick={() => handleCreate(Number(sc), Number(sf), direction)}
        >
          Generate swap
        </Button>
      </Box>
      {swap && (
        <Flex direction="column" gap="2">
          <Text>
            To proceed share the following hash with your counterparty.
          </Text>
          <TextArea
            size="3"
            rows={11}
            onSelect={() => null}
            onClick={() => copyToClipboard(swap.hash, 'swap hash')}
            onFocus={(e) => e.target.select()}
            // readOnly
            css={{
              width: '100%',
              textAlign: 'center',
              userSelect: 'none',
              color: '$gray10',
            }}
            value={swap.hash}
          />
        </Flex>
      )}
    </Flex>
  )
}
