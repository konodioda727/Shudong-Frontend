import {getCurrentInstance,useReachBottom} from '@tarojs/taro'
import { View,Image} from '@tarojs/components'
import { useEffect, useState } from 'react'
import Ritem from '../../../Components/msgItem'
import Fetch from '../../../Service/fetch'
import './index.less'

/* 一个救援对象所对应的救援记录 */

const Record=()=>{

    const [flag,setFlag]=useState(false)
    const [r_id,setR_id] = useState('')
    const [page,setPage] = useState(1)
    const [fresh,setFresh] = useState(false)
    const [list, setList] = useState([])//救援报警信息
    const [status,setStatus] = useState(0)
    const [teacher,setTeacher] = useState([])
    const [lap,setLap] = useState([])

    useEffect(()=>{
        const params = getCurrentInstance()
        const param = params.router.params
        setR_id(param.id)
        console.log(param.id)
        setStatus(parseInt(param.status))//对象状态
        setTeacher(JSON.parse(param.teacher))
        setLap(JSON.parse(param.lap))

     //请求单个救援信息
      const data = {
        "rescue_target_id": parseInt(param.id),
        "page": page,
        "page_size": 10
    }
       Fetch(
        '/rescue/rescuetargetid',
        data,
        'POST'
       )
       .then(
        res=>
        {
            console.log(res)
            setList(res.data.list)
        }
       )

       console.log(param.flag)
        if(param.flag=='未结案')
            setFlag(param.flag)
        if(param.flag=='已结案')
            setFlag(param.flag)
      },[fresh])

      useReachBottom(() => {
        setFresh(!fresh)
        //setPage(page+1)
    })
  
return(
        <>
        <View className='record'>
            <View className='rec_box'>
                {list?list.map((item)=>{
                    return (
                        <Ritem {...item} data={item} teacher={teacher} status={status} lap={lap} key='rescue' flag='record' />
                    )
                }):<View className='img'>
                <View className='text'>还没有救援记录哦</View>
                <Image src='https://s2.loli.net/2023/04/29/857vFB6iTtZCxlg.png'></Image></View>}
            </View>
            {/* 救援对象结案评价 */}
        {/* {flag=='已结案'?
            <View className='comment'>
                <View className='c_title'><View className='border_l'></View>最终评价</View>
                <View className='content'>这次救援经历了4次紧张的救援活动，总的来说，成功帮助被救助者慢慢走出消极处境，并且短时间内不出现自杀倾向。患者初期较为抵抗，后期慢慢敞开心扉，感谢所有参与的救援老师！</View>
            </View>
        :''
        } */}</View>
        </>
    )
}

export default Record;