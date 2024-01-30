import React from 'react'
import { View, Text, Button } from '@tarojs/components'
import handleLogin from '../../Service/login'
import './index.less'
import { ModalProps } from '../types/modal'

const Modal: React.FC<ModalProps> = (props) => {
  const { modalShow, changeShow } = props
  return (
    <View
      className="Modal"
      style={{ display: modalShow ? 'block' : 'none' }}
      id="modal"
    >
      <View className="Modal_bg"></View>
      <View className="show">
        <View className="top">
          <Text>授权使用手机号</Text>
        </View>
        <View className="flex row">
          <Button
            className="phoneConfirm"
            type="primary"
            openType="getPhoneNumber"
            onGetPhoneNumber={handleLogin}
          >
            确定授权
          </Button>
          <Button className="phoneCancle" onClick={changeShow}>
            取消
          </Button>
        </View>
      </View>
    </View>
  )
}

export default Modal
