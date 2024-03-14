import React from 'react'
import { View } from '@tarojs/components'
import { AtSearchBar } from 'taro-ui'
import './index.less'
import { SearchbarProps } from '../types/searchbar'

const SearchBar: React.FC<SearchbarProps> = ({
  className,
  query,
  handleChange,
  handleSubmit,
  ...props
}) => {
  return (
    <>
      <View className={`${className} search-wrap`} {...props}>
        <AtSearchBar
          key="search"
          className="search-bar"
          value={query}
          onChange={(e) => handleChange(e)}
          onActionClick={(e) => handleSubmit(e)}
        ></AtSearchBar>
      </View>
    </>
  )
}
export default SearchBar
