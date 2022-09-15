import BigNumber from 'bignumber.js'
import { useState } from 'react'
import { toHastings } from '@siafoundation/sia-js'
import { Flex, DialogContent, Separator, Box } from '../../core'
import { WalletSendSiacoinGenerate } from './Generate'
import { WalletSendSiacoinConfirm } from './Confirm'
import { ProgressSteps } from './ProgressSteps'
import { WalletSendSiacoinComplete } from './Complete'
import { Transaction } from '@siafoundation/react-core'

export type SendSiacoinFormData = {
  address: string
  siacoin: BigNumber
  includeFee: boolean
}

type Step = 'setup' | 'confirm' | 'done'

const fee = toHastings(0.00393)

export function WalletSendSiacoinDialog() {
  const [step, setStep] = useState<Step>('setup')
  const [signedTxn, setSignedTxn] = useState<Transaction>()
  const [data, setData] = useState<SendSiacoinFormData>()

  return (
    <DialogContent
      title="Send siacoin"
      css={{
        maxWidth: '400px',
        overflow: 'hidden',
      }}
    >
      <Flex direction="column" gap="2">
        <ProgressSteps
          onChange={(val) => setStep(val as Step)}
          activeStep={step}
          steps={[
            {
              id: 'setup',
              label: 'Setup',
            },
            {
              id: 'confirm',
              label: 'Confirm',
            },
            {
              id: 'done',
              label: 'Complete',
            },
          ]}
        />
        <Box css={{ marginTop: '$2' }}>
          <Separator size="100" pad="0" />
        </Box>
        {step === 'setup' && (
          <WalletSendSiacoinGenerate
            fee={fee}
            onComplete={(data) => {
              setData(data)
              setStep('confirm')
            }}
          />
        )}
        {step === 'confirm' && data && (
          <WalletSendSiacoinConfirm
            {...data}
            fee={fee}
            onConfirm={({ transaction }) => {
              setStep('done')
              setSignedTxn(transaction)
            }}
          />
        )}
        {step === 'done' && data && signedTxn && (
          <WalletSendSiacoinComplete
            {...data}
            fee={fee}
            transactionId={'TODO'}
          />
        )}
      </Flex>
    </DialogContent>
  )
}
