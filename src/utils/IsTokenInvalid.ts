import Taro from '@tarojs/taro'

export const IsTokenInvalid = (): boolean => {
  const storedTime = Taro.getStorageSync('time')
  const currentTime = new Date()
  const timeInMillis = currentTime ? currentTime.getTime() : 0
  return storedTime && timeInMillis - storedTime < 86000000 * 7
}
