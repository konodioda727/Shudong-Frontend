import { View, Button } from '@tarojs/components'
import { useSelector } from 'react-redux'
import { useReady } from '@tarojs/taro'
import React, { useState } from 'react'
import { AtTextarea } from 'taro-ui'
import './index.scss'
import './index.less'
import { storeType } from '../../../store/storeType'
import { getProcessInfo } from '../../../Service/rescuInfo'
import ModalHover from './components/modalHover'
import Comment from './components/comment'

const RescueComment: React.FC = () => {
  const [hoverShow, setHoverShow] = useState<boolean>(false)
  const [newComment, setNewComment] = useState<string>('')
  const { eventID, process } = useSelector(
    (state: storeType) => state.rescueInfo,
  )
  const getComment = () => getProcessInfo(eventID)
  useReady(() => {
    getComment()
  })

  const handleClick = () => {
    setHoverShow(!hoverShow)
  }

  const handleChange = (value: string) => {
    setNewComment(value)
  }

  function handleComment() {
    setHoverShow(true)
  }
  return (
    <>
      {/*submit hover*/}
      {hoverShow && (
        <ModalHover
          newComment={newComment}
          handleClick={handleClick}
          rescue_info_id={eventID}
        />
      )}

      {/* new comments */}
      <View className="R_comment">
        <View className="Rc_box">
          <View className="c_input">
            <AtTextarea
              value={newComment}
              onChange={handleChange}
              maxLength={200}
              placeholder="请输入你对此次救援效果的评价"
            />
          </View>
          <View className="comment ">
            <Button onClick={() => handleComment()}>发布</Button>
          </View>

          {/* comments */}
          {process.map((item) => {
            return <Comment {...item} key="comment" />
          })}
        </View>
      </View>
    </>
  )
}

export default RescueComment
