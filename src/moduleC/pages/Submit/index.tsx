import Taro from '@tarojs/taro'
import { useState } from 'react'
import Fetch from '../../../Service/fetch'
import SearchBar from '../../../Components/searchbar'
import { SearchScore } from './components/searchScore'
import './index.less'
import './index.scss'

const Submit = () => {
  const [query, setQuery] = useState<string>()
  const [result, setresult] = useState<undefined | string>()
  const handleChange = (e) => {
    setQuery(e)
    !e && setresult(undefined)
  }
  const fetchnew = (que) => {
    Fetch(
      '/user/trainging',
      {
        page: 1,
        page_size: 10,
        mobile: que,
      },
      'post',
    ).then((res) => {
      setresult([res.data.user_info])
      if (!res.data) {
        setresult(null)
        Taro.showToast({
          title: '岗前培训成员不包含该用户或成绩已录入！',
          icon: 'none',
        })
      }
    })
  }
  const handleSubmit = () => {
    fetchnew(query)
  }
  return (
    <>
      <SearchBar
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        query={query as string}
      ></SearchBar>
      <SearchScore
        result={result}
        handle={fetchnew}
        query={query}
      ></SearchScore>
    </>
  )
}

export default Submit
