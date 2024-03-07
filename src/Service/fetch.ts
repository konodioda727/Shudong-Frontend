import Taro from '@tarojs/taro'
import { requestType } from './fetchTypes'

const root = 'https://shudong814.com/api/v1'

const Fetch = async <T>(
  url: string,
  data: object = {},
  method: requestType = 'GET',
): Promise<T> => {
  const header = {
    'content-type': 'application/json',
    Authorization: Taro.getStorageSync('token'),
  }

  try {
    const response = await Taro.request({
      url: root + url,
      data,
      method,
      header,
    })

    return response.data
  } catch (e) {
    console.error(e)
    throw e
  }
}

export default Fetch
