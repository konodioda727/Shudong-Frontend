import  {getCurrentInstance,useReady}from '@tarojs/taro'
import { View,Image } from '@tarojs/components'
import { useState } from 'react'
import Robject from '../../components/Robject'
import './index.less'
import Fetch from '../../../Service/fetch'



/* 认领的救援任务 按救援对象分 */
const Task=()=>{

//const [flag,setFlag]=useState(false)
const [mine,setMine] = useState([])
const [his,setHis] = useState(false)
    useReady(()=>{
        const params = getCurrentInstance()
        const param = params.router.params
        console.log(param)

        const taskD = {
          page:1,
          page_size:6//最多同时救援6个
        }
        if(param.flag=='history')
          setHis(true)

        Fetch(
          '/rescue/gettask',
          taskD,
          'POST'
        ).then(
          task=>
          {
            console.log(task)
            if(param.flag=='history')
            {
              console.log('his')
              if(task.data.list)
              console.log(task.data.list.filter((item)=>{return item.status==2}))
                setMine(task.data.list.filter((item)=>{return item.status==2}))
            }
            else{
              console.log('rescuing')
              //console.log(task.data.list.filter((item)=>{return item.status==1}))
              if(task.data.list)
                setMine(task.data.list.filter((item)=>{return item.status==1}))
            }
          }
        )


      })
    return (

    <>
    <View className='tasks'>
        <View className='box'>
            {/* 每个救援过的对象遍历 */}
             {/* <Robject flag='未结案' /> */}
             {mine.length?mine.map((item)=>{
              return (
                <Robject {...item}  key='item' />
              )
             }):
             <View className='img'>
             <View className='text'>空空如也~</View>
             <Image src='https://s2.loli.net/2023/04/29/857vFB6iTtZCxlg.png'></Image></View>
            }
        </View>
    </View>
    </>
)

}
export default Task;
