import Taro, {useReady} from '@tarojs/taro'
import { View ,Image} from '@tarojs/components'
import { useEffect, useState } from 'react'
import './index.less'
import Fetch from '../../Service/fetch'



    const MsgItem=(props)=>{

        const [flag,setFlag]=useState('');
        const [finish,setFinish]=useState('已救援')
      //  const [jiean,setJiean]=useState('')
        const [color,setColor]=useState(0)//0:#f57b70  1:#76A9FF 2:#f9a53e
       // const [status,setStatus]=useState(0)
        const [text,setText]=useState('')
        const [area,setArea]=useState('')
        const [level,setLevel]=useState('')
        const [data,setData]=useState([])
        const [ifmine,setIfmine] = useState(false)

        const param=props

        const status = [
            '未救援',
            '救援中',
            '已救援'
        ]
        useEffect(()=>{
            /* console.log(param.flag) */
          //  setStatus(param.status)//主页item
        
          if(param.flag=='main')  //主页
          {
            setFlag('alarm')
            if(param.ifmine)
            {
                setIfmine(true)
                setFinish('救援中')
                setColor(1)
            }
            else{
                //  未认领的救援
                setIfmine(false)
                Fetch(
                    '/rescue/targetinfo',
                    {
                        "rescue_target_id": param.rescue_target_id,
                    },
                    'POST'
                ).then(
                    res=>{
                        //console.log(res)
                        setFinish(status[res.data.rescue_target_info.status])
                        setColor(res.data.rescue_target_info.status)
                    }
                )
          }}
          else{
            //record
            setFlag('record')
            setFinish(status[param.status])
            setColor(param.status)
          }
            setText(param.text)
            setArea(param.area)
            setLevel(param.risk_level)
            setData(param.data)
        },[param])
      
        function toR_detail()
        {
            console.log(flag)
            if(flag=='alarm')
            Taro.navigateTo({
                url:`/moduleA/pages/Alarm/index?ifmine=${ifmine}&data=${JSON.stringify(data)}&finish=${finish}&color=${color}`
            })
            else{
                console.log('todetail')
                const jiean = param.status==1?'未结案':'已结案'
                Taro.navigateTo({
                    url:`/moduleA/pages/Rescue_detail/index?finish=${jiean}&data=${JSON.stringify(data)}&teacher=${JSON.stringify(param.teacher)}&lap=${JSON.stringify(param.lap)}`
                })
            }
        }

        return(
        <View className='noti-item column' onClick={toR_detail} >
            <View className='inline'>
                <View className='state'style={{backgroundColor:color==2?'#76A9FF':color==1?'#f9a53e':'#f57b70'}}>{finish}</View>
                <View className='rescued_level'>
                    风险等级：{level}
                </View>
            </View>
            <View>
                <View className='rescued_info'>
                    <View className='row'><View className='border_l'></View>微博内容：</View>
                    <View className='demand'>{text}</View>
                </View>
                <View className='rescued_city'>
                    地点：{area}
                </View>
            </View>
            {/* <View className='require'>主要诉求：<br />感情受挫，家庭不和，和亲人有隔阂</View> */}
        </View>
        )

}

export default MsgItem;