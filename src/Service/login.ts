import Taro from '@tarojs/taro'
import Fetch from './fetch'

const handleLogin = (e) => {
  Fetch('/user/phonenumber', { code: e?.detail.code }, 'POST')
    .then(getPhone)
    .then(validate)
    .then(setExpiration)
    .then(getUserInfo)
    .catch((err) => {
      console.log(err)
    })
}

export default handleLogin

// 获取手机号码
export const getPhone = (res) => {
  Taro.setStorageSync('phone', res.data.phone_info.phone_number)
  return Taro.login()
}

// 验证登录
export const validate = (res) => {
  if (res.code) {
    const data = {
      code: res.code,
      phone_number: Taro.getStorageSync('phone'),
    }
    return Fetch('/user/wxMiniAuth', data, 'POST')
  } else {
    console.log('登录失败！' + res.errMsg)
  }
}

// 设置token登录过期
export const setExpiration = (res) => {
  Taro.setStorageSync('token', res.data.access_token)
  Taro.setStorageSync('time', new Date())
  return Fetch('/user/info', {}, 'POST')
}

// 获取用户身份
export const getUserInfo = (info) => {
  const userRole = info.data?.user_info.role
  Taro.setStorageSync('role', userRole)
  userRole <= 1
    ? Taro.reLaunch({ url: '/moduleA/pages/Form/index' })
    : Taro.switchTab({ url: '/pages/Main/index' })
}
