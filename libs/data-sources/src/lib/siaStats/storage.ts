import axios from 'axios'
import { errorResponse500 } from '../error'

export async function getSiaStatsStorage() {
  try {
    const { data } = await axios.get('https://siastats.info/dbs/storage.json')
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
