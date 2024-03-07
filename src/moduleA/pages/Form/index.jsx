import Taro, { useDidShow } from '@tarojs/taro'
import { View, Picker, Text, Image, Button } from '@tarojs/components'
import { useState } from 'react'
import {
  AtInput,
  AtList,
  AtListItem,
  AtButton,
  AtModal,
  AtModalHeader,
  AtModalContent,
  AtModalAction,
} from 'taro-ui'
import Fetch from '../../../Service/fetch'
import AddressPicker from '../../components/address'
import './index.less'
import './index.scss'

const Form = () => {
  const [name, setName] = useState('') //姓名
  const [tel, setTel] = useState(Taro.getStorageSync('phone')) //手机号
  const [dateSel, setDateSel] = useState('1990-1-1') //出生日期
  const [sex, setSex] = useState(['男', '女']) //0:男 1:女
  const [sexSelected, setSexselected] = useState(0)
  const [email, setEmail] = useState('') //邮箱
  const [address, setAddress] = useState('-')
  const [showPicker, setShowPicker] = useState(false) //显示地址picker
  const [status, setstatus] = useState(0)
  const Query = (Res) => {
    setSexselected(Res?.sex)
    setAddress(Res?.address)
    setEmail(Res?.email)
    setDateSel(Res?.birthday)
    setName(Res?.username)
    setTel(Res?.mobile)
    setstatus(Res?.status)
    Res?.status && Taro.setStorageSync('status', Res?.status)
    if (Taro.getStorageSync('submit')) setIfopen(false)
    if (Res?.status >= 2) {
      console.log('success')
      Taro.reLaunch({
        url: '/pages/Main/index',
      })
    } else
      Taro.reLaunch({
        url: `/moduleC/pages/Auditform/index?status=${Res.status}`,
      })
  }
  function fetchData() {
    Fetch('/application/form', {}, 'POST').then((res) => {
      console.log(res?.data)
      const Res = res?.data?.application_form
      Query(Res)
    })
  }

  useDidShow(() => {
    //console.log(Taro.getStorageSync('submit'))
    if (status < 2 && Taro.getStorageSync('submit')) {
      fetchData()
      /*  setInterval(() => {
          fetchDataActions()
        }, 5000); */
    }
  })

  function onNameChange(value) {
    /*     console.log('name'+value) */
    setName(value)
    return value
  }
  function onPhoneChange(value) {
    /*  console.log('name'+value) */
    setTel(value)
    return value
  }

  function onDateChange(e) {
    setDateSel(e.detail.value)
    console.log(e.detail.value)
  }
  /*
    function onCityChange(e)
    {
      setCityChecked(e.detail.value)
    } */

  function onSexchange(e) {
    console.log(e)
    if (e.detail.value == '1') setSexselected(1)
    else setSexselected(0)
  }
  function onEmailchange(value) {
    setEmail(value)
  }
  function generateText() {
    switch (status) {
      case 0:
        return '区域负责人审批中，请耐心等待'
      case 1:
        return '组织管理委员会审批中，请耐心等待'
      case 2:
        return '申请已通过'
      case 3:
        return '申请未通过,请修改申请后重新提交'
      default:
        return '网络状况不佳'
    }
  }
  function onPickerChange(e) {
    setAddress(e)
  }

  function chooseAddress() {
    /* console.log('choose') */
    setShowPicker(true)
  }
  function onAConfirm() {
    setShowPicker(false)
  }

  function register() {
    const data = {
      mobile: tel,
      username: name,
      sex: sexSelected,
      email,
      address: address,
      birthday: dateSel,
    }
    // console.log(data);

    if (name && tel && address != '-' && dateSel && email) {
      //const add=address.pro+'-'+address.city;

      Fetch('/application/edit', data, 'post').then((res) => {
        console.log(res)
        //更新个人信息
        Fetch('/user/edit', data, 'POST').then(console.log(res))
        Taro.setStorageSync('submit', true)
        setstatus(0)
        //订阅消息
        Taro.requestSubscribeMessage({
          tmplIds: ['_xbtX5gtyvi8uhpHsAmt-XhcdfTpXd7HLWh-ahuUptU'],
          success: function (ress) {
            console.log(ress)
          },
          fail: function (err) {
            console.log(err)
          },
        })
      })
      Taro.reLaunch({
        url: `/moduleC/pages/Auditform/index?status=${0}`,
      })
    }
    if (!name || !tel || address == '-' || !dateSel || !email) {
      Taro.showToast({
        icon: 'none',
        title: '还没有填完哦',
      })
    }
  }
  const [ifopen, setIfopen] = useState(true)
  function handleConfirm() {
    console.log('confirm')
    setIfopen(false)
  }

  function handleCancle() {
    Taro.navigateTo({
      url: '/pages/Welcome/index',
    })
  }

  return (
    <>
      <AtModal isOpened={ifopen}>
        <AtModalHeader>用户服务协议及隐私政策</AtModalHeader>
        <AtModalContent>
          &nbsp;&nbsp;本平台保护所有用户的个人隐私权。我们将按照本隐私权政策的规定收集、使用或披露您的个人信息。同时，我们会通过本政策向您说明，我们如何为您提供访问、
          更新、控制和保护您信息的服务。您使用或继续使用我们的服务，即意味着同意我们按照本《用户协议和隐私政策》收集、使用、储存和分享您的相关信息。如对本政策或相关事宜有任何问题，请通过微信或邮箱与我们联系。
        </AtModalContent>
        <AtModalContent>
          &nbsp;&nbsp;树洞救援团, 以帮助抑郁症患者缓解自杀情绪为责任,
          以拯救生命为最高伦理原则. 如果您愿意成为救援团的志愿者,
          本页面收集的您的姓名、手机号、邮箱等个人信息皆只用于您的身份审核,
          确保不会泄漏您的个人信息.{' '}
        </AtModalContent>
        <AtModalAction>
          {' '}
          <Button onClick={handleCancle}>不同意</Button>{' '}
          <Button onClick={handleConfirm}>我已了解且同意该政策</Button>{' '}
        </AtModalAction>
      </AtModal>
      {/*  {Taro.getStorageSync('submit') && status!=3 && Taro.getStorageSync('submit') && <View className='hover' onClick={()=>{
          Taro.showToast({
            icon: 'none',
            title: '申请审核中,无法更改申请表'
          });
        }}
        ></View>} */}
      <View className="Form">
        <Text
          style={{
            fontSize: 25,
            fontFamily: 'sans-serif',
            marginBottom: 30,
            marginLeft: 20,
            color: 'white',
          }}
        >
          申请表
        </Text>
        <View className="f_box">
          <View className="Form_i">
            <AtInput
              name="value"
              title="姓名"
              type="text"
              placeholder="输入姓名"
              value={name}
              onChange={onNameChange.bind(this)}
            />
          </View>
          <View className="Form_i">
            <AtInput
              name="value"
              title="手机号"
              type="number"
              placeholder="请输入手机号"
              value={tel}
              onChange={onPhoneChange.bind(this)}
            />
          </View>
          <View className="Form_i">
            <Picker mode="date" onChange={(e) => onDateChange(e)}>
              <AtList>
                <AtListItem title="请选择出生日期" extraText={dateSel} />
              </AtList>
            </Picker>
          </View>
          {/*地址选择器 */}
          <View className="Form_i" onClick={chooseAddress}>
            <AtList>
              <AtListItem title="省市" extraText={address} />
            </AtList>
          </View>

          <View className="Form_i">
            <Picker
              mode="selector"
              range={sex}
              onChange={(e) => onSexchange(e)}
            >
              <AtList>
                <AtListItem title="性别" extraText={sex[sexSelected]} />
              </AtList>
            </Picker>
          </View>
          <View className="Form_i">
            <AtInput
              name="value"
              title="邮箱"
              type="text"
              placeholder="输入邮箱"
              value={email}
              onChange={onEmailchange.bind(this)}
            />
          </View>
        </View>
        {/* {Taro.getStorageSync('submit')?'': */}
        <View className="Form_i">
          <AtButton type="primary" onClick={register} size="normal">
            提交
          </AtButton>
        </View>
        {/* } */}
      </View>
      {/* 地址选择器 */}
      {showPicker && (
        <AddressPicker
          city={true}
          address={address}
          onPick={onPickerChange}
          onAConfirm={onAConfirm}
        ></AddressPicker>
      )}
      {/*  {Taro.getStorageSync('submit')&&(
            <View className='status'>
              {status <= 2
              ?<Image src='https://s2.loli.net/2023/07/13/guH2r1Ls8a9MXAP.png' className='statusImage'></Image>
              :<Image src='https://s2.loli.net/2023/07/12/MQxoNHPhKUGTlXZ.png' className='statusImage'></Image>}
              <View className='status-text' style={{color: status<=2?'#f4bb2a':'#e16531'}}>{generateText()}</View>
            </View>
          )} */}
    </>
  )
}

export default Form
