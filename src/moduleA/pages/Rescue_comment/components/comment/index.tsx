import React, { useEffect, useState } from 'react'
import { View } from '@tarojs/components'
import { AtAvatar } from 'taro-ui'
import { FetchUserInfo } from '../../../../../Service/myInfo'
import { RescueProcess } from '../../../../../Service/fetchTypes'

const Comment: React.FC<RescueProcess> = (props) => {
  const [avatar, setAvatar] = useState('')
  const [username, setUsername] = useState('')
  const { duration, evaluation, create_time, rescue_teacher_id } = props
  useEffect(() => {
    FetchUserInfo(rescue_teacher_id).then((res) => {
      console.log(res)
      setAvatar(res.data.user_info.avatar)
      setUsername(res.data.user_info.username)
    })
  }, [])
  return (
    <>
      <View className="R_index" key="comment">
        {/* 每次评价 */}

        <View className="item row" style={{ fontWeight: 200 }}>
          <AtAvatar image={avatar} circle size="small"></AtAvatar>
          <View className="c_name">{username}</View>
          <View className="R_time">{create_time}</View>
        </View>
        <View className="row">
          <View className="border_l"></View>评价内容：
          <br />
        </View>
        <View className="c_text">{evaluation}</View>
        <View className="duration row">
          <View className="border_l"></View>救援时长:{duration}
        </View>
      </View>
    </>
  )
}

export default Comment
