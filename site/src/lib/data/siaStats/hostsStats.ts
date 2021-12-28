import axios from 'axios'
import { errorResponse500 } from '../../error'

export async function getSiaStatsHostsStats() {
  try {
    const response = await axios.get('https://siastats.info/dbs/hostsRTdb.json')
    const result = response.data[0]
    return {
      status: 200,
      data: result,
    }
  } catch (e) {
    console.log(e)
    return errorResponse500
  }
}
