import Taro from '@tarojs/taro'
import { View,Image} from '@tarojs/components'
import { useEffect, useState } from 'react'
import './index.less'

/* 一个救援对象可以有多条报警 救援记录 */
const Robject=(props)=>{
    
    const [data,setData]=useState(
    {
        time:'',
        flag:'',
        weibo:'',
        teacher:[],
        lap:[]
  }
    )
    
    useEffect (()=>{
        setData({
            flag:props.status==1?'未结案':'已结案',
            weibo:props.weibo_address,
            teacher:[props.rescue_teacher1_name,props.rescue_teacher2_name,props.rescue_teacher3_name],
            time:props.create_time,//开始时间
            lap: [props.rescue_teacher1_role,props.rescue_teacher2_role,props.rescue_teacher3_role],
            
        })
    },[props])

    function toR_record(){
        Taro.navigateTo({
        url:`/moduleA/pages/R_record/index?id=${props.id}&status=${props.status}&teacher=${JSON.stringify(data.teacher)}&lap=${JSON.stringify(data.lap)}`
        })
    }

   /*  function toWeibo(value){
        Taro.navigateTo({
            url:`/moduleA/pages/Outer/index?weibo=${value}`
        })
      } */
      function handleClip(){
        //复制微博地址
                Taro.setClipboardData({
                    data: data.weibo,
                    success: function () {
                    Taro.getClipboardData({
                    success: function (res) {
                        Taro.showToast({
                            title: '复制成功',
                            icon: 'none',
                            duration: 1500
                        })
                        console.log(res.data) // data
                    }
                    })
                }
                  })
            }
return (
    <>
    <View className='object' onClick={toR_record}>
        <View className='object_n'>救援对象<View className='flag'>{data.flag}</View></View>
        <View className='item row'><View className='border_l'></View>微博昵称: {props.nickname}</View>
        <View className='item row'><View className='border_l'></View>
            <View className='R_t'>微博账号:</View>
            <View className='address blue' >{data.weibo}</View>
            <View className='copy' onClick={handleClip}><Image className='icon' src='https://s2.loli.net/2023/08/11/EF5Ug9GChQxtodi.png' ></Image></View>
          {/*   <View className='R_c blue' onClick={()=>toWeibo(data.weibo)}>点击跳转微博主页</View> */}
        </View>
        <View className='item row'><View className='border_l'></View>救援老师: {data.teacher.map((item)=>{ return (' ' + item + '  ') })}</View>
    </View>
    </>
)
}

export default Robject;