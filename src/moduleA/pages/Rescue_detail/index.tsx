import Taro, { getCurrentInstance, useReady } from '@tarojs/taro'
import { View, Text, Image, Button, Input } from '@tarojs/components'
import React, { useState } from 'react'
import arr from '../../../images/right_arrow.png'
import './index.less'
import Fetch from '../../../Service/fetch'
import { useSelector } from 'react-redux'
import { storeType } from '../../../store/storeType'
import { Clip, Nav } from '../../../utils/taroFunctions'
import { rescueStatus } from '../../../Components/types/rescueMessageItemTypes'
import { getImgUrl } from '../Alarm'
import { updateSignUrls } from '../../../slices/rescueInfoSlice'

const R_detail: React.FC = () => {
  const { rescueInfo, targetInfo, signUrls } = useSelector(
    (state: storeType) => state.rescueInfo,
  )
  const {
    weibo_address,
    nickname,
    birthday,
    create_time,
    text,
    sex,
    area,
    risk_level,
    rescue_target_id,
  } = rescueInfo
  const {
    status,
    rescue_teacher1_role,
    rescue_teacher2_role,
    rescue_teacher3_role,
    rescue_teacher1_name,
    rescue_teacher2_name,
    rescue_teacher3_name,
  } = targetInfo
  const stat = rescueStatus[targetInfo ? targetInfo.status : 0]
  //     const [create_time,setCreate_time] = useState('')
  //     const [weibo_address,setweibo_address] = useState('')
  //     const [nickname,setNickname] = useState('')
  //     const [risk_level,setRisk_level] = useState('')
  //     const [teacher,setTeacher] = useState([])
  //     const Sex = [
  //         '女',
  //         '男'
  //     ]
  //     const [sex,setSex] = useState(0)
  //     const [text,setText] = useState('')
  //     const [birthday,setBirthday] = useState('')
  //     const [area,setArea] = useState('')
  //     const [id,setId] = useState('')//救援对象的id
  //     const [infoid, setInfoid] = useState('')//信息的id
  const [ownerSignUrl, setOwnerSignUrl] = useState('')
  const teachers = [
    rescue_teacher1_name,
    rescue_teacher2_name,
    rescue_teacher3_name,
  ]
  const teachersRole = [
    rescue_teacher1_role,
    rescue_teacher2_role,
    rescue_teacher3_role,
  ]
  //     const [signUrls,setSignUrls] = useState([])

  //     const [finish,setFinish]=useState(false)
  //     const [flag,setFlag]=useState(false)
  //     const [lap,setLap] = useState([])
  //    /*  const [main,setMain] = useState(false)//核心成员
  //     const [low,setLow] = useState(false)//资历浅的成员(见习) */
  //
  // /*     const  [c_text,setC_text]=useState('') */

  Fetch(
    '/rescue/getsignature',
    {
      rescue_target_id: rescue_target_id,
    },
    'POST',
  )
    .then((res) => {
      console.log(res)
      switch (res.code) {
        case 200: {
          updateSignUrls(
            res.data.list.map((item) => {
              return item.image
            }),
          )
          break
        }
        default:
          break
      }
    })
    .catch((error) => console.log(error))

  function toComment() {
    Nav(`/moduleA/pages/Rescue_comment/index`)
  }
  function showModal() {
    Taro.showModal({
      title: '去签字',
      content: '结案需要所有救助老师签字,待全部人签字后可结案',
      success: function (res) {
        res.confirm && jumpToSign()
      },
    })
  }

  const jumpToSign = () => {
    const eventKey = `${new Date().getTime()}`
    Taro.eventCenter.once(eventKey, (data) => {
      //console.log(data)
      setOwnerSignUrl(data.url)

      const base64url = imgToBase64(data.url)

      console.log(base64url)
      if (base64url)
        Fetch(
          '/rescue/sign',
          {
            rescue_target_id: rescue_target_id,
            image: base64url,
          },
          'POST',
        ).then(() => {
          Taro.showToast({
            title: '签字保存成功',
            icon: 'success',
            duration: 2000,
          })
        })
    })

    Nav(`/moduleA/pages/Sign/index?type=${eventKey}`)
    /* 还要将该结案通知发给其他救助老师，都签字后自动结案 */
  }

  const handleClip = () => Clip(weibo_address)

  return (
    <>
      <View className="R_detail">
        <View className="R_Title">
          <Text className="r_info">报警信息</Text>
          <View className="r_flag" style={{ backgroundColor: stat.color }}>
            {stat.text}
          </View>
          <View className="lap">
            <Input type={'text'}></Input>
            {teachersRole.map((item) => {
              return <Image key="lap" src={getImgUrl(item)}></Image>
            })}
          </View>
        </View>
        <View className="R_time">{create_time}</View>
        <View className="R_list">
          <View className="R_container">
            <View className="border_l"></View>
            <View className="R_t">微博账号</View>
            <View className="address blue">{weibo_address}</View>
            <View className="copy" onClick={handleClip}>
              <Image
                className="icon"
                src="https://s2.loli.net/2023/08/11/EF5Ug9GChQxtodi.png"
              ></Image>
            </View>
            {/* <View className='R_c blue' onClick={toWeibo}>点击跳转微博主页</View> */}
          </View>
          <View className="R_container">
            <View className="border_l"></View>
            <View className="R_t">微博昵称</View>
            <View className="R_c">{nickname}</View>
          </View>
          <View className="R_container">
            <View className="border_l"></View>
            <View className="R_t">所在城市</View>
            <View className="R_c">{area}</View>
          </View>
          <View className="R_container">
            <View className="border_l"></View>
            <View className="R_t">性别:</View>
            <View className="R_c">{sex}</View>
          </View>
          <View className="R_container">
            <View className="border_l"></View>
            <View className="R_t">生日</View>
            <View className="R_c">{birthday}</View>
          </View>
          <View className="R_container">
            <View className="border_l"></View>
            <View className="R_t">微博内容</View>
            <View className="R_c">{text}</View>
          </View>
          <View className="R_container">
            <View className="border_l"></View>
            <View className="R_t">风险等级</View>
            <View className="R_c">{risk_level}</View>
          </View>
          <View className="R_container">
            <View className="border_l"></View>
            <View className="R_t">救助老师</View>
            <View className="R_c">
              {teachers.map((item) => {
                return item + ' '
              })}
            </View>
          </View>
          <View className="R_container bottom">
            <View className="border_l"></View>
            <View className="R_comment" onClick={toComment}>
              救援效果评价
            </View>
            <View className="R_arrow">
              <Image src={arr} style={{ width: 20, height: 20 }} />
            </View>
          </View>
        </View>
        {ownerSignUrl ? (
          <Image src={ownerSignUrl} onClick={() => jumpToSign()} />
        ) : (
          ''
        )}
        <View className="column">
          {signUrls
            ? signUrls.map((item) => {
                return <Image src={item} />
              })
            : ''}
        </View>
        {/* TODO 修改结案渲染逻辑 */}
        {(
          <View className="R_bottom">
            {/*  <Button className='greenB' onClick={transfer}>转介</Button> */}
            <Button className="greenB" onClick={showModal}>
              结案
            </Button>
          </View>
        )}
      </View>
    </>
  )
}

export default R_detail

/* base64加密上传 */
export function imgToBase64(path) {
  let res = ''
  try {
    const base64 = Taro.getFileSystemManager().readFileSync(path, 'base64')
    if (base64) {
      res = 'data:image/jpeg;base64,' + base64
    }
  } catch (error) {
    console.warn('=> utilssearch.ts error imgToBase64', error)
    throw error
  } finally {
    return res
  }
}
