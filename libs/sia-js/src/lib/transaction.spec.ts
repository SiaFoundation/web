import { computeSingleTransaction } from './transaction'
import badTxData from '../mock/bad_tx.json'
import goodTxData from '../mock/good_tx.json'

describe('transaction', () => {
  it('test computeSingleTransaction', () => {
    for (let i = 0; i < badTxData.confirmedtransactions.length; i++) {
      const badResult = computeSingleTransaction(
        badTxData.confirmedtransactions[i]
      )
      const goodResult = computeSingleTransaction(
        goodTxData.confirmedtransactions[i]
      )
      // t.log(`Bad Result: ${badResult.totalSiacoin.toFixed(0)} Good Result: ${goodResult.totalSiacoin.toFixed(0)}`)
      // if (!badResult.totalSiacoin.isEqualTo(goodResult.totalSiacoin)) {
      //   t.fail()
      // }
      expect(
        badResult.totalSiacoin.isEqualTo(goodResult.totalSiacoin)
      ).toBeTruthy()
    }
    // t.pass()
  })
})
