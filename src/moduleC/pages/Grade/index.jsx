import { useState } from "react";
import { useReady,getCurrentInstance}from "@tarojs/taro";
import { View,Text,Image} from "@tarojs/components";
import './index.less'
import Fetch from "../../../Service/fetch";

const Grade=()=>{
    const passList = ['未通过','通过']
    const [pass,setPass]=useState(false)
    const [Res, setRes] = useState()
    useReady(()=>{
        const params = getCurrentInstance()
        const param = params.router.params
        Fetch('/exam/getgrades',{},'post')
        .then(res=> {
            setRes(res.data.list)
        })
        console.log('role',param.role);
        if(param.role<2)
            setPass(false)
        else
            setPass(true)
    })

    return(
        <>
        {pass?
        <View className='Grade'>
            <View className='box'>
                <View className='title'>
                    <Text style={{textAlign:'center'}}>岗前培训</Text>
                </View>
                <View className='R_time'>{Res?Res[0].time.slice(0,10):''}</View>
              {/*   <View className='name'>2023年第三期岗前培训</View> */}
                {/* <View className='score'>92</View> */}
                {Res ? Res.map(item=>{
                    return (
                        <View key='score' className='score-wrap'>
                        <View className='score-label'>{item.type+':'}</View>
                        <View className='score'>{passList[parseInt(item.result)]}</View>
                        </View>
                    )
                }):
                <View className='img'>
            <View className='text'>没有该记录哦</View>
            <Image src='https://s2.loli.net/2023/04/29/857vFB6iTtZCxlg.png'></Image></View>}

                
            </View>
        </View>:
        <View className='img'>
            <View className='text'>还没有成绩呢</View>
            <Image src='https://s2.loli.net/2023/04/29/857vFB6iTtZCxlg.png'></Image></View>}
        </>
   )
}

export default Grade;