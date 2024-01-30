import {useState} from "react";
import {View} from '@tarojs/components'
import './index.less'


const SwitchTab = (props) => {
  const {handleSwitch, tabMap} = props;
    const [curIndex, setCurIndex] = useState(0)
  function handleClick(item) {
      setCurIndex(item.key)
      handleSwitch && handleSwitch(item)
  }
  return (
    <View className='switch-tab-bar'>
      {tabMap && tabMap.map((item) => (
        <View
          key={item.key}
          onClick={()=>handleClick(item)}
          className={curIndex === item.key ? 'switch-tab-item checked' : 'switch-tab-item'}
        >
            {item.name}
        </View>
      ))}
    </View>
  )
}

export default SwitchTab
