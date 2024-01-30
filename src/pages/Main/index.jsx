import Taro ,{useReachBottom, usePullDownRefresh}from '@tarojs/taro'
import { View, Icon,Image} from '@tarojs/components'
import { useEffect, useState } from 'react'
import Fetch from '../../Service/fetch'
import MsgItem from '../../Components/msgItem'
import './index.less'



const Main = ()=>{

    const [rescue,setRescue]=useState(false);
   //const [address,setAddress] = useState('')
    const [page,setPage] = useState(0)
    const limit =10
   // const [fresh,setFresh] = useState(false)//刷新标识
    const [bottom,setBottom] = useState(false)
    const [list,setList] = useState([])//救援信息
    const [mine,setMine] = useState([])//我的救援任务
   
    useEffect(()=>{
      Fetch(
        '/user/info',
        {},
        'POST'
      ).then(res => {
       // console.log(res)
      //  setAddress(res.data.user_info.address)
        if(res.data.user_info.role>=3)/* ¸见习队员及以上才可以参与救援 */
         { 
            setRescue(true)
          //获取救援信息
           getMyrescue()
           getOther()
         }
         else{
          setRescue(false)
         }
        }
        )
         
    },[rescue])
 
    function getOther(){
      const p = page + 1

      const D = {
        //address:res.data.user_info.address.substring(0,2),
        page:p,
        page_size:limit
      }
     // console.log(D)
      Fetch(
      '/rescue/unclaimed',
      D,
      'POST'
      ).then(res=>{
      //console.log(res.data)
      if(res.code==200 && res.data.list!=null)
      {   setBottom(false)
          setPage(p)
          setList(list.concat(res.data.list))
      }
      else
         { setBottom(true)
          Taro.showToast({
            title:'已经到底了',
            icon:'none'
          })
         }
      })
  }

   function getNewother(){
    Fetch(
      '/rescue/unclaimed',
      {
        page:1,
        page_size:limit
      },
      'POST'
      ).then(res=>{
      //console.log(res.data)
      if(res.data.list!=null)
      {   setBottom(false)
          setPage(1)
          setList(res.data.list)
      }
      else
         { setBottom(true)
          Taro.showToast({
            title:'已经到底了',
            icon:'none'
          })
         }
      })
   }

    function getMyrescue(){
    //  获取我的救援信息
          Fetch(
            '/rescue/claimed',
            {
              page:1,
              page_size:10
            },
            'POST'
          )
          .then(
            res=>
          { //console.log(res)
            setMine(res.data.list)
          }).catch(error=>console.log(error))
    }

//下拉刷新
  usePullDownRefresh(() => {
  if(rescue)
   { getMyrescue()
    getNewother()
    setTimeout(()=>{
      Taro.stopPullDownRefresh()
    },1000)
  }

  })
  //加载更多
  useReachBottom(() => {
    if(page>0&&rescue)
      //setFresh(!fresh)
      getOther()
      //setPage(page+1)
  })
  
    function toSearch() {
      if(rescue)
       Taro.navigateTo({
        url:'/moduleC/pages/Search/index'
       })
       else
       {
        Taro.showToast({
          title:'见习队员及以上才能查看救援信息哦',
          icon: 'none',
        })
       }
    }

    return(
        <>
        <View className='Main-top'>
            <View className='Main-title'>报警通知</View>           
            <Icon className='search' size='20' type='search' color='#101010' onClick={toSearch} />
        </View>
        {rescue?
        <View className='Main column'>
            <View className='M_content'>
                <View className='Mine-noti'>
                    我救援的
                </View>
                {/* <View className='subcribe' onClick={subsrcibe}>消息订阅</View> */}
                <View className='Main-list column'>
                  {mine?mine.map((item)=>{
                    return (
                      <MsgItem {...item} data={item}  ifmine key='item' flag='main' />
                    )
                  }):<View className='btm'>暂时没有报警信息</View>}
                </View>
            {/*  <View className='divide'></View> */}
                <View className='Mine-noti'>
                    其他报警
                </View>
                <View className='Main-list column'>
                {list?.map((item) => {
              return (
                <MsgItem {...item} data={item}  key='item' flag='main' />
              )})}
                </View>
            </View>
           {/*  <View className='btm'>{bottom?'已经到底啦!':''}</View> */}
        </View>
        :
        <>
       {/*  <View className='entrance'>
            <View className='e_box' >
              <Image src='https://s2.loli.net/2023/04/30/wk1SQXYLKJuRDPA.png' className='e_icon'></Image>
              <View className='e_title'>岗前培训入口</View>
            </View>
          </View> */}
          <View className='shenqing'>成为见习队员才能够领取救援任务哦,首先去参加岗前培训吧!</View>
        </>}
        </>
    )
}
export default Main;