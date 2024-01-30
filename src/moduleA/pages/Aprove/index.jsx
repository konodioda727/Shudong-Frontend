import { useState } from 'react'
import { View,Button} from '@tarojs/components'
import Taro,{useReady, getCurrentInstance} from '@tarojs/taro'
import './index.less'
import Fetch from '../../../Service/fetch'

const Aprove=()=>{
    const [role,setRole] = useState()

    useReady(()=>{
        Fetch(
            '/user/info',
            {},
            'POST'
          ).then(res => {
            console.log(res)
            setRole(res.data.user_info.role)
            if(res.data.user_info.role>42)
                Fetch('/user/accesstoken',{},'post').then(ress=>{
                    setapitoken(ress.data.access_token)
                })
          })

       
        const params = getCurrentInstance()
        const {id,username,birthday,sex,mobile,address} =params.router.params
        setName(username)
        setSex(sexArr[sex])
        setAddress(address)
        setDateSel(birthday)
        setTel(mobile)
        setid(parseInt(id))
    })
    const [name,setName]=useState('namesfa')
    const [tel,setTel]=useState('12313145132')
    const [dateSel,setDateSel]=useState('2003-1-1')
    const [sex,setSex]=useState('女')
    const [address,setAddress]=useState('')
    const [apitoken, setapitoken] = useState()
    const [id, setid] = useState()
    const sexArr = [
        '男',
        '女'
    ]
    const confirm = (choice) => {
        if(role>42)//组委会
            Fetch('/application/processwithsubscribe',{
                "application_form_id": id,
                "result": choice,
                "access_token": apitoken
            },'post').then(res=>{
                if(res.code==200)
                {Taro.showToast({
                    title:'提交成功'
                })
                setTimeout(() => {
                    Taro.navigateBack()
                }, 1000);}
                else
                Taro.showToast({
                    title:'失败,稍后再试'
                })
            })
        else
            Fetch(
                '/application/process',
                {
                    "application_form_id": id,
                    "result": choice,
                },
                'POST'
            ).then(
                res=>{
                    if(res.code==200)
                    {Taro.showToast({
                        title:'提交成功'
                    })
                    setTimeout(() => {
                        Taro.navigateBack()
                    }, 1000);}
                    else
                    Taro.showToast({
                        title:'失败,稍后再试'
                    })}
            )
    }
    return (

        <>
        <View className='aprove'>
            <View className='title' style={{textAlign:'center'}}>申请队员报名表</View>
            <View className='form'>

                <View className='f_item' >
                <View className='border_l'></View><View style={{width:90}}>姓名:</View>
                    <View className='data'>{name}</View>
                </View>
                <View className='f_item'>
                <View className='border_l'></View><View  style={{width:90}}>性别:</View>
                    <View className='data'>{sex}</View>
                </View>
                <View className='f_item'>
                <View className='border_l'></View><View  style={{width:90}}>手机号:</View>
                    <View className='data'>{tel}</View>
                </View>
                <View className='f_item'>
                <View className='border_l'></View><View  style={{width:90}}>地址:</View>
                    <View className='data'>{address}</View>
                </View>
                <View className='f_item'>
                <View className='border_l'></View><View  style={{width:90}}>出生日期:</View>
                    <View className='data'>{dateSel}</View>
                </View>
                <Button className='form_pass'style={{bottom:50}} onClick={()=>confirm(1)}>通过</Button>
                <Button className='form_pass' style={{backgroundColor:'rgb(255, 116, 116)',bottom:10}} onClick={()=>confirm(0)}>不通过</Button>
            </View>
        </View>
        </>
    )
}

export default Aprove;