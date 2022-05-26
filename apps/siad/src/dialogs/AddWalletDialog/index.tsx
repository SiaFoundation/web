import {
  Flex,
  Paragraph,
  TextField,
  Button,
  Label,
  Text,
  Grid,
  Box,
  DialogContent,
  RadioCardGroup,
  RadioCard,
  Heading,
} from '@siafoundation/design-system'
import { useWalletAddressCreate } from '@siafoundation/react-siad'
import { useFormik } from 'formik'
import { useDialog } from '../../contexts/dialog'
import * as Yup from 'yup'
import { GenerateSeed } from './GenerateSeed'
import { useEffect, useState } from 'react'
import { VerifySeed } from './VerifySeed'
import { SelectType } from './SelectType'
import { NewWallet } from './NewWallet'

const initialValues = {
  address: '',
  description: '',
  index: 0,
}

const validationSchema = Yup.object().shape({
  address: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  index: Yup.number().integer().required('Required'),
})

type WalletType = 'create' | 'restore' | 'cold' | 'ledger'

export function AddWalletDialog() {
  const { closeDialog } = useDialog()
  const addAddress = useWalletAddressCreate()
  const [seed, setSeed] = useState<string>()
  const [step, setStep] = useState<string>('start')
  const [walletType, setWalletType] = useState<WalletType>()
  const [valid, setValid] = useState<boolean>(false)

  return (
    <>
      {step === 'start' && <SelectType onSelect={() => setStep('create')} />}
      {step === 'create' && <NewWallet />}
    </>
  )
}
