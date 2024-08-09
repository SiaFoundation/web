import { calculateScValue, calculateSfValue } from './transactionValue'
import { toHastings } from './currency'
import { WalletEvent } from '@siafoundation/types'

test('v1TxnCalculateScValue', () => {
  const e: WalletEvent = {
    id: 'h:85e850176d6b7d775a69e2cb523ceebbebfab3467d8752e79e3757d08d64aa84',
    index: {
      height: 78257,
      id: 'bid:0000000000000000000000000000000000000000000000000000000000000000',
    },
    timestamp: '2024-07-09T15:46:59.800284-07:00',
    maturityHeight: 78258,
    type: 'v1Transaction',
    data: {
      transaction: {
        // not used in calculation
        siacoinInputs: [],
        siacoinOutputs: [
          {
            value: toHastings(100).toString(),
            address: 'addr:1',
          },
          {
            value: toHastings(40000).toString(),
            address: 'addr:3',
          },
        ],
        minerFees: ['1000000000000000000000000'],
        signatures: [],
      },
      spentSiacoinElements: [
        {
          id: 'id-1',
          leafIndex: 0,
          merkleProof: ['proof'],
          maturityHeight: 0,
          siacoinOutput: {
            value: toHastings(50).toString(),
            address: 'addr:1',
          },
        },
        {
          id: 'id-2',
          leafIndex: 0,
          merkleProof: ['proof'],
          maturityHeight: 0,
          siacoinOutput: {
            value: toHastings(30).toString(),
            address: 'addr:2',
          },
        },
        {
          id: 'id-3',
          leafIndex: 0,
          merkleProof: ['proof'],
          maturityHeight: 0,
          siacoinOutput: {
            value: toHastings(30).toString(),
            // not in relevant
            address: 'addr:3',
          },
        },
      ],
      spentSiafundElements: undefined,
    },
    relevant: ['addr:1', 'addr:2'],
  }
  expect(calculateScValue(e)).toEqual(toHastings(20))
})

test('v1TxnCalculateScValue when no relevant / spentSiacoinElements is null', () => {
  const e: WalletEvent = {
    id: 'h:85e850176d6b7d775a69e2cb523ceebbebfab3467d8752e79e3757d08d64aa84',
    index: {
      height: 78257,
      id: 'bid:0000000000000000000000000000000000000000000000000000000000000000',
    },
    timestamp: '2024-07-09T15:46:59.800284-07:00',
    maturityHeight: 78258,
    type: 'v1Transaction',
    data: {
      transaction: {
        siacoinInputs: [],
        siacoinOutputs: [
          {
            value: toHastings(500).toString(),
            address: 'addr:1',
          },
          {
            value: toHastings(90000).toString(),
            address: 'addr:2',
          },
        ],
        minerFees: ['1000000000000000000000000'],
        signatures: [],
      },
      spentSiacoinElements: undefined,
      spentSiafundElements: undefined,
    },
    relevant: ['addr:1'],
  }
  expect(calculateScValue(e)).toEqual(toHastings(500))
})

test('v2TxnCalculateScValue', () => {
  const e: WalletEvent = {
    id: 'h:85e850176d6b7d775a69e2cb523ceebbebfab3467d8752e79e3757d08d64aa84',
    index: {
      height: 78257,
      id: 'bid:0000000000000000000000000000000000000000000000000000000000000000',
    },
    timestamp: '2024-07-09T15:46:59.800284-07:00',
    maturityHeight: 78258,
    type: 'v2Transaction',
    data: {
      siacoinInputs: [
        {
          satisfiedPolicy: {
            policy: 'policy',
            signatures: ['sig'],
            preimages: ['preimage'],
          },
          parent: {
            id: 'id-1',
            leafIndex: 0,
            merkleProof: ['proof'],
            maturityHeight: 0,
            siacoinOutput: {
              value: toHastings(50).toString(),
              address: 'addr:1',
            },
          },
        },
        {
          satisfiedPolicy: {
            policy: 'policy',
            signatures: ['sig'],
            preimages: ['preimage'],
          },
          parent: {
            id: 'id-2',
            leafIndex: 0,
            merkleProof: ['proof'],
            maturityHeight: 0,
            siacoinOutput: {
              value: toHastings(50000).toString(),
              address: 'addr:3',
            },
          },
        },
      ],
      siacoinOutputs: [
        {
          value: toHastings(100).toString(),
          address: 'addr:1',
        },
        {
          value: toHastings(40000).toString(),
          address: 'addr:3',
        },
      ],
      minerFee: toHastings(100).toString(),
    },
    relevant: ['addr:1', 'addr:2'],
  }
  expect(calculateScValue(e)).toEqual(toHastings(50))
})

