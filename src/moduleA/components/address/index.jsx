import { useState, useEffect } from "react"
import { View, Button, PickerView, PickerViewColumn } from "@tarojs/components"
import cityList from "./city"
import './index.less';

const AddressPicker = ({city,onPick, onAConfirm, address}) => {
    const [val, setVal] = useState([1])
    useEffect(() => {
      let mockList = address
      if(city) {
        mockList = address.split('-')
      } 
      console.log(address)
      const proList = Object.values(cityList)
      proList.map((item,index)=>{
        if(item.label === mockList[0]) {
          if(city) {
            item?.children.map((item,idx) =>{
              if(item.label === mockList[1]) {
                setVal([index,idx])
                console.log(index,idx);
              }
            })
          } else {
            setVal([index])
          }
        }
      })
      
    }, [])
    function onPickerChange(e){
        const p=e.detail.value[0]
        const ci=e.detail.value[1]
        setVal(e.detail.value)
        console.log(e.detail.value);
        let data = cityList[p].label 
        if(city) {
            data+='-' + cityList[p].children[ci].label
        }
        onPick(data)
    } 
    return (
        <>
        <View className='address-hover' onClick={onAConfirm}></View>
        <View id='Apicker-ad'>
            <Button className='pConfirm' onClick={onAConfirm}>确定</Button>
            <PickerView  className='toast' indicatorStyle='height: 50px;' style='width: 100%; height: 300px;' value={val} onChange={(e)=>onPickerChange(e)}>
              <PickerViewColumn style={{paddingLeft:20,textAlign:'center'}}>
                {cityList.map(province => {
                  return (
                    <View key={province.value}>{province.label}</View>
                  );
                })}
              </PickerViewColumn>
              
              {city && <PickerViewColumn>
                {cityList[val[0]].children.map(item => {
                  return (
                    <View key={item.value}>{item.label?item.label+'市':''}</View>
                  )
                })}
              </PickerViewColumn>}
            </PickerView>
        </View>
        </>
    )
}
export default AddressPicker