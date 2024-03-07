import { useReachBottom, useRouter } from '@tarojs/taro'
import { useSelector } from 'react-redux'
import { View, Image } from '@tarojs/components'
import React, { useEffect } from 'react'
import RescueMessageItem from '../../../Components/msgItem'
import './index.less'
import { storeType } from '../../../store/storeType'
import {
  getRescueInfoByID,
  getRescueTargetInfo,
} from '../../../Service/rescueInfoByID'

/* 一个救援对象所对应的救援记录 */

const Record: React.FC = () => {
  const { data } = useSelector((state: storeType) => state.rescueInfoByID)
  const { myRescueTarget } = useSelector((state: storeType) => state.myInfo)

  const router = useRouter()
  const { index } = router?.params as { index: string }
  const currentTarget = myRescueTarget[parseInt(index) || 0]
  useEffect(() => {
    getRescueInfoByID(currentTarget.id, 0)
    getRescueTargetInfo(currentTarget.id)
  }, [])
  useReachBottom(() => {
    console.log(111)
    getRescueInfoByID()
  })

  return (
    <>
      <View className="record">
        <View className="rec_box">
          {data ? (
            data.map((item) => (
              <RescueMessageItem
                {...item}
                navURL="/moduleA/pages/Rescue_detail/index"
              />
            ))
          ) : (
            <View className="img">
              <View className="text">还没有救援记录哦</View>
              <Image src="https://s2.loli.net/2023/04/29/857vFB6iTtZCxlg.png"></Image>
            </View>
          )}
        </View>
      </View>
    </>
  )
}

export default Record
