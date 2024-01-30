import Taro,{getCurrentInstance,useReady} from '@tarojs/taro'
import { View ,Image} from "@tarojs/components";
import { useState } from 'react';
import Fetch from '../../../Service/fetch';
import  './index.less';

const Audit = () =>{

const [status,setStatus] = useState()
const params = getCurrentInstance()
const param = params.router.params

const Query = (Res) => {
    console.log(Res)
    setStatus(Res?.status)
    Res?.status && Taro.setStorageSync('status',Res?.status)
    if(Res?.status >= 2) {
      console.log('success');
      Taro.reLaunch({
        url:'/pages/Main/index'
      })
    }
  }

  function fetchData() {
    Fetch(
      '/application/form',
      {},
      'POST'
    ).then(res => {
      const Res = res?.data?.application_form
      Query(Res)
    })
  }

useReady(()=>{
    setStatus(param.status)
    fetchData()
})

function generateText() {
    switch (status) {
      case 0:
        return '区域负责人审批中，请耐心等待'
      case 1:
          return '组织管理委员会审批中，请耐心等待'
      case 2:
          return '申请已通过'
      case 3:
          return '申请未通过,请修改申请后重新提交'
      default:
          return '网络状况不佳'
    }
  }

    return(

        <>
       
        <View className='status'>
              {status <= 2 
              ?<Image src='https://s2.loli.net/2023/08/13/4FE9Rk1uKS7O6Lh.png' className='statusImage'></Image>
              :<Image src='https://s2.loli.net/2023/07/12/MQxoNHPhKUGTlXZ.png' className='statusImage'></Image>}
              <View className='status-text' style={{color: status<=2?'#f4bb2a':'#e16531'}}>{generateText()}</View>
        </View>
        </>
    )
}

export default Audit;
