import Taro from '@tarojs/taro';


const root = 'https://shudong814.com/api/v1';
const Fetch = async (url = '', data = {}, method = 'GET') => {
  const header = {
    'content-type': 'application/json',
    'Authorization': Taro.getStorageSync('token')
  };

  return Taro.request({
    url: root + url,
    data,
    method,
    header
  }).then(res => {
    return res.data
  }).catch((e) => {
    console.error(e)
  })
};

export default Fetch;
