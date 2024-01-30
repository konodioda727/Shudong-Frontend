import { View } from '@tarojs/components'
import { AtSearchBar } from 'taro-ui'
import './index.less'


const SearchBar = ({className, query, handleChange, handleSubmit}) => {

    return (
        <>
        <View className={`${className} search-wrap`}>
            <AtSearchBar 
              key='search'
              className='search-bar'
              value={query}
              onChange={(e)=>handleChange(e)}
              onActionClick={(e) =>handleSubmit(e)} 
            >
            </AtSearchBar>
        </View>
        </>
    )
}
export default SearchBar