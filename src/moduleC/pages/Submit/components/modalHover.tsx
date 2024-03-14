import { useState } from 'react'
import Taro from '@tarojs/taro'
import Fetch from '../../../../Service/fetch'
import { Button, View } from '@tarojs/components'

export const ModalHover = ({ handleClick, post_id }) => {
  const [Objvalue, setObjValue] = useState(1)
  const [Subvalue, setSubValue] = useState(1)
  const handleButtonClick = (e, flag) => {
    if (flag == 0) setObjValue(parseInt(e))
    else setSubValue(parseInt(e))
  }
  const handleSubmit = () => {
    if (!Objvalue || !Subvalue)
      Taro.showToast({
        title: '成绩未输入完毕',
        icon: 'none',
        duration: 1000,
      })
    if (Objvalue <= 1 && Objvalue >= 0 && Subvalue <= 1 && Subvalue >= 0) {
      let date = new Date()
      Fetch(
        '/exam/enterobjective',
        {
          user_id: post_id,
          result: Objvalue,
          time: date,
        },
        'post',
      )
        .then((res) => {
          Fetch(
            '/exam/entersubjective',
            {
              user_id: post_id,
              result: Subvalue,
              time: date,
            },
            'post',
          )
            .then((res) => {
              Taro.showToast({ title: '上传成功' })
              handleClick()
            })
            .catch((err) => {
              Taro.showToast({ title: '上传失败' })
            })
        })
        .catch((err) => {
          Taro.showToast({ title: '上传失败' })
        })
    } else {
      Taro.showToast({
        title: '请输入正确的成绩,0-未通过,1-通过',
        icon: 'none',
        duration: 1000,
      })
    }
  }
  return (
    <>
      <View className="hover-bg"></View>
      <View className="hover-page">
        <View className="hover-text">提交成绩</View>
        <View className="input-wrap">
          <View className="hover-label">主观题成绩：</View>
          <Button
            className={!Subvalue ? 'sub-button gray' : 'sub-button'}
            onClick={() => handleButtonClick(1, 1)}
          >
            通过
          </Button>
          <Button
            className={Subvalue ? 'sub-button gray' : 'sub-button deny'}
            onClick={() => handleButtonClick(0, 1)}
          >
            不通过
          </Button>
          {/* <Input className='hover-input' onInput={(e)=>handleInput(e,1)} value={Subvalue}></Input> */}
        </View>
        <View className="input-wrap">
          <View className="hover-label">客观题成绩：</View>
          <Button
            className={!Objvalue ? 'sub-button gray' : 'sub-button'}
            onClick={() => handleButtonClick(1, 0)}
          >
            通过
          </Button>
          <Button
            className={Objvalue ? 'sub-button gray' : 'sub-button deny'}
            onClick={() => handleButtonClick(0, 0)}
          >
            不通过
          </Button>
          {/* <Input className='hover-input' onInput={(e)=>handleInput(e,0)} value={Objvalue}></Input> */}
        </View>
        <View className="button-wrap">
          <Button className="hover-button quit" onClick={() => handleClick()}>
            取消
          </Button>
          <Button className="hover-button" onClick={handleSubmit}>
            提交
          </Button>
        </View>
      </View>
    </>
  )
}
