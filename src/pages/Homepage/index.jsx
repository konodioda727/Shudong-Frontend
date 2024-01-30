import Taro, { usePullDownRefresh } from '@tarojs/taro'
import { View, Text ,Image} from '@tarojs/components'
import { AtAvatar } from 'taro-ui'
import { useEffect, useState } from 'react'
import Fetch from '../../Service/fetch'
import './index.less'
import './index.scss'


const Home=()=>{


 // const flag='rescuing'
  const his='history'
  const [name,setName]=useState('')
  const [role,setRole]=useState(0)
  const [user_id, setuser_id] = useState()
  const [aprove,setaprove]=useState(false)
  const [manage,setManage] = useState(false)
  const [duration,setDuration] = useState('')
  const [frequency,setFrequency] = useState('')
  const [formal,setFormal] = useState(false)
  const [avatar,setAvatar] = useState('')
  const [rescue,setRescue]= useState(false)

  function getInfo(){
    Fetch(
      '/user/info',
      {},
      'POST'
    ).then(res => {
      console.log(res)
      setName(res.data.user_info.username)
      setRole(res.data.user_info.role)
      setuser_id(res.data.user_info.id)
      setAvatar(res.data.user_info.avatar)
      console.log(res.data.user_info.role)
      if(res.data.user_info.role>=42)
        setaprove(true)
      if(res.data.user_info.role>=43)
        setManage(true)
      if(res.data.user_info.role==4)
        setFormal(true)
      if(res.data.user_info.role>=3)
        setRescue(true)
     })

     Fetch(
      '/user/rescueduration',
      {},
      'POST'
     ).then(
      res=>{
        console.log(res)
        if(res.code==200)
          setDuration(res.data.rescue_duration)
        if(res.code==403)
          setDuration('0h')
      }
     )

     Fetch(
      '/user/rescuefrequency',
      {},
      'POST'
     ).then(
      res=>{
        console.log(res)
        if(res.code==200)
          setFrequency(res.data.rescue_frequency)
        if(res.code==403)
          setFrequency(0)
      }
     )
  }
//个人信息
  useEffect(()=>{
    getInfo()
    },[])

    function toGrade(){
      Taro.navigateTo({
        url:`/moduleC/pages/Grade/index?role=${role}`
      })
    }

  function toMyRescue()
  {
    Taro.navigateTo({
      url:`/moduleA/pages/R_task/index`
    })
  }

  function toRecord(){
    Taro.navigateTo({
      url:`/moduleA/pages/R_task/index?flag=${his}`
    })
  }
  function touserInfo(){
    Taro.navigateTo({
      url:`/moduleA/pages/Userinfo/index?user_id=${user_id}`
    })
  }

  function toReport(){
    Taro.navigateTo({
      url:`/moduleC/pages/Formalreport/index?role=${role}`
    })
  }
function toaprove(){
  Taro.navigateTo({
    url:'/moduleA/pages/Aprovelist/index'
  })
}

function toManage(){
  Taro.navigateTo({
    url:'/moduleA/pages/Manage/index'
  })
}
function toScore(){
  Taro.navigateTo({
    url:`/moduleC/pages/Submit/index?user_id=${user_id}`
  })
}

function toImport(){
  Taro.navigateTo({
    url:'/moduleA/pages/ImportRescue/index'
  })
}

//刷新
usePullDownRefresh(()=>{
  getInfo()
  setTimeout(()=>{
    Taro.stopPullDownRefresh()
  },1000)
})
function toViewVideo() {
    Taro.navigateTo({
      url:'/moduleA/pages/View_Video/index'
    })
}
function toNotice(){
  Taro.navigateTo({
    url:'/moduleC/pages/Notice/index'
  })
}


    return (
      <>
      <View className='home'>
        <View className='person_info' onClick={touserInfo}>
        <AtAvatar circle size='large' className='avatar' image={avatar?avatar:'https://s2.loli.net/2023/04/24/5PCWehS8mk4d7QG.jpg'}></AtAvatar>
        <View className='info_right'>
          <View className='user'>
            <Text className='user_name'/*  style={{fontSize:25}} */>{name}</Text>
            <View className='user_iden'>{role==2?'岗前培训':role==3?'见习队员':role==4?'正式队员':role==5?'督导老师':role==6?'树洞之友':role==40?'普通队员':role==41?'核心队员':role==42?'区域负责人':role==43?'组委会成员':'组委会主任'}</View>
            <Image className='arrow' src='https://s2.loli.net/2023/04/23/ubWaBhcoJtO7NP2.png' style={{width:20,height:20}}></Image>
          </View>
          <View className='rescue_info'>
            <View className='r_time'>救援次数：{frequency}次</View>
            <View className='r_dura'>救援时长：{duration}</View>
          </View>
        </View>
        </View>
        <View className='h_container'>
          <View className='entrance'>
            <View className='e_box' onClick={toMyRescue}>
              <Image src='https://s2.loli.net/2023/04/23/vBmKb1D97pEAxhP.png' className='e_icon'></Image>
              <View className='e_title'>我的救援中任务</View>
            </View>
          </View>
          <View className='h_bottom grid'>
            <View className='h_item' onClick={toGrade}>
              <View className='b_icon' >
                <Image src='https://s2.loli.net/2023/04/23/Phb6fqSnWawsTRY.png'></Image>
              </View>
              <View className='text'>岗前培训成绩</View>
            </View>
            <View className='h_item' onClick={toRecord}>
              <View className='b_icon' >
                  <Image src='https://s2.loli.net/2023/04/23/avkI9rhKFEpnUxA.png'></Image>
                </View>
                <View className='text' >救援记录</View>
            </View>
            {aprove?<View className='h_item' onClick={toViewVideo}>
              <View className='b_icon' >
                <Image src='https://s2.loli.net/2023/11/03/KjX16TIbPuN8ZgO.png'></Image>
              </View>
              <View className='text'>视频观看时长记录</View>
            </View>:''}
            {formal?<View className='h_item' onClick={toReport}>
              <View className='b_icon' >
                  <Image src='https://s2.loli.net/2023/04/23/FYPHSpvgdo1heDu.png'></Image>
                </View>
                <View className='text'>转正报告</View>
            </View>:''}
            {/* <View className='h_item'>
                <View className='b_icon' >
                    <Image src='https://s2.loli.net/2023/04/23/Th9m8S4UFv6QPeL.png'></Image>
                  </View>
                  <View className='text'>督导记录</View>
            </View> */}
            {/* <View className='h_item'>
              <View className='b_icon' >
                  <Image src='https://s2.loli.net/2023/04/23/lTHSjkZKivwDUzy.png' style={{width:45,height:45}}></Image>
                </View>
                <View className='text'>奖惩记录</View>
            </View> */}
            {aprove?
            <View className='h_item' onClick={toaprove}>
              <View className='b_icon' >
                  <Image src='https://s2.loli.net/2023/04/23/rzxgNOwJGeuybPK.png'></Image>
                </View>
                <View className='text'>审批</View>
            </View>:''
          }
          {manage?
            <View className='h_item' onClick={toManage}>
              <View className='b_icon' >
                  <Image src='https://s2.loli.net/2023/04/23/1jUdrw2lMTXx5nG.png'></Image>
                </View>
                <View className='text'>管理</View>
            </View>:''
          }
          {aprove?
            <View className='h_item' onClick={toScore}>
              <View className='b_icon' >
                <Image src='https://s2.loli.net/2023/07/20/ksCZNlKTetUpOvh.png'></Image>
              </View>
              <View className='text'>岗前培训成绩录入</View>
            </View>:''
          }
          {aprove?
          <View className='h_item' onClick={toImport}>
          <View className='b_icon' >
            <Image src='https://s2.loli.net/2023/08/01/jYVXIdJERU3a4we.png'></Image>
          </View>
          <View className='text'>救援信息导入</View>
        </View>:''
          }
          </View>

          <View className='notice' onClick={toNotice}>《树洞救援AI管理系统试用通知》</View>
        </View>

      </View>
      </>
    )

    }

    export default Home;
