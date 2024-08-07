import { Explored } from '.'

export async function exampleExploredDataFetch() {
  const explored = Explored({
    api: 'http://localhost:9980/api',
    password: 'password1337',
  })

  explored
    .blockByID({ params: { id: 'some-block-id' } })
    .then((response) => {
      if (response.status !== 200)
        throw new Error(`blockByID request failed: ${response.statusText}`)

      const block = response.data
      // Do Block things.
      console.log(block)
    })
    .catch((error) => {
      // Handle the error
      console.log(error)
    })

  try {
    const transactionFeeResponse = await explored.txpoolFee()

    if (transactionFeeResponse.status !== 200)
      throw new Error(
        `transactionFee request failed: ${transactionFeeResponse.status}`
      )

    const transactionFee = transactionFeeResponse.data
    // Do Transaction Fee things.
    console.log(transactionFee)
  } catch (e) {
    // Handle the error
    console.log(e)
  }
}
