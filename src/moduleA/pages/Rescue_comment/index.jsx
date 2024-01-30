import { View,Button , Picker } from '@tarojs/components'
import Taro, {getCurrentInstance,useReady}  from '@tarojs/taro'
import { useEffect, useState } from 'react'
import { AtTextarea,AtAvatar,AtList, AtListItem  } from 'taro-ui'
import './index.scss'
import './index.less'
import Fetch from '../../../Service/fetch'


const Comment = (props)=>{
    const [avatar,setAvatar] = useState('')
    const [username,setUsername] = useState('')
    useEffect(()=>{
        Fetch(
            '/user/id',
            {
                "user_id": props.rescue_teacher_id
            },
            'POST'
        ).then(
            res=>{
                console.log(res)
                setAvatar(res.data.user_info.avatar)
                setUsername(res.data.user_info.username)
            }
        )
    },[props])
    return (
        <>
            <View className='R_index' key='comment'>{/* 每次评价 */}
               
                <View className='item row' style={{fontWeight:200}}>
                    <AtAvatar image={avatar} circle size='samll'></AtAvatar>
                    <View className='c_name'>{username}</View>
                    <View className='R_time'>{props.create_time}</View>
                </View>
                <View className='row'><View className='border_l'></View>评价内容：<br /></View>
                <View className='c_text'>{props.evaluation}</View>
                <View className='duration row'><View className='border_l'></View>救援时长:{props.duration}</View>
            </View>
        </>
    )
}

export const ModalHover= ({handleClick,id,newcomment,getComment}) => {
   
    const [startDate,setStartDate] = useState('')
    const [startTime,setStartTime] = useState('')
    const [endTime,setEndTime] = useState('')
    const [endDate,setEndDate] = useState('')


    const onDateChangestart=(e)=>{
        console.log(e)
        setStartDate(e.detail.value)
    }

    const onTimeChangestart=(e)=>{
        console.log(e)
        setStartTime(e.detail.value)
    }

    const onDateChangeend=(e)=>{
        setEndDate(e.detail.value)
    }

    const onTimeChangeend=(e)=>{
        setEndTime(e.detail.value)
    }

    const handleSubmit = () => {
    
         Fetch(
            '/rescue/process',
            {
                "rescue_info_id": id,
                "start_time": startDate+' '+startTime,
                "end_time": endDate+' '+endTime,
                "evaluation": newcomment
            },
            'POST'
        )
        .then(
            res=>{
                console.log(res)
                handleClick()
                getComment()
                
            }
        ).catch(error=>console.log({error}))
        
    }
    return (
        <>
        <View className='hover-bg'></View>
        <View className='hover-page'>
            <View className='hover-text'>救援时间</View>
            <View className='input-wrap'>
                <View className='hover-label'>&nbsp;开始时间：</View>
            <View className='page-section'>
                <View className='date-input'>
                <Picker mode='date' onChange={(e)=>onDateChangestart(e)}>
                    <AtList>
                    <AtListItem title='日期' extraText={startDate} />
                    </AtList>
                </Picker>
                </View>
                <View className='time-input'>
                <Picker mode='time' onChange={(e)=>onTimeChangestart(e)}>
                    <AtList>
                    <AtListItem title='时间' extraText={startTime} />
                    </AtList>
                </Picker>
            </View>
          </View>
            </View>
            <View className='input-wrap'>
                <View className='hover-label'>&nbsp;结束时间：</View>
                <View className='page-section'>
                <View className='date-input'>
                <Picker mode='date' onChange={(e)=>onDateChangeend(e)}>
                    <AtList>
                    <AtListItem title='日期' extraText={endDate} />
                    </AtList>
                </Picker>
                </View>
                <View className='time-input'>
                <Picker mode='time' onChange={(e)=>onTimeChangeend(e)}>
                    <AtList>
                    <AtListItem title='时间' extraText={endTime} />
                    </AtList>
                </Picker>
            </View>
          </View>
            </View>
            <View className='button-wrap'>
                <Button className='hover-button quit' onClick={()=>handleClick()}>取消</Button>
                <Button className='hover-button' onClick={handleSubmit}>提交</Button>
            </View>
        </View>
        </>
    )
} 
const R_comment=()=>{

    const [hoverShow, sethoverShow] = useState(false)
    const [comment,setComment] = useState([])
    const [userid,setuserid] = useState('')
  
   const params = getCurrentInstance()
   const param = params.router.params
    useReady(()=>{
        setNewcomment('')
       // console.log(param)
       getComment()
    })

    function  getComment(){
        Fetch(
            '/rescue/getrescueprocess',
            {
                "rescue_info_id":parseInt(param.id),
                "page": 1,
                "page_size": 100
            },
            'POST').then(
                res=>
                {
                    console.log(res)
                    setComment(res.data.list)
                }
            ).catch(error=>console.log(error))
       /*  if(param.flag=='true')       //已结案
            setFinish(true)
        else
            setFinish(false) */
        Fetch(
            '/user/info',
            {},
            'POST'
        ).then(
            res=>
            setuserid(res.data.user_info.id)
        )
    }
    const [newcomment,setNewcomment]=useState('')

    const handleClick = () => {
        sethoverShow(!hoverShow)
    }

    
    function handleChange(value){
        //console.log(value)
        setNewcomment(value)
    }

    function handleComment(){
        
        sethoverShow(true)
        getComment()
       
    }
    return (
        <>
        {hoverShow?<ModalHover id={parseInt(param.id)} newcomment={newcomment} handleClick={handleClick} getComment={getComment}  />:''}
        <View className='R_comment'>
            <View className='Rc_box'>

                <View className='c_input'>
                    <AtTextarea value={newcomment} onChange={handleChange.bind(this)} maxLength={200} placeholder='请输入你对此次救援效果的评价' />  
                </View>
                <View className='comment '>
                    <Button onClick={()=>handleComment()}>发布</Button>
                </View>
                {comment?.map((item)=>{
                    return (
                    <Comment {...item} key='comment' />
                    )
                })}
               
            </View>
            {/* {finish?'':
            <View className='f_comment row_center'>
                <Button >去做最终评价</Button>
            </View>} */}
        </View>
        </>
    )
}

export default R_comment;