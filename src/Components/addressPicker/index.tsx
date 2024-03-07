import React from 'react'
import { View } from '@tarojs/components'
import { AddressPickerProps } from '../types/addressPickerTypes'
import cityList from './city'

const Picker: React.FC<AddressPickerProps> = (props) => {
  const { onDismiss, onCityPickerChange, onCityOk } = props

  function handleCityPickerChange(value, selectedOption, e) {
    console.log('cityChange', value, selectedOption, e)
    onCityPickerChange && onCityPickerChange()
  }

  function handleCityOnOk(value, selectedOption, e) {
    console.log('cityOk', value, selectedOption, e)
    onCityOk && onCityOk()
  }
  function handleDismiss(e) {
    console.log('handleDismiss', e)
    onDismiss && onDismiss()
  }

  return (
    <>
      <View>
        {/*@ts-ignore*/}
        <list-item>
          请选择省市
          {/*@ts-ignore*/}
          <cascader-picker
            slot="extra"
            placeholder="请选择归属地"
            options={cityList}
            onChange={handleCityPickerChange}
            onOk={handleCityOnOk}
            onCancel={handleDismiss}
          />
          {/*@ts-ignore*/}
        </list-item>
      </View>
    </>
  )
}

export default Picker
