// NOTE: The siahub website is no longer online so this data is not in use.

import axios from 'axios'
import { errorResponse500 } from '../../error'

export async function getSiahubNetwork() {
  try {
    const { data } = await axios.get('https://siahub.info/api/network')
    if (typeof data !== 'object') {
      throw Error('Error making request')
    }
    const result = data[data.length - 1]
    return {
      status: 200,
      data: result,
    }
  } catch (e) {
    console.log(e)
    return errorResponse500
  }
}
