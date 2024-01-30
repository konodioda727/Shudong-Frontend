import Taro,{getCurrentInstance,useReady} from '@tarojs/taro'
import { View,Text,Image, Button} from '@tarojs/components'
import { useState } from 'react'
import arr from "../../../images/right_arrow.png"
import './index.less'
import Fetch from '../../../Service/fetch'

const R_detail=()=>{

    const [create_time,setCreate_time] = useState('') 
    const [weibo_address,setweibo_address] = useState('')
    const [nickname,setNickname] = useState('')
    const [risk_level,setRisk_level] = useState('')
    const [teacher,setTeacher] = useState([])
    const Sex = [
        '女',
        '男'
    ]
    const [sex,setSex] = useState(0)
    const [text,setText] = useState('')
    const [birthday,setBirthday] = useState('')
    const [area,setArea] = useState('')
    const [id,setId] = useState('')//救援对象的id
    const [infoid, setInfoid] = useState('')//信息的id
    const [ownerSignUrl, setOwnerSignUrl] = useState('');
    const [signUrls,setSignUrls] = useState([])
    const [finish,setFinish]=useState(false)
    const [flag,setFlag]=useState(false)
    const [lap,setLap] = useState([])
   /*  const [main,setMain] = useState(false)//核心成员
    const [low,setLow] = useState(false)//资历浅的成员(见习) */

/*     const  [c_text,setC_text]=useState('') */
const params = getCurrentInstance()
const param = params.router.params
    useReady(()=>{

   // console.log(param)
    const data = JSON.parse(param.data)
    setTeacher(JSON.parse(param.teacher))
    setLap(JSON.parse(param.lap))
    console.log(data)
    setId(data.rescue_target_id)
    setInfoid(data.id)
    setweibo_address(data.weibo_address)
    setCreate_time(data.create_time)
    setRisk_level(data.risk_level)
    setSex(Sex[data.sex])
    setText(data.text)
    setBirthday(data.birthday)
    setArea(data.area)
    setNickname(data.nickname)

    Fetch(
        '/rescue/getsignature',
        {
            "rescue_target_id": data.rescue_target_id
        },
        'POST'
    ).then(
        res=>{
            console.log(res)
            switch(res.code){
                case 200:{
                    setSignUrls(
                    res.data.list.map((item)=>{
                        return (item.image)
                    })
                    )
                    break;
                }
                default : break;
            }
        }
    ).catch(error=>console.log(error))

   /*  if(param.flag=='已结案'||'已救援')
        setFlag(true)
    else if(param.flag=='未结案')
        setFlag(false) */
    if(param.finish=='已结案')
        setFinish(true)
    else
        {setFinish(false)
        setFlag(true)}
  })

  function toComment(){
    Taro.navigateTo({
        url:`/moduleA/pages/Rescue_comment/index?id=${infoid}`
    })
}
    function showModal(){
        Taro.showModal({
            title:'去签字',
            content:'结案需要所有救助老师签字,待全部人签字后可结案',
            success: function (res) {
                if (res.confirm) {
                    jumpToSign()
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
        })
    }

/* base64加密上传 */
    function imgToBase64(path ) {
        let res = "";
        try {
          const base64 = Taro.getFileSystemManager().readFileSync(path, "base64");
          if (base64) {
              res = "data:image/jpeg;base64," + base64;
          }
        } catch (error) {
          console.warn("=> utilssearch.ts error imgToBase64", error);
          throw error;
        } finally {
          return res;
        }
      }


    const jumpToSign = () => {
        
        const eventKey = `${new Date().getTime()}`
        Taro.eventCenter.once(eventKey, data => {
          //console.log(data)
          setOwnerSignUrl(data.url)

         const base64url = imgToBase64(data.url)

         console.log(base64url)
          if(base64url)
            Fetch(
                '/rescue/sign',
                {
                    "rescue_target_id": id,
                    "image": base64url
                },
                'POST'
            ).then(
                res=>{
                    console.log(res)
                    Taro.showToast({
                        title: '签字保存成功',
                        icon: 'success',
                        duration: 2000
                    })
                }
            )
            else{

            }
        })
    
        Taro.navigateTo({ url: `/moduleA/pages/Sign/index?type=${eventKey}` });
        /* 还要将该结案通知发给其他救助老师，都签字后自动结案 */
      }



    /*   function toWeibo(){
        Taro.navigateTo({
            url:`/moduleA/pages/Outer/index?weibo=${weibo_address}`
        })
      } */

      function handleClip(){
        //复制微博地址
                Taro.setClipboardData({
                    data: weibo_address,
                    success: function () {
                    Taro.getClipboardData({
                    success: function (res) {
                        Taro.showToast({
                            title: '复制成功',
                            icon: 'none',
                            duration: 1500
                        })
                        console.log(res.data) // data
                    }
                    })
                }
                  })
            }
    return (

        <>

        <View className='R_detail'>
            <View className='R_Title'>
                <Text className='r_info'>报警信息</Text> 
                <View className='r_flag' style={{backgroundColor:flag?'#f57b70':'#76A9FF'}}>{flag?'救援中':'已救援'}</View>
                <View className='lap'>
                    {lap.map((item)=>{
                        return(
                            <Image key='lap' src={item>=4?'https://s2.loli.net/2023/08/01/12k9zWOSDYmjPop.png':item!=0?'https://s2.loli.net/2023/08/01/Ki8w7kyB5VAaLSY.png':'https://s2.loli.net/2023/08/01/F5WpGfAobgNOyYQ.png'}></Image>
                        )
                    })}
                </View>
            </View>
            <View className='R_time'>{create_time}</View>
            <View className='R_list'>
                <View className='R_container'>
                    <View className='border_l'></View>
                    <View className='R_t'>微博账号</View>
                    <View className='address blue' >{weibo_address}</View>
                    <View className='copy' onClick={handleClip}><Image className='icon' src='https://s2.loli.net/2023/08/11/EF5Ug9GChQxtodi.png' ></Image></View>
                    {/* <View className='R_c blue' onClick={toWeibo}>点击跳转微博主页</View> */}
                </View>
                <View className='R_container'>
                    <View className='border_l'></View>
                    <View className='R_t'>微博昵称</View>
                    <View className='R_c'>{nickname}</View>
                </View>
                <View className='R_container'>
                    <View className='border_l'></View>
                    <View className='R_t'>所在城市</View>
                    <View className='R_c'>{area}</View>
                </View>
                <View className='R_container'>
                    <View className='border_l'></View>
                    <View className='R_t'>性别:</View>
                    <View className='R_c'>{sex}</View>
                </View>
                <View className='R_container'>
                    <View className='border_l'></View>
                    <View className='R_t'>生日</View>
                    <View className='R_c'>{birthday}</View>
                </View>
                <View className='R_container'>
                    <View className='border_l'></View>
                    <View className='R_t'>微博内容</View>
                    <View className='R_c'>{text}</View>
                </View>
                <View className='R_container'>
                    <View className='border_l'></View>
                    <View className='R_t'>风险等级</View>
                    <View className='R_c'>{risk_level}</View>
                </View>
                <View className='R_container'>
                    <View className='border_l'></View>
                    <View className='R_t'>救助老师</View>
                    <View className='R_c'>{teacher.map((item)=>{
                        return (item+' ')
                    })}</View>
                </View>
                <View className='R_container bottom'>
                    <View className='border_l'></View>
                    <View className='R_comment' onClick={toComment}>救援效果评价</View>
                    <View className='R_arrow'>
                        <Image  src={arr} style={{width:20,height:20}} />
                    </View>
                </View>
                </View>
                {ownerSignUrl
                    ? <Image src={ownerSignUrl} onClick={() => jumpToSign()} />
                    : ''
                }
                <View className='column'>
                {signUrls?signUrls.map((item)=>{
                        return(
                            <Image src={item} />
                        )
                    }):''
                }
                </View>
            
            {finish?'':
                <View className='R_bottom'>
                   {/*  <Button className='greenB' onClick={transfer}>转介</Button> */}
                    <Button className='greenB'onClick={showModal} >结案</Button>
                </View>}
            </View>
           
        </>
    )
}

export default R_detail;