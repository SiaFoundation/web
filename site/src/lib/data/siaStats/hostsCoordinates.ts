import axios from 'axios'
import { errorResponse500 } from '../../error'

export async function getSiaStatsHostsCoordinates() {
  try {
    const { data } = await axios.get(
      'https://siastats.info/dbs/hostscoordinates.json'
    )
    const result = data
    return {
      status: 200,
      data: result,
    }
  } catch (e) {
    console.log(e)
    return errorResponse500
  }
}
