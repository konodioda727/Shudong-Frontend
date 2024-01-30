import {View} from "@tarojs/components";
import {useEffect, useState} from "react";
import './index.less'

const DetailItem = (props) => {
    const { data, type } = props;
    const [renderItem, setRenderItem] = useState({})
    useEffect(()=>{
        setRenderItem( geneRender(Object.keys(data), data) )
    }, [data])
    return (renderItem[type]?renderItem[type]:<View>nothing</View>)
}

export default DetailItem

const geneRender = (dataTags, data) => {
    return {
        username: dataTags.map(item=>(<UserItem type='file_name' item={item} data={data[item]} />)),
        file_name: dataTags.map(item=>(<FileItem type='username' item={item} data={data[item]} />))
    }
}
export const UserItem = (props) => {
    const {data, item, type} = props;
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(!open)
    }
    return (
        <View className='item-wrap' onClick={() => handleOpen()}>
            <View className='item-title'>{item}</View>
            {open && (<View className='switch-drop'>
                {data.map(ite=>{
                    return (
                        <View className='item-dropdown'>
                            <View className='item-details'>{ite[type]}</View>
                            <View className='item-duration'>{'观看时长: '+ ite['duration'] + "%"}</View>
                        </View>
                    )
                    })}
            </View>)}
        </View>
    )
}
export const FileItem = (props) => <UserItem {...props}></UserItem>
