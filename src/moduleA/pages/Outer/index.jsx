import { View} from '@tarojs/components'
import { getCurrentInstance } from '@tarojs/taro'
import './index.less'

const Outer=()=>{
    const params = getCurrentInstance()
    const param = params.router.params
    const weibo_address = param.weibo
return (

    <>
    <View className='outer'>
        <web-view src={weibo_address}> </web-view>
    </View>
    </>
)

}

export default Outer;