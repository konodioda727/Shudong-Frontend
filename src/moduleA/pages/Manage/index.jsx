import Taro,{useReady,getCurrentInstance,usePullDownRefresh, useReachBottom} from '@tarojs/taro'
import { useState, useEffect } from 'react'
import { View,Text,Picker, ScrollView} from '@tarojs/components'

import './index.less'
import Fetch from '../../../Service/fetch'

const Manage=()=>{
//  只有组委会成员有该权限

const role=[
'非在册队员',
'申请队员',
'岗前培训',
'见习队员',
//'正式队员',
'督导老师',
'树洞之友',
"普通队员",
"核心队员",
"区域负责人",
"组委会成员",
"组委会主任"]
const [rchecked,setRchecked]=useState(role[0])
const [user_id, setuser_id] = useState()
const [members, setmembers] = useState([])
const [page, setPage] = useState(1); 
const dictionary = [
    '非在册队员',
    '申请队员',
    '岗前培训',
    '见习队员',
    //'正式队员',//
    '督导老师',
    '树洞之友'
]
dictionary[40] = "普通队员"
dictionary[41] = "核心队员"
dictionary[42] = "区域负责人"
dictionary[43] = "组委会成员"
dictionary[44] = "组委会主任"
useEffect(() => {
    update()
}, [rchecked])
useReady(()=>{
    const params = getCurrentInstance()
    const param = params.router.params
    const {user_id} = param
    setuser_id(user_id)
})

const update = () => {
    console.log('update');
    Fetch('/user/all',{
        page:1,
        page_size:15
    },'post')
    .then(res=>{
        if(res.data.list)
            setmembers(res.data.list);
       /*  else {
            Taro.showToast({
                title:'没有更多了哦',
                icon:'none'
            })
        } */
    }).catch(err=>{
        Taro.showToast({
            title:'网络状况不佳',
            icon:'none'
        })
    }) 
}
const fetchData = (Page) => {
    Fetch('/user/all',{
        page:Page,
        page_size:15
    },'post')
    .then(res=>{
        console.log(res.data.list);
        if(res.data.list){
            setmembers(prevData => [...prevData, ...res.data.list]);
            setPage(Page)
        }
        else {
            Taro.showToast({
                title:'没有更多了哦',
                icon:'none'
            })
        }
    }).catch(err=>{
        Taro.showToast({
            title:'网络状况不佳',
            icon:'none'
        })
    }) 
};
usePullDownRefresh(() => {
    update()
    setTimeout(()=>{
        setPage(1)
        Taro.stopPullDownRefresh()
    },1000)
})

/* const handleScroll = e => {
    setPage(page+1); 
    console.log('scroll');
    fetchData(page+1); 
}; */

useReachBottom(()=>{
    fetchData(page+1)
})

function onChange(e){
   /*  console.log(e.detail.value) */
    const index=e.detail.value
    Taro.showModal({
        title: '修改提示',
        content: '确认修改吗？',
    success: function (res) {
    if (res.confirm) {
        setRchecked(role[index])
        console.log(dictionary.indexOf(role[index]));
        console.log('用户点击确定')
        Fetch('/role/change',{
            user_id:parseInt(user_id),
            new_role:dictionary.indexOf(role[index])
        },'post').then(res=> {
            console.log(res);
            update()
        })
      //post修改
    } else if (res.cancel) {
        Taro.showToast({
            title:'取消修改！',
            icon:'none'
        })
      console.log('用户点击取消')
    }
  }
})
}

function tohistory(id){
    Taro.navigateTo({
        url:`/moduleA/pages/Rolehistory/index?user_id=${id}`
    })
}
/* function handleChange(e){
    console.log(e)
    setRchecked(e)
} */
    return(
        <>
            <View className='manage'>
            <View className='column m-list' /* onScrollToLower={handleScroll} */ >
                {members && members.map(item=>{
                    const {id,username} = item
                    return (
                        <View className='member' key='item' onClick={()=>setuser_id(id)}>{/* 换成两行，防止字段较长装不下 */}
                            <View className='name'>{username}</View>
                            <View className='role_now' style={{marginRight:20}}>{dictionary[item.role]}</View>{/* 选择器 */}
                            <Picker className='picker' mode='selector' range={role} onChange={(e)=>onChange(e)}>
                                <View className='change'>修改职务</View>
                            </Picker>
                            <Text className='check' onClick={()=>tohistory(id)}>查看变更记录</Text>
                        </View>
                    )
                })}
            </View>
                
            </View>
        </>
    )
}

export default Manage;