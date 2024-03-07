import React from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Button, Image } from '@tarojs/components'
import { useSelector } from 'react-redux'
import './index.less'
import {
  rescueStatus,
  rescueStatusType,
} from '../../../Components/types/rescueMessageItemTypes'
import { FetchClaim } from '../../../Service/myInfo'
import { Clip, Nav } from '../../../utils/taroFunctions'
import { R_containerProps } from '../types/alarm'
import store from '../../../store/store'
import { storeType } from '../../../store/storeType'

const Alarm: React.FC = () => {
  const { targetInfo, rescueInfo } = useSelector(
    (state: storeType) => state.rescueInfo,
  )
  const {
    weibo_address,
    id,
    create_time,
    text,
    risk_level,
    nickname,
    area,
    sex,
    birthday,
  } = rescueInfo
  const {
    rescue_teacher1_name,
    rescue_teacher1_role,
    rescue_teacher2_name,
    rescue_teacher2_role,
    rescue_teacher3_name,
    rescue_teacher3_role,
    status,
  } = targetInfo
  const teacher = [
    rescue_teacher1_name,
    rescue_teacher2_name,
    rescue_teacher3_name,
  ]
  const teacherRole = [
    rescue_teacher1_role,
    rescue_teacher2_role,
    rescue_teacher3_role,
  ]
  const statusInfo: rescueStatusType = rescueStatus[status]
  const handleClip = () => Clip(weibo_address)

  const containers: R_containerProps[] = [
    {
      title: '微博账号',
      children: (
        <>
          <View className="address blue">{weibo_address}</View>
          <View className="copy" onClick={handleClip}>
            <Image
              className="icon"
              src="https://s2.loli.net/2023/08/11/EF5Ug9GChQxtodi.png"
            ></Image>
          </View>
        </>
      ),
    },
    {
      title: '微博昵称',
      context: nickname,
    },
    {
      title: '所在地区',
      context: area,
    },
    {
      title: '性别',
      context: sex,
    },
    {
      title: '生日',
      context: birthday,
    },
    {
      title: '微博内容',
      context: text,
    },
    {
      title: '风险等级',
      context: risk_level,
    },
    {
      title: '救助老师',
      context: teacher ? teacher.map((item) => item + ' ') : '无',
      className: 'bottom',
    },
  ]

  const toComment = () => {
    Nav(`/moduleA/pages/Rescue_comment/index`)
  }
  const ifMine = (() =>
    store.getState().myInfo.claimedRescueInfo.some((item) => item.id === id))()

  const Claim = () => {
    FetchClaim(id)
      .then(() => {
        Taro.showToast({
          title: '认领成功!',
          icon: 'success',
          duration: 2000,
        })
      })
      .catch((error) => console.log(error))
  }

  return (
    <>
      <View className="R_detail">
        <View className="R_Title">
          <Text className="r_info">报警信息</Text>
          <View
            className="r_flag"
            style={{ backgroundColor: statusInfo.color }}
          >
            {statusInfo.text}
          </View>
          <View className="lap">
            {teacherRole.map((role) => (
              <Image key="lap" src={getImgUrl(role)}></Image>
            ))}
          </View>
        </View>
        <View className="R_time">{create_time}</View>
        <View className="R_list">
          {/* rescue info list */}
          {containers.map((item) => (
            <RescueContainer {...item}></RescueContainer>
          ))}

          <View className="f_adapt row_center">
            <Button onClick={ifMine ? toComment : Claim}>
              {ifMine ? '效果评价' : '认领'}
            </Button>
          </View>
        </View>
      </View>
    </>
  )
}

export default Alarm

export const RescueContainer: React.FC<R_containerProps> = (props) => {
  const { title, context, className, children, ...restProps } = props
  return (
    <>
      <View className={`R_container ${className}`} {...restProps}>
        <View className="border_l"></View>
        <View className="R_t">{title}</View>
        {context && <View className="R_c">{context}</View>}
        {children}
      </View>
    </>
  )
}

export const getImgUrl = (role: number) =>
  role >= 4
    ? 'https://s2.loli.net/2023/08/01/12k9zWOSDYmjPop.png'
    : role != 0
      ? 'https://s2.loli.net/2023/08/01/Ki8w7kyB5VAaLSY.png'
      : 'https://s2.loli.net/2023/08/01/F5WpGfAobgNOyYQ.png'
