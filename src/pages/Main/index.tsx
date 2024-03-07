import Taro, { useReachBottom, usePullDownRefresh } from '@tarojs/taro'
import { View, Icon } from '@tarojs/components'
import { useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import MsgItem from '../../Components/msgItem'
import { storeType } from '../../store/storeType'
import { getMyInfo, getRescueInfo, resetRescue } from '../../Service/myInfo'
import { Nav } from '../../utils/taroFunctions'
import './index.less'

const Main = () => {
  const { myInfo } = useSelector((state: storeType) => state.myInfo)
  const rescue = myInfo.role >= 3

  useEffect(() => {
    getMyInfo()
    rescue && getRescueInfo('claimed')
    rescue && getRescueInfo('unclaimed')
  }, [rescue])

  //下拉刷新
  usePullDownRefresh(() => {
    rescue && resetRescue()
  })
  //加载更多
  useReachBottom(() => {
    console.log('reach')
    rescue && getRescueInfo('unclaimed')
  })

  function toSearch() {
    rescue
      ? Nav('/moduleC/pages/Search/index')
      : Taro.showToast({
          title: '见习队员及以上才能查看救援信息哦',
          icon: 'none',
        })
  }

  return (
    <>
      <View className="Main-top">
        <View className="Main-title">报警通知</View>
        <Icon
          className="search"
          size="20"
          type="search"
          color="#101010"
          onClick={toSearch}
        />
      </View>
      {rescue ? (
        <RescueInfoList />
      ) : (
        <View className="shenqing">
          成为见习队员才能够领取救援任务哦,首先去参加岗前培训吧!
        </View>
      )}
    </>
  )
}
export default Main

const RescueInfoList: React.FC = () => {
  return (
    <>
      <View className="Main column">
        <View className="M_content">
          <ClaimedRescueList></ClaimedRescueList>
          <UnclaimedRescueList></UnclaimedRescueList>
        </View>
      </View>
    </>
  )
}
const ClaimedRescueList: React.FC = () => {
  const { claimedRescueInfo } = useSelector((state: storeType) => state.myInfo)
  console.log(claimedRescueInfo)
  return (
    <>
      <View className="Mine-noti">我救援的</View>

      <View className="Main-list column">
        {claimedRescueInfo ? (
          claimedRescueInfo.map((item) => <MsgItem {...item} key="rescue" />)
        ) : (
          <View className="btm">暂时没有报警信息</View>
        )}
      </View>
    </>
  )
}
const UnclaimedRescueList: React.FC = () => {
  const { unclaimedRescueInfo } = useSelector(
    (state: storeType) => state.myInfo,
  )
  return (
    <>
      <View className="Mine-noti">其他报警</View>
      <View className="Main-list column">
        {unclaimedRescueInfo.map((item) => (
          <MsgItem {...item} key="rescue" />
        ))}
      </View>
    </>
  )
}
