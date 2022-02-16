import { Button, Flex } from '@siafoundation/design-system'
import { SwapOverview } from '../../components/SwapOverview'
import { useSwap } from '../../hooks/useSwap'
import { usePathParams } from '../../hooks/useHashParam'
import { Redirect, useHistory } from 'react-router-dom'
import { Fragment, useCallback } from 'react'
import axios from 'axios'
import { routes } from '../../routes'
import { Message } from '../../components/Message'
import { Share } from './Share'

export function StepSwap() {
  const { hash } = usePathParams()

  const { status } = useSwap(hash)

  const history = useHistory()
  const handleMethod = useCallback(
    (method: 'accept' | 'finish') => {
      const func = async () => {
        try {
          const response = await axios({
            method: 'post',
            url: `http://localhost:8080/api/${method}`,
            headers: {
              'Content-Type': 'application/json',
            },
            data: {
              hash,
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
    [hash, history]
  )

  if (!hash) {
    return <Redirect to="/" />
  }

  return (
    <Flex direction="column" align="center" gap="3">
      <SwapOverview hash={hash} />
      <Flex
        direction="column"
        align="center"
        gap="3"
        css={{ overflow: 'hidden', width: '100%' }}
      >
        {status === 'waitingForYouToAccept' && (
          <Fragment>
            <Message
              message={`
            Accept and sign the transaction to continue. After this, the counterparty can complete the transaction
        `}
            />
            <Button
              size="3"
              variant="green"
              css={{ width: '100%' }}
              onClick={() => handleMethod('accept')}
            >
              Accept and sign transaction
            </Button>
          </Fragment>
        )}
        {status === 'waitingForCounterpartyToAccept' && <Share hash={hash} />}
        {status === 'waitingForYouToFinish' && (
          <Fragment>
            <Message
              message={`
          Accept and sign the transaction to continue. After this, the counterparty can complete the transaction.
        `}
            />
            <Button
              size="3"
              variant="green"
              css={{ width: '100%' }}
              onClick={() => handleMethod('finish')}
            >
              Finish and broadcast transaction
            </Button>
          </Fragment>
        )}
        {status === 'waitingForCounterpartyToFinish' && <Share hash={hash} />}
      </Flex>
    </Flex>
  )
}
