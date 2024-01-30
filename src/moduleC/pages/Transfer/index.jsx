import { useState } from "react";
import { useReady,getCurrentInstance}from "@tarojs/taro";
import { View,Text,Image,Input} from "@tarojs/components";
import './index.less'

const Transfer = () =>{


    return(

        <>
        <View className='transfer'>
            <Input className='search' placeholder='搜索救援队员' />
        </View>
        </>
    )
}

export default Transfer;