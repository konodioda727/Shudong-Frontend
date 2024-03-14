import { useState } from 'react'
import { useReady, getCurrentInstance } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.less'
import Fetch from '../../../Service/fetch'

const Report = () => {
  const [pass, setPass] = useState<boolean>(false)
  const [duration, setDuration] = useState<string>('')
  const [frequency, setFrequency] = useState<string>('')

  useReady(() => {
    const params = getCurrentInstance()
    const param = params.router!.params
    console.log(param.role)
    if (Number(param.role) < 4) setPass(false)
    else setPass(true)

    Fetch('/user/rescueduration', {}, 'POST').then((res) =>
      setDuration(res?.data.rescue_duration),
    )

    Fetch('/user/rescuefrequency', {}, 'POST').then((res) =>
      setFrequency(res.data.rescue_frequency),
    )
  })

  return (
    <>
      {pass ? (
        <View className="Grade">
          <View className="box">
            <View className="title">
              <Text style={{ textAlign: 'center' }}>转正报告</Text>
              {/* <View className='boder_b'></View> */}
            </View>
            {/* <View className='R_time'></View> */}
            <View className="row1">你已经成功转正啦!</View>
            <View className="row1">
              在你加入救助以来，你一共参与救援了
              <Text style={{ fontWeight: 400, fontSize: 30, color: '#76A9FF' }}>
                {frequency}
              </Text>
              次
            </View>
            <View className="row1">
              救援时长累计
              <Text style={{ fontWeight: 400, fontSize: 30, color: '#76A9FF' }}>
                {duration}
              </Text>
            </View>
            <View className="row1">
              恭喜你正式成为树洞救援团的一员！期待未来和你一起救助更多的人！
            </View>
          </View>
        </View>
      ) : (
        <View className="img">
          <View className="text">还没有内容哦</View>
          <Image src="https://s2.loli.net/2023/04/29/857vFB6iTtZCxlg.png"></Image>
        </View>
      )}
    </>
  )
}

export default Report
