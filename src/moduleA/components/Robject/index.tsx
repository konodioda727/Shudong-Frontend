import React from 'react'
import { useSelector } from 'react-redux'
import { View, Image } from '@tarojs/components'
import './index.less'
import { storeType } from '../../../store/storeType'
import { Clip, Nav } from '../../../utils/taroFunctions'
import { RobjectProps } from '../types/RobjectProps'

/* 一个救援对象可以有多条报警 救援记录 */
const Robject: React.FC<RobjectProps> = ({ index }) => {
  const myRescueTarget = useSelector(
    (state: storeType) => state.myInfo.myRescueTarget[index],
  )
  console.log('res', myRescueTarget, index)
  const { rescue_teacher1_name, rescue_teacher2_name, rescue_teacher3_name } =
    myRescueTarget

  const teacher = [
    rescue_teacher1_name,
    rescue_teacher2_name,
    rescue_teacher3_name,
  ]

  const toR_record = () => {
    Nav(`/moduleA/pages/R_record/index?index=${index}`)
  }
  const handleClip = () => {
    Clip(myRescueTarget.weibo_address)
  }
  return (
    <>
      <View className="object" onClick={toR_record}>
        <View className="object_n">
          救援对象
          <View className="flag">
            {myRescueTarget.status === 1 ? '未结案' : '已结案'}
          </View>
        </View>
        <View className="item row">
          <View className="border_l"></View>微博昵称: {myRescueTarget.nickname}
        </View>
        <View className="item row">
          <View className="border_l"></View>
          <View className="R_t">微博账号:</View>
          <View className="address blue">{myRescueTarget.weibo_address}</View>
          <View className="copy" onClick={handleClip}>
            <Image
              className="icon"
              src="https://s2.loli.net/2023/08/11/EF5Ug9GChQxtodi.png"
            ></Image>
          </View>
        </View>
        <View className="item row">
          <View className="border_l"></View>
          {'救援老师: '}
          {teacher.map((item) => {
            return ' ' + item + '  '
          })}
        </View>
      </View>
    </>
  )
}

export default Robject