test('v1TxnCalculateSfValue', () => {
  const e: WalletEvent = {
    id: 'h:85e850176d6b7d775a69e2cb523ceebbebfab3467d8752e79e3757d08d64aa84',
    index: {
      height: 78257,
      id: 'bid:0000000000000000000000000000000000000000000000000000000000000000',
    },
    timestamp: '2024-07-09T15:46:59.800284-07:00',
    maturityHeight: 78258,
    type: 'v1Transaction',
    data: {
      transaction: {
        // not used in calculation
        siafundOutputs: [
          {
            value: 100,
            address: 'addr:1',
          },
          {
            value: 40000,
            address: 'addr:3',
          },
        ],
        minerFees: ['1000000000000000000000000'],
        signatures: [],
      },
      spentSiacoinElements: undefined,
      spentSiafundElements: [
        {
          id: 'id-1',
          leafIndex: 0,
          merkleProof: ['proof'],
          claimStart: '',
          siafundOutput: {
            value: 50,
            address: 'addr:1',
          },
        },
        {
          id: 'id-2',
          leafIndex: 0,
          merkleProof: ['proof'],
          claimStart: '',
          siafundOutput: {
            value: 30,
            address: 'addr:2',
          },
        },
        {
          id: 'id-3',
          leafIndex: 0,
          merkleProof: ['proof'],
          claimStart: '',
          siafundOutput: {
            value: 30,
            // not in relevant
            address: 'addr:3',
          },
        },
      ],
    },
    relevant: ['addr:1', 'addr:2'],
  }
  expect(calculateSfValue(e)).toEqual(20)
})

test('v1TxnCalculateSfValue when no relevant / spentSiafundElements is null', () => {
  const e: WalletEvent = {
    id: 'h:85e850176d6b7d775a69e2cb523ceebbebfab3467d8752e79e3757d08d64aa84',
    index: {
      height: 78257,
      id: 'bid:0000000000000000000000000000000000000000000000000000000000000000',
    },
    timestamp: '2024-07-09T15:46:59.800284-07:00',
    maturityHeight: 78258,
    type: 'v1Transaction',
    data: {
      transaction: {
        siafundOutputs: [
          {
            value: 500,
            address: 'addr:1',
          },
          {
            value: 90000,
            address: 'addr:2',
          },
        ],
        minerFees: ['1000000000000000000000000'],
        signatures: [],
      },
      spentSiacoinElements: undefined,
      spentSiafundElements: undefined,
    },
    relevant: ['addr:1'],
  }
  expect(calculateSfValue(e)).toEqual(500)
})

test('v2TxnCalculateSfValue', () => {
  const e: WalletEvent = {
    id: 'h:85e850176d6b7d775a69e2cb523ceebbebfab3467d8752e79e3757d08d64aa84',
    index: {
      height: 78257,
      id: 'bid:0000000000000000000000000000000000000000000000000000000000000000',
    },
    timestamp: '2024-07-09T15:46:59.800284-07:00',
    maturityHeight: 78258,
    type: 'v2Transaction',
    data: {
      siafundInputs: [
        {
          satisfiedPolicy: {
            policy: 'policy',
            signatures: ['sig'],
            preimages: ['preimage'],
          },
          claimAddress: 'addr:x',
          parent: {
            id: 'id-1',
            leafIndex: 0,
            merkleProof: ['proof'],
            claimStart: '',
            siafundOutput: {
              value: 50,
              address: 'addr:1',
            },
          },
        },
        {
          satisfiedPolicy: {
            policy: 'policy',
            signatures: ['sig'],
            preimages: ['preimage'],
          },
          claimAddress: 'addr:x',
          parent: {
            id: 'id-2',
            leafIndex: 0,
            merkleProof: ['proof'],
            claimStart: '',
            siafundOutput: {
              value: 50000,
              address: 'addr:3',
            },
          },
        },
      ],
      siafundOutputs: [
        {
          value: 100,
          address: 'addr:1',
        },
        {
          value: 40000,
          address: 'addr:3',
        },
      ],
      minerFee: toHastings(100).toString(),
    },
    relevant: ['addr:1', 'addr:2'],
  }
  expect(calculateSfValue(e)).toEqual(50)
})
