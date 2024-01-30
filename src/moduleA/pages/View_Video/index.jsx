import Taro from "@tarojs/taro";
import {useEffect, useState} from "react";
import {ScrollView, View} from "@tarojs/components";
import Fetch from "../../../Service/fetch";
import SwitchTab from "./switchTab";
import DetailItem from "./detail_item";

const switchTab = [{
    key: 0,
    name: '按用户排列',
    classify: 'username'
},{
    key: 1,
    name: '按视频名称排列',
    classify: 'file_name'
}]
const View_Video = () => {
    const [form, setform] = useState([])
    const [curSwitch, setCurSwitch] = useState(switchTab[0].classify);
    const [classd, setClassd] = useState({username:{}, file_name: {}});
    const handleSwitch = (item) => {
      setCurSwitch(item.classify)
    }
    const fetchData = () => {
        Fetch('/file/getviewingrecord',{
            page: 1,
            page_size: 100000,
        },'post')
            .then(res=>{
                const tmpList = res.data?.viewing_record
                setform(tmpList)
                setClassd({
                    username: generateByClass(tmpList, 'username'),
                    file_name: generateByClass(tmpList, 'file_name')
                })
            })
            .catch(()=>{
            Taro.showToast({
                title:'网络状况不佳',
                icon:'none'
            }).then(null, null)
        })
    }
    useEffect(()=>{
      fetchData()
    },[])
    const generateByClass = (list, fieldName) => {
        let classedList  = {};
        list.forEach((item) => {
            if(!classedList[item[fieldName]]) {
              classedList[item[fieldName]] = []
            }
            classedList[item[fieldName]].push(item)
        })
        return classedList
    }
    return (
        <View>
            <SwitchTab tabMap={switchTab} handleSwitch={handleSwitch} />
            <ScrollView scrollY  className='submit-column'  style={{height:'80vh'}}>
                {form && form[0] ? <DetailItem data={classd[curSwitch]} type={curSwitch}></DetailItem>:<View>无记录</View>}
            </ScrollView>
        </View>
    )
}

export default View_Video
