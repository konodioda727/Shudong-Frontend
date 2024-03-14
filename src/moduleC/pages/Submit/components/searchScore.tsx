import { useEffect, useState } from 'react'
import Fetch from '../../../../Service/fetch'
import Taro from '@tarojs/taro'
import { ModalHover, SearchItem } from '../index'
import { ScrollView, View } from '@tarojs/components'

export const SearchScore = ({ result, handle, query }) => {
  const [form, setform] = useState(result)
  const [hoverShow, sethoverShow] = useState()
  const [page, setpage] = useState(1)
  const [post, setpost] = useState(0)
  const handleClick = (arg) => {
    sethoverShow(!hoverShow)
    setpost(arg)
    if (result) {
      handle(query)
    } else {
      appendData(0)
    }
    setpage(1)
    console.log(arg)
  }
  const appendData = (flag, pagecur) => {
    Fetch(
      '/user/role',
      {
        page: pagecur ? pagecur : 1,
        page_size: 10,
        role: 2,
      },
      'post',
    )
      .then((res) => {
        if (res.data.list)
          if (flag) setform((prevData) => [...prevData, ...res.data.list])
          else setform(res.data.list)
        else {
          Taro.showToast({
            title: '没有更多了哦',
            icon: 'none',
          })
        }
      })
      .catch((err) => {
        Taro.showToast({
          title: '网络状况不佳',
          icon: 'none',
        })
      })
  }
  const handleScroll = () => {
    setpage(page + 1)
    appendData(1, page + 1)
  }
  useEffect(() => {
    if (typeof result != 'undefined') {
      setform(result)
    } else {
      appendData(0)
    }
  }, [result])
  return (
    <>
      {hoverShow && (
        <ModalHover handleClick={handleClick} post_id={post}></ModalHover>
      )}
      <ScrollView
        scrollY
        className="submit-column"
        onScrollToLower={handleScroll}
        style={{ height: '80vh' }}
      >
        {form && form[0] ? (
          form?.map((item) => (
            <SearchItem
              key="search"
              handlClick={handleClick}
              item={item}
            ></SearchItem>
          ))
        ) : (
          <View style={{ textAlign: 'center' }}>
            暂无该用户或已经提交过成绩
          </View>
        )}
      </ScrollView>
    </>
  )
}
export const SearchItem = ({ handlClick, item }) => {
  const { username, id, mobile } = item
  return (
    <>
      <View className="score-wrap">
        <View className="score-info">
          <View className="score-name">{username}</View>
          <View className="score-mobile">{mobile}</View>
        </View>
        <View className="score-button" onClick={() => handlClick(id)}>
          录入成绩
        </View>
      </View>
    </>
  )
}
