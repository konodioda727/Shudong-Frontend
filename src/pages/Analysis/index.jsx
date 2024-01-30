import { View ,Image} from "@tarojs/components";
import { useEffect, useState } from "react";
import Taro from "@tarojs/taro";
import './index.less'
import Fetch from "../../Service/fetch";

const Analyse = () =>{

  const [areaData,setAreaData] = useState([])
  const [yearData,setYearData] = useState([])

  useEffect(()=>{

    Fetch(
      '/rescue/arearescuefrequency',
      {},
      'POST'
    ).then(
      res=>{
        console.log(res)
        setAreaData(res.data.list)
      }
  )

  Fetch(
    '/rescue/yearrescuefrequency',
    {},
    'POST'
        ).then(
    res=>{
      console.log(res)
      setYearData(res.data.list)
    })

  },[])

  
  function toTeamAnalyse(){
    Taro.navigateTo({
      url:`/moduleB/pages/TeamAnalyse/index?area=${JSON.stringify(areaData)}&yeardata=${JSON.stringify(yearData)}`
    })
  }
  return(
    <>
    <View>
      <View className='team' onClick={toTeamAnalyse}>
        <View className='png'>
          <Image src='https://s2.loli.net/2023/07/31/SRhzm7JHMEi3ZOB.png'></Image>
        </View>
        <View className='text'>团队救援情况数据分析</View>
      </View>
    </View>
    </>
  )
}

export default Analyse;