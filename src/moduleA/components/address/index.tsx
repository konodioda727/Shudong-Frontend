import React, { useState, useEffect } from 'react'
import { View, Button, PickerView, PickerViewColumn } from '@tarojs/components'
import proList from './city'
import './index.less'
import { AddressProps, cityType, provinceType } from '../types/addressProps'

const AddressPicker: React.FC<AddressProps> = ({
  withCity,
  onPick,
  onAConfirm,
  address,
}) => {
  const [pos, setPos] = useState<number[]>([1, 1])
  useEffect(() => {
    const picked = address.split('-') as [provinceType, cityType]
    const pickedProInfo = proList.filter((pro) => pro.label === picked[0])[0]
    const pickedCityInfo = pickedProInfo.children.filter(
      (city) => city.label === picked[1],
    )[0]
    setPos([
      parseInt(pickedProInfo.value),
      withCity ? parseInt(pickedCityInfo.value) : -1,
    ])
  }, [])
  function onPickerChange(e) {
    const provinceInfo = e.detail.value[0]
    const cityInfo = e.detail.value[1]
    const provinceName = proList[provinceInfo].label
    const cityName = proList[provinceInfo].children[cityInfo]?.label
    setPos(withCity ? [provinceInfo, cityInfo] : [provinceInfo, -1])
    onPick && onPick(withCity ? `${provinceName}-${cityName}` : provinceName)
  }
  return (
    <>
      <View className="address-hover" onClick={onAConfirm}></View>
      <View id="Apicker-ad">
        <Button className="pConfirm" onClick={onAConfirm}>
          确定
        </Button>
        <PickerView
          className="toast"
          indicatorStyle="height: 50px;"
          style="width: 100%; height: 300px;"
          value={pos}
          onChange={(e) => onPickerChange(e)}
        >
          <PickerViewColumn style={{ paddingLeft: 20, textAlign: 'center' }}>
            {proList.map((province) => (
              <View key={province.value}>{province.label}</View>
            ))}
          </PickerViewColumn>

          {withCity && (
            <PickerViewColumn>
              {proList[pos[0]].children.map((item) => {
                return (
                  <View key={item.value}>
                    {item.label ? item.label + '市' : ''}
                  </View>
                )
              })}
            </PickerViewColumn>
          )}
        </PickerView>
      </View>
    </>
  )
}
export default AddressPicker
