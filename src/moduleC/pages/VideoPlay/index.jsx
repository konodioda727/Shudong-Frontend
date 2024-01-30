import { View,Video, Button} from "@tarojs/components";
import { useEffect, useState} from "react";
import Taro,{ getCurrentInstance}from "@tarojs/taro";
import Fetch from "../../../Service/fetch";
import './index.less'


const VPlay = ()=>{

    const params = getCurrentInstance()
    const param = params.router.params
    const [playtime,setPlaytime] = useState(0)//播放时长
    const [fasttime,setFasttime] = useState(0)//

    //const vurl = JSON.parse(param.url)
    const data = JSON.parse(decodeURIComponent(param.url))


    useEffect(()=>{
        console.log(data)

        let videoContext = Taro.createVideoContext('video')
        videoContext.play()
    },[])


    function getTime(e){
        // console.log(e)
        setPlaytime(Math.floor(e.detail.currentTime / e.detail.duration * 100))
       //console.log(playtime, e)
        // if(e.detail.currentTime-playtime > 3)//视频快进
        // {
        //     Taro.showToast({
        //         title:'快进了',
        //         icon:'none'
        //     })
        //     const interval =  e.detail.currentTime-playtime;//快进时间
        //     setFasttime(fasttime + interval)
        // }
    }

    function handlePlaytime(){
        Fetch(
            '/file/submitviewingrecord',
            {
                "file_id": data.id,
                "learn_time": new Date(),
                'duration': playtime
            },
            'POST'
        ).then(
            (res)=>{
                //console.log(res)
                if(res.code==200)
                    Taro.showToast({
                        title:'时长已记录!',
                        icon:"success"
                    })
                else
                    Taro.showToast({
                        title:'记录失败,请稍后再试!',
                        icon:"error"
                    })
            }
        )

    }

    return(
        <>
        <View className='v_box'>
            <Video
              className='video'
              id='video'
              src=/* 'http://orderpal.muxixyz.com/1695564039029831jkjsd' */{data.url}
             // poster='https://misc.aotu.io/booxood/mobile-video/cover_900x500.jpg'
              initialTime={0}
              onTimeUpdate={getTime}
              controls
              //autoplay
              direction='90'
              playBtnPosition='center'
              enablePlayGesture
              title={data.name}
              loop={false}
              muted={false}
            ></Video>
            <View className='v_title'>{data.name}</View>
            <Button className='record' onClick={handlePlaytime}>记录学习时长</Button>
            <View className='tip'>每次观看完一定记得记录时长哦!</View>
        </View>
        </>
    )
}
export default VPlay;
