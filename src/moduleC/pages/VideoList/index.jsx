import { useEffect, useState } from 'react'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { View, Image, Input, Button, Text } from '@tarojs/components'
import cover from '../../../images/cover.png'
import upload from '../../../images/upload-video.png'
import Fetch from '../../../Service/fetch'
import del from '../../../images/delete.png'
import './index.less'

const ModalInput = (props) => {
  const show = props.modalShow2
  const [Videoname, setVideoname] = useState('')

  function handleShow() {
    props.changeShow2()
  }

  const handleInput = (e) => {
    console.log(e)
    setVideoname(e.detail.value)
  }

  function handleConfirm() {
    if (Videoname) props.uploadVideo(Videoname)
    else
      Taro.showToast({
        title: '课程名不能为空!',
        icon: 'error',
      })
  }
  return (
    <>
      <View
        className="Modal"
        style={{ display: show ? 'block' : 'none' }}
        id="modal"
      >
        <View className="Modal_bg"></View>
        <View className="show">
          <View className="top">
            <Input
              placeholder="输入课程名称"
              value={Videoname}
              onInput={(e) => handleInput(e)}
            ></Input>
          </View>
          <View className="flex row">
            {/* <Button onClick={getInfo}>获取个人信息</Button> */}
            <Button className="button" onClick={handleConfirm}>
              确定
            </Button>
            <Button className="button" onClick={handleShow}>
              取消
            </Button>
          </View>
        </View>
      </View>
    </>
  )
}

const Modal = (props) => {
  const show = props.modalShow1
  const id = props.videoID

  function handleShow() {
    props.changeShow1()
  }

  function ondeleteVideo() {
    Fetch(
      '/file/deletefile',
      {
        file_id: id,
      },
      'post',
    )
      .then((res) => {
        console.log(res)
        Taro.showToast({
          title: '删除成功!',
          icon: 'success',
        })
        props.changeShow1()
        props.getVideo()
      })
      .catch((err) => {
        console.log(err)
        Taro.showToast({
          title: '删除失败!请稍后再试',
          icon: 'none',
        })
      })
  }

  return (
    <>
      <View
        className="Modal"
        style={{ display: show ? 'block' : 'none' }}
        id="modal"
      >
        <View className="Modal_bg"></View>
        <View className="show">
          <View className="top">
            <Text>确定删除吗?</Text>
          </View>
          <View className="flex row">
            {/* <Button onClick={getInfo}>获取个人信息</Button> */}
            <Button className="button" onClick={ondeleteVideo}>
              确定
            </Button>
            <Button className="button" onClick={handleShow}>
              取消
            </Button>
          </View>
        </View>
      </View>
    </>
  )
}

const VList = () => {
  const params = getCurrentInstance()
  const param = params.router.params
  const [video, setVideo] = useState([]) //视频列表
  const [VideoUrl, setVideoUrl] = useState('')
  const [qiniutoken, setQiniutoken] = useState('')
  const [modalShow1, setModalshow1] = useState(false)
  const [modalShow2, setModalshow2] = useState(false)
  //const [vname,setVideoname] = useState('')//课程名
  const [videoID, setVideoID] = useState()

  const getVideo = () => {
    Fetch(
      '/file/getvideo',
      {
        folder_id: parseInt(param.id),
        page: 1,
        page_size: 100,
      },
      'POST',
    ).then((res) => {
      console.log(res.data)
      if (res.data) setVideo(res.data.list)
      else setVideo(null)
    })
  }

  useEffect(() => {
    console.log(param)
    console.log(param.id)

    getVideo()
    Fetch('/file/getqiniutoken', {}, 'POST').then((res) => {
      setQiniutoken(res.data.token)
      //console.log(res.data.token)
    })
  }, [])

  const toPlay = (url, name, id) => {
    console.log(url)
    const videoData = {
      url,
      name,
      id,
    }
    Taro.navigateTo({
      url: `/moduleC/pages/VideoPlay/index?url=${encodeURIComponent(JSON.stringify(videoData))}`, //解决参数过长
    })
  }

  function changeShow2() {
    setModalshow2(!modalShow2)
    // console.log('change' + modalShow2)
  }

  const handleUpload = () => {
    changeShow2() //显示弹窗

    console.log('upload')
  }

  const uploadVideo = (videoname) => {
    changeShow2()

    Taro.chooseVideo({
      //选择视频
      sourceType: ['album'],
      success: function (res) {
        console.log(res)

        const path = res.tempFilePath
        console.log(qiniutoken)
        //七牛云上传
        const timestamp = new Date().getTime()
        const key = timestamp + videoname
        //setVideoname(videoname)
        //const file = res;
        console.log(path)
        Taro.uploadFile({
          filePath: path,
          url: 'https://upload-cn-east-2.qiniup.com', // 七牛云上传地址
          name: 'file',
          formData: {
            token: qiniutoken,
            key: key,
            //   file:path,
          },
          success(res) {
            // console.log(res)
            console.log(res)
            const data = JSON.parse(res.data)
            console.log(data.key)
            setVideoUrl('https://img-bed.shudong814.com/' + data.key)
            console.log('https://img-bed.shudong814.com/' + data.key)

            //传给后端
            Fetch(
              '/file/uploadVideoUrl',
              {
                url: 'https://img-bed.shudong814.com/' + data.key,
                file_name: videoname,
                folder_id: parseInt(param.id),
              },
              'POST',
            )
              .then((ress) => {
                console.log(ress)
                Taro.showToast({
                  title: '上传成功!',
                  icon: 'success',
                })
                getVideo()
              })
              .catch((err) => console.log(err))
          },
          fail: (error) => {
            console.error('上传失败', error)
          },
        })
      },
    })
  }

  function changeShow1() {
    setModalshow1(!modalShow1)
  }

  function deleteVideo(id) {
    setVideoID(id)
    changeShow1() //显示删除弹窗
  }

  return (
    <>
      <Modal
        changeShow1={changeShow1}
        modalShow1={modalShow1}
        videoID={videoID}
        getVideo={getVideo}
      />
      <ModalInput
        changeShow2={changeShow2}
        modalShow2={modalShow2}
        uploadVideo={uploadVideo}
      />
      <View className="vInfo">
        {Taro.getStorageSync('role') >= 42 ? (
          <View className="upload" onClick={handleUpload}>
            <Image src={upload} />
          </View>
        ) : (
          ''
        )}
        {video ? (
          video.map((item) => {
            return (
              <View className="v-box" key={item.id}>
                <View
                  className="cover"
                  onClick={() => toPlay(item.url, item.file_name, item.id)}
                >
                  <Image src={cover} />
                </View>
                <View
                  className="v-name"
                  onClick={() => toPlay(item.url, item.file_name, item.id)}
                >
                  {item.file_name}
                </View>
                {Taro.getStorageSync('role') >= 42 ? (
                  <View
                    className="v-delete"
                    onClick={() => deleteVideo(item.id)}
                  >
                    <Image src={del} />
                  </View>
                ) : (
                  ''
                )}
              </View>
            )
          })
        ) : (
          <View className="img">
            <View className="text">空空如也~</View>
            <Image src="https://s2.loli.net/2023/04/29/857vFB6iTtZCxlg.png"></Image>
          </View>
        )}
      </View>
    </>
  )
}

export default VList
