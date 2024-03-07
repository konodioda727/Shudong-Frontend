import { View } from '@tarojs/components'
import React, { useEffect, useState } from 'react'
import './index.less'
import {
  RescueMessageItemProps,
  rescueStatus,
} from '../types/rescueMessageItemTypes'
import { Nav } from '../../utils/taroFunctions'
import { FetchRescueTargetInfo } from '../../Service/rescueInfoByID'
import { RescueTargetInfoType } from '../../Service/fetchTypes'
import {
  updateRescueInfo,
  updateTargetInfo,
} from '../../slices/rescueInfoSlice'
import store from '../../store/store'

const RescueMessageItem: React.FC<RescueMessageItemProps> = (props) => {
  const { navURL, ...restProps } = props
  const [targetInfo, setTargetInfo] = useState<RescueTargetInfoType>()
  useEffect(() => {
    FetchRescueTargetInfo(restProps.rescue_target_id).then((res) => {
      setTargetInfo(res.data.rescue_target_info)
    })
  }, [])
  function Navi() {
    const navURL_real = navURL || '/moduleA/pages/Alarm/index'
    store.dispatch(updateRescueInfo(restProps))
    targetInfo && store.dispatch(updateTargetInfo(targetInfo))
    Nav(navURL_real)
  }

  return (
    <View className="noti-item column" onClick={Navi}>
      <View className="inline">
        <View
          className="state"
          style={{
            backgroundColor:
              rescueStatus[targetInfo ? targetInfo.status : 0].color,
          }}
        >
          {rescueStatus[targetInfo ? targetInfo.status : 0].text}
        </View>
        <View className="rescued_level">风险等级：{props.risk_level}</View>
      </View>
      <View>
        <View className="rescued_info">
          <View className="row">
            <View className="border_l"></View>微博内容：
          </View>
          <View className="demand">{props.text}</View>
        </View>
        <View className="rescued_city">地点：{props.area}</View>
      </View>
    </View>
  )
}

export default RescueMessageItem
