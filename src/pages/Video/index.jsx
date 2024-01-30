import Taro, { usePullDownRefresh, useReachBottom } from '@tarojs/taro'
import { View, Button,Image,Input,Text,Picker} from '@tarojs/components'
import { useEffect, useState } from 'react'
import add from '../../images/add-folder.png'
import Fetch from '../../Service/fetch'
import pic from '../../images/video-bk.png'
import folderimg from '../../images/folder.png'
import del from '../../images/delete.png';
import './index.less'



const ModalInput = (props)=>{

    const show= props.modalShow2
    const [foldername,setfoldername] = useState('')
    const [roleNow,setRoleNow] = useState(0)//文件夹可查看身份权限
    const dictionary = [
        '未在册队员',
        '申请队员',
        '岗前培训',
        '见习队员',
        '正式队员',//
        '督导老师',
        '树洞之友'
    ]
    dictionary[40] = "普通队员"
    dictionary[41] = "核心队员"
    dictionary[42] = "区域负责人"
    dictionary[43] = "组委会成员"
    dictionary[44] = "组委会主任"

    const role=[
        '岗前培训',
        '见习队员',
       // '正式队员',
        '督导老师',
        '树洞之友',
        "普通队员",
        "核心队员",
        "区域负责人",
        "组委会成员",
        "组委会主任"]
    function handleShow ()
    {
        props.changeShow2()
    }  

   const oncreateFolder = ()=>{
    if(foldername){
        Fetch(
            '/file/addfolder',
            {
                "folder_name": foldername,
                "role": dictionary.indexOf(role[roleNow])
            },
            'POST'
        ).then(
            res=>{
                console.log(res)
                if(res.code==200){
                    props.changeShow2()
                    props.getFolder(true)
                }
            }
        )
    }
    else
        Taro.showToast({
            title:'请填写文件夹名称!',
            icon:'error',
            duration:2000
        })
   }

   const handleInput = (e) =>{
    console.log(e)
    setfoldername(e.detail.value)
   }

   const  onChange =(e)=>{
    /*  console.log(e.detail.value) */
     const index=e.detail.value
     console.log(index);
     setRoleNow(index);
    }
 
    return(

        <>
        <View className='Modal' style={{display:show?'block':'none'}} id='modal'>
            <View className='Modal_bg'></View>
            <View className='show'>
                <View className='top'>
                    <Input placeholder='输入文件夹名称' value={foldername} onInput={(e)=>handleInput(e)}></Input>
                    <View className='v_role'>
                        <View className='role_now' style={{marginRight:20}}>{dictionary[dictionary.indexOf(role[roleNow])]}</View>{/* 选择器 */}
                        <Picker className='picker' mode='selector' range={role} onChange={(e)=>onChange(e)}>
                            <View className='change'>选择可见身份</View>
                        </Picker>
                    </View>
                </View>
                <View className='flex row'>
                    {/* <Button onClick={getInfo}>获取个人信息</Button> */}
                    <Button className='button noborder' onClick={oncreateFolder}>确定</Button>
                    <Button className='button' onClick={handleShow}>取消</Button>
                </View>
            </View>
        </View>

        </>
    )
}

const Modal = (props)=>{

    const show= props.modalShow1
    const id = props.folderid

    function handleShow ()
    {
        props.changeShow1()
    }

    function ondeleteFolder(){
        Fetch(
            '/file/deletefolder',
            {
                "folder_id": id
            },
            'post'
        ).then(
            res=>{
                console.log(res)
                if(res.code==200)
                { Taro.showToast({
                        title:'删除成功!',
                        icon:'success'
                    })
                    props.changeShow1()
                    props.getFolder(true)
                }
                if(res.code==400)
                {
                    Taro.showToast({
                        title:res.msg,
                        icon:'none'
                    })
                    props.changeShow1()
                }
                else{
                    Taro.showToast({
                        title:'删除失败,请稍后再试',
                        icon:'error'
                    })
                    props.changeShow1()
                }
            }
        )
    }

    return(

        <>
        <View className='Modal' style={{display:show?'block':'none'}} id='modal'>
            <View className='Modal_bg'></View>
            <View className='show'>
                <View className='top'>
                    <Text>确定删除吗?</Text>
                </View>
                <View className='flex row'>
                    {/* <Button onClick={getInfo}>获取个人信息</Button> */}
                    <Button className='button' onClick={ondeleteFolder}>确定</Button>
                    <Button className='button' onClick={handleShow}>取消</Button>
                </View>
            </View>
        </View>

        </>
    )
}

const Video = ()=>{
    
    const [folder,setFolder] = useState([])
    const [modalShow1,setModalshow1] = useState(false)
    const [modalShow2,setModalshow2] = useState(false)
    const [page,setPage] = useState(0)
    const [folderid,setFolderid] = useState()

    useEffect(()=>{
        getFolder(false);//page初始为0 n应为false
    },[])

    const getFolder = (n)=>{
        Fetch(
            '/file/getfolder',
            {
                "page": n?1:page+1,
                "page_size":10
            },
            'POST'
        ).then(
            res=>{
                console.log(res.data)
                if(!n&&res.data.folder)
                {  
                    setFolder(folder.concat(res.data.folder))
                    setPage(page+1)
                }
                else if(n)
                {
                    setFolder(res.data.folder)
                    setPage(1)
                }
                else
                    Taro.showToast({
                        title:'到底了!',
                        icon:'none'
                    })
            }
        )
    }

   usePullDownRefresh(()=>{
    getFolder(true);
    setTimeout(()=>{
        Taro.stopPullDownRefresh()
    },1000)
    
    })

    useReachBottom(()=>{
        getFolder(false);
    })

    const toVideoInfor = (id)=>{
        Taro.navigateTo({
            url:  `/moduleC/pages/VideoList/index?id=${id}`
        })

    }
    
    const tocreate=()=>{
        changeShow2()
    }

    function changeShow1()
    {
        setModalshow1(!modalShow1)
        //console.log('change' + modalShow)
    }

    function changeShow2()
    {
        setModalshow2(!modalShow2)
        //console.log('change' + modalShow)
    }

    function handeldelete(id){//删除文件夹
        setFolderid(id);
        changeShow1();
    }

    return (
        <>
            <Modal modalShow1={modalShow1} folderid={folderid} changeShow1={changeShow1} handeldelete={handeldelete} getFolder={getFolder} />
            <ModalInput modalShow2={modalShow2} changeShow2={changeShow2} getFolder={getFolder} />
            <View className='video'>
                <View className='v-top'>
                    <View className='pic'>
                        <Image src={pic} />
                    </View>
                {Taro.getStorageSync('role')>=42?
                    <View className='create'onClick={tocreate}>
                        <Image src={add} />
                        <View className='text'>新建文件夹</View>
                    </View>:''
                }
                </View>
                <View className='v-list'>
                    {folder.map((item)=>{
                        return (
                            item.role<=Taro.getStorageSync('role')?//判断文件夹是否可见
                            <View className='v-item' key={item.id} >
                                <View className='icon' onClick={()=>toVideoInfor(item.id)}><Image src={folderimg} /></View>
                                <View className='theme' onClick={()=>toVideoInfor(item.id)}>{item.folder_name}</View>
                                <View className='f-del' onClick={()=>handeldelete(item.id)}>
                                    <Image src={del} />
                                </View>
                            </View>:''
                        )
                    })}
                    
                </View>
            </View>
        </>
    )
}
export default Video;