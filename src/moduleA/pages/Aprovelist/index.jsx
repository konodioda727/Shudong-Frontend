import Taro, {useDidShow} from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import {  useState, useEffect } from 'react'
import Fetch from '../../../Service/fetch'
import { AtInput,AtList,AtListItem,AtButton } from 'taro-ui'
import AddressPicker from '../../components/address'
import './index.less'
import './index.scss'

const AList=()=>{
    const [refresh, setrefresh] = useState(false)
    const [forms, setforms] = useState([])
    const [showPicker, setshowPicker] = useState(false)
    const [address, setAddress] = useState('')
    const [page, setPage] = useState(1);
    const dictionary = [
        '非在册队员',
        '申请队员',
        '岗前培训'
    ]
    useDidShow(()=>{
        setforms([])
        fetchData(0, page)
    })
    useEffect(() => {
        fetchData(0, page)
    }, [address])
    const requestFunc = (url, query, flag) => {
        Fetch(`${url}`,query,'post')
        .then(res=>{
            if(res.data.list)
                if(flag) setforms(prevData => [...prevData, ...res.data.list]);
                else setforms(res.data.list)
            else {
                Taro.showToast({
                    title:'没有更多了哦',
                    icon:'none'
                })
                if(!flag) setforms([])
            }
        }).catch(()=>{
            Taro.showToast({
                title:'网络状况不佳',
                icon:'none'
            })
        })
    }
        const fetchData = (flag,pagenow) => {
            if(address) {
                requestFunc('/application/address',{
                        page:pagenow?pagenow:1,
                        page_size:10,
                        address: address
                    }, flag)
            } else {
                requestFunc('/application/forms',{
                    page:pagenow?pagenow:1,
                    page_size:10,
                },flag)
            }
        };
    function toaprove(item){
        const {mobile, id,sex,birthday,username,address} = item
        Taro.navigateTo({
            url:`/moduleA/pages/Aprove/index?mobile=${mobile}&username=${username}&sex=${sex}&birthday=${birthday}&id=${id}&address=${address}`
        })
    }
    const handleScroll = e => {
        setPage(prevPage => prevPage + 1);
        fetchData(1,page + 1);
      };
    function chooseAddress() {
        setshowPicker(!showPicker)
    }
    function handlePick(e) {
        setAddress(e)
    }
    return (
        <>
        <View className='Form_i' onClick={chooseAddress} >
            <AtList >
                <AtListItem
                  title='选择省市'
                  extraText={address}
                />
            </AtList>
        </View>
        {showPicker && <AddressPicker address={address} city={false} onAConfirm={chooseAddress} onPick={handlePick}></AddressPicker>}
        {<ScrollView scrollY className='column' onScrollToLower={handleScroll} style={{height:'80vh',marginTop:'5vh'}}>
            {forms && forms.map(item=>{
                return (
                    <View className='formi' key='item' onClick={()=>toaprove(item)}>
                        <View className='a_title'>{ item.username}</View>
                        <View className='a_title'>{ dictionary[item.status]}</View>
                        <View className='check'>查看</View>
                    </View>
                )
            })}
        </ScrollView>}
        </>
    )
}

export default AList;
