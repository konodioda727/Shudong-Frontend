import Taro,{getCurrentInstance} from '@tarojs/taro'
import { useState,useEffect } from 'react'
import { View,Text,Button,Image} from '@tarojs/components'
import Fetch from '../../../Service/fetch'

import './index.less'

const Alarm=()=>{

    const [create_time,setCreate_time] = useState('') 
    const [weibo_address,setweibo_address] = useState('')
    const [nickname,setNickname] = useState('')
    const [risk_level,setRisk_level] = useState('')
    const [teacher,setTeacher] = useState([])
    const Sex = [
        '女',
        '男'
    ]
    const [sex,setSex] = useState(0)
    const [text,setText] = useState('')
    const [birthday,setBirthday] = useState('')
    const [area,setArea] = useState('')
    const [id,setId] = useState('')//救援对象的id
    const [infoid, setInfoid] = useState('')//信息的id

    const [main,setMain] = useState(false)//核心成员
    const [low,setLow] = useState(false)//资历浅的成员(见习)
    const [lap,setLap] = useState([])
    const params = getCurrentInstance()
    const param = params.router.params

    useEffect(()=>{

        const data = JSON.parse(param.data)
        console.log(data)
        console.log(param.ifmine)

        setId(data.rescue_target_id)
        setInfoid(data.id)
        setweibo_address(data.weibo_address)
        setCreate_time(data.create_time)
        setRisk_level(data.risk_level)
        setSex(data.sex)
        setText(data.text)
        setBirthday(data.birthday)
        setArea(data.area)
        setNickname(data.nickname)
        Fetch(
            '/rescue/targetinfo',
            {
                rescue_target_id:data.rescue_target_id
            },
            'POST'
        ).then(
            res=>{
                console.log(res)
                setTeacher([res.data.rescue_target_info.rescue_teacher1_name, 
                            res.data.rescue_target_info.rescue_teacher2_name,
                            res.data.rescue_target_info.rescue_teacher3_name])
                setLap([
                    res.data.rescue_target_info.rescue_teacher1_role,
                    res.data.rescue_target_info.rescue_teacher2_role,
                    res.data.rescue_target_info.rescue_teacher3_role,
                ])
            }
        )
        .catch(error=>{
            console.log(error)
        })
       
        
        
    },[param])

    function toWeibo(){
    Taro.navigateTo({
        url:`/moduleA/pages/Outer/index?weibo=${weibo_address}`
    })
    }

    function tocomment(){
    Taro.navigateTo({
        url:`/moduleA/pages/Rescue_comment/index?id=${infoid}`
    })
    }

    function Claim (){

        Fetch(
            '/rescue/claim',
            {
                rescue_target_id: id
            },
            'POST'
            ).then(
                res=>{
                    console.log(res)
                    Taro.showToast({
                        title: '认领成功!',
                        icon: 'success',
                        duration: 2000
                      })
                }
            ).catch(
                error=>console.log(error)
            )

    }

    function handleClip(){
//复制微博地址
        Taro.setClipboardData({
            data: weibo_address,
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
        <View className='R_detail'>
            <View className='R_Title'>
                <Text className='r_info'>报警信息</Text> 
                <View className='r_flag' style={{backgroundColor:param.color==2?'#76A9FF':param.color==1?'#f9a53e':'#f57b70'}}>{param.finish}</View>
                <View className='lap'>
                    {lap.map((item)=>{
                        return(
                            <Image key='lap' src={item>=4?'https://s2.loli.net/2023/08/01/12k9zWOSDYmjPop.png':item!=0?'https://s2.loli.net/2023/08/01/Ki8w7kyB5VAaLSY.png':'https://s2.loli.net/2023/08/01/F5WpGfAobgNOyYQ.png'}></Image>
                        )
                    })}
                </View>
            </View>
            <View className='R_time'>{create_time}</View>
            <View className='R_list'>
                <View className='R_container'>
                    <View className='border_l'></View>
                    <View className='R_t'>微博账号</View>
                    <View className='address blue' >{weibo_address}</View>
                    <View className='copy' onClick={handleClip}><Image className='icon' src='https://s2.loli.net/2023/08/11/EF5Ug9GChQxtodi.png' ></Image></View>
                    {/* <View className='R_c blue' onClick={toWeibo}>点击跳转微博主页</View> */}
                </View>
                <View className='R_container'>
                    <View className='border_l'></View>
                    <View className='R_t'>微博昵称</View>
                    <View className='R_c'>{nickname}</View>
                </View>
                <View className='R_container'>
                    <View className='border_l'></View>
                    <View className='R_t'>所在地区</View>
                    <View className='R_c'>{area}</View>
                </View>
                <View className='R_container'>
                    <View className='border_l'></View>
                    <View className='R_t'>性别:</View>
                    <View className='R_c'>{Sex[sex]}</View>
                </View>
                <View className='R_container'>
                    <View className='border_l'></View>
                    <View className='R_t'>生日</View>
                    <View className='R_c'>{birthday}</View>
                </View>
                <View className='R_container'>
                    <View className='border_l'></View>
                    <View className='R_t'>微博内容</View>
                    <View className='R_c'>{text}</View>
                </View>
                <View className='R_container'>
                    <View className='border_l'></View>
                    <View className='R_t'>风险等级</View>
                    <View className='R_c'>{risk_level}</View>
                </View>
                <View className='R_container bottom'>
                    <View className='border_l'></View>
                    <View className='R_t'>救助老师</View>
                    <View className='R_c'>{teacher?teacher.map((item)=>{
                        return (item+' ')
                    }):'无'}</View>
                </View>
                <View className='f_adapt row_center'>{/* 路由传参布尔值会转成字符串 */}
                    <Button onClick={param.ifmine=='true'?tocomment:Claim}>{param.ifmine=='true'?'效果评价':'认领'}</Button>
                </View>
                
            </View>
            
        </View>
        </>
    )
}

export default Alarm;