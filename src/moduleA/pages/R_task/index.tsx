import { getCurrentInstance, useReady } from '@tarojs/taro'
import { useSelector } from 'react-redux'
import { View, Image } from '@tarojs/components'
import Robject from '../../components/Robject'
import './index.less'
import { getMyRescueTargets } from '../../../Service/myInfo'
import { storeType } from '../../../store/storeType'

/* 认领的救援任务 按救援对象分 */
const Task = () => {
  const { myRescueTarget } = useSelector((state: storeType) => state.myInfo)
  useReady(() => {
    const params = getCurrentInstance()
    const param = params?.router?.params
    getMyRescueTargets(
      (item) => item.status === (param?.flag === 'history' ? 2 : 1),
    )
  })
  return (
    <>
      <View className="tasks">
        <View className="box">
          {/* 每个救援过的对象遍历 */}
          {/* <Robject flag='未结案' /> */}
          {myRescueTarget.length ? (
            myRescueTarget.map((_, index) => (
              <Robject key={index} index={index} />
            ))
          ) : (
            <View className="img">
              <View className="text">空空如也~</View>
              <Image src="https://s2.loli.net/2023/04/29/857vFB6iTtZCxlg.png"></Image>
            </View>
          )}
        </View>
      </View>
    </>
  )
}
export default Task
