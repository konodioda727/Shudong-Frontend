import {View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import { AtButton } from 'taro-ui'
import { useEffect, useState } from 'react';
import Fetch from '../../../Service/fetch';
import './index.less'
import './index.scss'

const ImportRescue = () =>{

    const [access_token,setAccess_token] = useState()
    const [fresh,setFresh] = useState(false)

    useEffect(()=>{
        Fetch(
            '/rescue/auth',
            {
                "mobile": Taro.getStorageSync('phone'),
                "password": "123456"
            },
            'POST'
        ).then(
            res=>{
                setAccess_token(res.data.access_token)
            }
        )
    },[fresh])

    function handleupload(){
        Taro.chooseMessageFile({
            count: 10,
            type: 'file',
            success: function (res) {
               // console.log(res)
              // tempFilePath可以作为img标签的src属性显示图片
              const tempFiles = res.tempFiles
              //console.log(tempFiles)
              const path=tempFiles[0].path
              if(path)
                Taro.uploadFile({
                    url: 'https://shudong814.com/api/v1/rescue/releasebyexcel',
                    filePath: path,
                    name: 'file',
                    header: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": access_token,//认证token
                    },
                    success(ress){
                    console.log(ress)
                    if(ress.statusCode==200)
                    {
                        Taro.showToast({
                        title:'导入成功',
                        icon:'success'
                    })
                    setFresh(true)//access_token已使用
                    }
                    }})
                else{
                    Taro.showToast({
                        title:'选取文件失败'
                    })
                }
            }
        })

    }
    return(
        <>
        <View className='import'>
            <View className='button'>
                <AtButton onClick={handleupload} type='primary' size='normal'>上传excel</AtButton>
            </View>
        </View>
        </>
    )
}

export default ImportRescue;