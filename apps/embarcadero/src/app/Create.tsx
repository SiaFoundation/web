import { ArrowDownIcon } from '@radix-ui/react-icons'
import { Box, Button, Flex, Grid, Text } from '@siafoundation/design-system'
import axios from 'axios'
import { useState } from 'react'
import { Input } from './Input'

type Direction = 'SCtoSF' | 'SFtoSC'

async function create(sc: number, sf: number, direction: Direction) {
  const offer = direction === 'SCtoSF' ? `${sc}SC` : `${sf}SF`
  const receive = direction === 'SCtoSF' ? `${sf}SF` : `${sc}SC`

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
  } catch (e: any) {
    console.log(e.response)
  }
}

export function Create() {
  const [direction, setDirection] = useState<Direction>('SCtoSF')
  const [sc, setSc] = useState<string>()
  const [sf, setSf] = useState<string>()

  return (
    <Flex direction="column" align="center" gap="3">
      <Flex direction="column" align="center" css={{ width: '100%' }}>
        <Box css={{ width: '100%', order: direction === 'SCtoSF' ? 1 : 3 }}>
          <Input currency="SF" type="integer" value={sf} onChange={setSf} />
        </Box>
        <Box css={{ width: '100%', order: direction === 'SCtoSF' ? 3 : 1 }}>
          <Input currency="SC" type="decimal" value={sc} onChange={setSc} />
        </Box>
        <Box css={{ height: '$2', zIndex: '$1', order: 2 }}>
          <Box
            onClick={() =>
              setDirection(direction === 'SCtoSF' ? 'SFtoSC' : 'SCtoSF')
            }
            css={{
              cursor: 'pointer',
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
                '&:hover': {
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
          size="2"
          variant="primary"
          css={{ width: '100%', textAlign: 'center' }}
          onClick={() => create(Number(sc), Number(sf), direction)}
        >
          Generate swap
        </Button>
      </Box>
    </Flex>
  )
}
