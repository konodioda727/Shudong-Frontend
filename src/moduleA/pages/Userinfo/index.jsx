import Taro from "@tarojs/taro";
import { useEffect, useState} from "react";
import { View ,Picker} from "@tarojs/components";
import { AtInput,AtButton,AtList,AtListItem,AtAvatar} from 'taro-ui'
import './index.scss'
import './index.less'
import Fetch from "../../../Service/fetch";
import AddressPicker from "../../components/address";

const Info=()=>{

    const [name,setName]=useState('张伟')
    const [ifedit,setIfedit]=useState(false)
    const [tel,setTel]=useState('12314')
    const [email,setEmail]=useState('1231134@qq.com')
    const [identity,setIdentity]=useState('申请队员')
    const [position,setPosition]=useState('普通队员')
    const [address,setAddress]=useState() //地址
    const [showPicker,setShowPicker]=useState(false)//显示地址picker
    const [dateSel,setDateSel]=useState('1990-1-1') //出生日期
    const [sex,setSex]=useState(['男','女'])//0:男 1:女
    const [sexSelected,setSexselected]=useState(0)
    const [avatar,setAvatar] = useState('')
    const [role,setRole] = useState(0)
    const dictionary = [
      '非在册队员',
      '申请队员',
      '岗前培训',
      '见习队员',
      '正式队员',
      '督导老师',
  ]
  dictionary[40] = "普通队员"
  dictionary[41] = "核心队员"
  dictionary[42] = "区域负责人"
  dictionary[43] = "组委会成员"
  dictionary[44] = "组委会主任"

    useEffect(()=>{
      Fetch(
        '/user/info',
        {},
        "POST"
        ).then(
          res=>{
            const {username,email,role,avatar,birthday,sex,mobile,address} =res.data.user_info
            setAddress(address)
            setEmail(email)
            setDateSel(birthday)
            setName(username)
            setSexselected(sex)
            setAvatar(avatar)
            setTel(mobile)
            setRole(role)
          }
        ).catch(error=>console.log(error))
    },[])

    function handleEdit(){
        setIfedit(true)
    }
    function chooseAddress()
    {
        /* console.log('choose') */
        setShowPicker(true)
    }

    function onDateChange(e)
    {
      setDateSel(e.detail.value)
    }
    function onAConfirm()
    {
      setShowPicker(false)
    }

    function onSexchange(e)
    {
     /*  console.log(e) */
      if(e.detail.value=='1')
        setSexselected(1)
      else
        setSexselected(0)
    }
    function onNameChange(value){
        console.log('name'+value)
          setName(value)
          return value
      }
      function onPhoneChange(value)
      {
       /*  console.log('name'+value) */
          setTel(value)
          return value
      }
      function onEmailchange(value)
    {
        setEmail(value)
    }

    function handleChange(){
        //update 提交修改

        setIfedit(false)
        Fetch(
          '/user/edit',
          {
            "mobile": tel,
            "username": name,
            "sex": sexSelected,
            "email": email,
            "address": address,
            "birthday": dateSel
          },
          'POST'
        ).then(
          res=>{
            console.log(res)
            Taro.showToast({
              title: '修改成功!',
              icon: 'success',
              duration: 2000
            })
          }
        )
    }

    function changeAvatar(){
      Taro.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有，在H5浏览器端支持使用 `user` 和 `environment`分别指定为前后摄像头
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths = res.tempFilePaths
          var path= tempFilePaths[0]
          Taro.uploadFile({
            url: 'https://shudong814.com/api/v1/user/uploadavatar',
            filePath: path,
            name: 'file',
            header: {
              "Content-Type": "multipart/form-data",
              "Authorization": Taro.getStorageSync('token'),
            },
            success(ress){
              console.log(ress)
              if(ress.statusCode==200){
              const resData = JSON.parse(ress.data)
              console.log(resData)
              setAvatar(resData.data.url)
              }
              else if(ress.statusCode==502)
                Taro.showToast({
                  title:'图片大小超过限制',
                  icon:'error'
                })
            }
          , fail: err => {
            Taro.showToast({
              title:'图片大小超过限制',
              icon:'error'
            })
            // handle error
          }})
        }

      })
    }


    function onPickerChange(e){
        setAddress(e)
    }

    return (

        <>
        <View className='Info'>
            <View className='edit'>
                <AtButton className='eButton' onClick={handleEdit}>修改</AtButton>
            </View>
            <View onClick={changeAvatar}>
            <AtAvatar  circle size='large' className='avatar' image={avatar?avatar:'https://s2.loli.net/2023/04/24/5PCWehS8mk4d7QG.jpg'} ></AtAvatar>
            </View>
            <View className='Form_i'>
                <AtInput
                  editable={ifedit}
                  name='value'
                  title='姓名'
                  type='text'
                  placeholder={name}
                  value={name}
                  onChange={onNameChange.bind(this)}
                />
            </View>
            <View className='Form_i'>
            <AtInput
              editable={false}
              name='value'
              title='手机号'
              type='number'
              placeholder='请输入手机号'
              value={tel}
              onChange={onPhoneChange.bind(this)}
            />
          </View>
          <View className='Form_i' onClick={chooseAddress} >

                <AtList >
                  <AtListItem
                    disabled={!ifedit}
                    title='省市'
                    extraText={address}
                  />
                </AtList>

            </View>
            <View className='Form_i'>
                <Picker mode='date' onChange={(e)=>onDateChange(e)}>
                  <AtList>
                    <AtListItem disabled={!ifedit} title='请选择出生日期' extraText={dateSel} />
                  </AtList>
                </Picker>
          </View>
          <View className='Form_i'>
              <Picker mode='selector' range={sex} onChange={(e)=>onSexchange(e)} >
                <AtList>
                  <AtListItem
                    disabled={!ifedit}
                    title='性别'
                    extraText={sex[sexSelected]}
                  />
                </AtList>
              </Picker>
            </View>
          <View className='Form_i'>
              <AtInput
                editable={ifedit}
                name='value'
                title='邮箱'
                type='text'
                placeholder='输入邮箱'
                value={email}
                onChange={onEmailchange.bind(this)}
              />
            </View>

            <View className='Form_i'>
              <AtInput
                editable={false}
                name='value'
                title='队员身份'
                type='text'
                placeholder='身份'
                value={dictionary[role]}
              />
            </View>

            {ifedit?<AtButton type='primary' onClick={handleChange} size='normal' >保存</AtButton>:''}
        </View>
        {showPicker?
        <AddressPicker address={address} onAConfirm={onAConfirm} onPick={onPickerChange} city={true}></AddressPicker>
          :''}
        </>
    )
}

export default Info;
