import { View,Image} from '@tarojs/components'
import { useState,useEffect } from 'react'
import {useReady, getCurrentInstance} from '@tarojs/taro'
import './index.less'
import Fetch from '../../../Service/fetch'


const RoleHistory=()=>{
    const [histories, sethistories] = useState([])
    const [user, setuser] = useState([])
    const [operator, setoperator] = useState([])
    const dictionary = [
        '非在册队员',
        '申请队员',
        '岗前培训',
        '见习队员',
        '正式队员',
        '督导老师',
    ]
    dictionary[40] = "普通队员"
    dictionary[41] = "核心队员"
    dictionary[42] = "区域负责人"
    dictionary[43] = "组委会成员"
    dictionary[44] = "组委会主任"
    useReady(()=>{
        const params = getCurrentInstance()
        const param = params.router.params
        const {user_id} = param
        Fetch('/role/viewchangelist',{
            user_id: parseInt(user_id)
        },'post').then(res=>{
            sethistories(res?.data?.list)
            res.data.list.map(item=>{
                Fetch('/user/id',{
                    user_id:item.user_id
                },'post').then(ress=>{
                    setuser(prev=>[...prev,ress.data.user_info.username])
                })
                Fetch('/user/id',{
                    user_id:item.operator_id
                },'post').then(ress=>{
                    setoperator(prev=>[...prev,ress.data.user_info.username])
                })
            })
        })
    })
return (
    <>
    <View className='Rhistory'>
        {histories?histories.map((item,index)=>{
            console.log(dictionary[parseInt(item.oldrole)]);
            return (
                <View className='member' key='item'>
                    <View className='top'>
                        <View className='name'>{user[index]}</View>
                        <View className='role_bf'>{dictionary[parseInt(item.old_role)]}</View>
                        <Image className='changearrow' src='https://s2.loli.net/2023/04/23/ZroT1l3dHW7MwkB.png'></Image>
                        <View className='role_now'>{dictionary[parseInt(item.new_role)]}</View>
                    </View>
                    <View className='bottom'>
                        <View className='operator'>操作人：{operator[index]}</View>
                        <View className='time'>操作时间：{item.create_time?.slice(6,10)}</View>
                    </View>
                </View>
            )
        }):<View className='non-history'>暂无记录</View>}
    </View>
    </>
)

}

export default RoleHistory;