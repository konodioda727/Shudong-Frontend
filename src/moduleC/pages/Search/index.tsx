import { useState } from 'react'
import Taro, { useDidShow } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import 'taro-ui/dist/style/index.scss'
import SearchBar from '../../../Components/searchbar'
import MsgItem from '../../../Components/msgItem'
import './index.less'
import Fetch from '../../../Service/fetch'

interface SearchProps {
  classnames: string
}

const Search = (props: SearchProps) => {
  const chooseGroup: string[] = ['区域', '志愿者']
  const values: string[] = ['rescue/address', 'rescue/rescueteachername']
  const tags: string[] = ['address', 'rescue_teacher_name']
  const [url, setUrl] = useState(values[0])
  const [tag, setTag] = useState(tags[0])
  const [choose, setChoose] = useState(chooseGroup[0])
  const [indicatorShow, setIndicatorShow] = useState(false)
  const [query, setQuery] = useState('')
  const [form, setForm] = useState<any[]>([])
  const [page, setPage] = useState(1)
  const [mine, setMine] = useState<any>()

  useDidShow(() => {
    getMyRescue()
  })

  const handleChoose = (index: number) => {
    setChoose(chooseGroup[index])
    setUrl(values[index])
    setTag(tags[index])
    handleShowIndicator()
  }

  const handleShowIndicator = () => {
    setIndicatorShow(!indicatorShow)
  }

  const handleChange = (e: string) => {
    setQuery(e)
  }

  const getMyRescue = () => {
    Fetch(
      '/rescue/claimed',
      {
        page: 1,
        page_size: 10,
      },
      'POST',
    )
      .then((res) => {
        console.log(res)
        setMine(res.data.list)
      })
      .catch((error) => console.log(error))
  }

  const appendData = (flag: boolean, pagecur?: number) => {
    const currentPage = pagecur || 1
    Fetch(
      '/' + url,
      {
        page: currentPage,
        page_size: 10,
        [tag]: query,
      },
      'post',
    )
      .then((res) => {
        if (res.data.list) {
          if (flag) setForm((prevData) => [...prevData, ...res.data.list])
          else setForm(res.data.list)
        } else {
          if (flag)
            Taro.showToast({
              title: '没有更多了哦',
              icon: 'none',
            })
          else
            Taro.showToast({
              title: '未能找到相关数据',
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
    setPage(page + 1)
    appendData(true, page + 1)
  }

  const handleSubmit = () => {
    appendData(false)
  }

  return (
    <>
      {indicatorShow && (
        <View
          className="hoverPage"
          onClick={() => setIndicatorShow(false)}
        ></View>
      )}
      <SearchBar
        className={props.classnames}
        query={query}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      ></SearchBar>
      <View className="selector-wrap" onClick={handleShowIndicator}>
        <View className="infoSign">筛选条件</View>
        <View className="indicator">{choose}</View>
        <View className={indicatorShow ? 'tags movein' : 'tags moveout'}>
          {chooseGroup.map((item, index) => (
            <View
              key={item}
              className="suggestion"
              onClick={() => handleChoose(index)}
            >
              {item}
            </View>
          ))}
        </View>
      </View>
      <ScrollView
        scrollY
        className="dataset"
        onScrollToLower={handleScroll}
        style={{ height: '80vh' }}
      >
        {form &&
          form.map((item, index) => (
            <MsgItem
              data={item}
              {...item}
              ifmine={form.some(
                (itm) => JSON.stringify(item) === JSON.stringify(itm),
              )}
              key={index}
              flag="main"
            ></MsgItem>
          ))}
      </ScrollView>
    </>
  )
}

export default Search
