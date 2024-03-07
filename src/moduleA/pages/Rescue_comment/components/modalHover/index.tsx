import React, { useState } from 'react'
import { Button, Picker, View } from '@tarojs/components'
import { AtList, AtListItem } from 'taro-ui'
import {
  DateInputProps,
  DateTimePickerProps,
  ModalHoverProps,
} from '../../../types/rescueComment'
import {
  FetchNewProcess,
  getProcessInfo,
} from '../../../../../Service/rescuInfo'

const DateTimePicker: React.FC<DateTimePickerProps> = (props) => {
  const { value, onChange, className, mode, title, range } = props
  return (
    <View className={className}>
      <Picker mode={mode} value={value} onChange={onChange} range={range}>
        <AtList>
          <AtListItem title={title} extraText={value.toString()} />
        </AtList>
      </Picker>
    </View>
  )
}

const RescueTimeInput: React.FC<DateInputProps> = ({
  title,
  value,
  onChange,
}) => (
  <View className="input-wrap">
    <View className="hover-label">&nbsp;{title}：</View>
    <View className="page-section">
      <DateTimePicker
        value={parseInt(value[0])}
        onChange={onChange}
        title="日期"
        // @ts-ignore
        mode="date"
        range={[]} // 如果没有选项范围，传递一个空数组
      />
      <DateTimePicker
        value={parseInt(value[1])}
        onChange={onChange}
        title="时间"
        // @ts-ignore
        mode="time"
        range={[]} // 如果没有选项范围，传递一个空数组
      />
    </View>
  </View>
)

const ModalHover: React.FC<ModalHoverProps> = ({
  handleClick,
  newComment,
  rescue_info_id,
}) => {
  const [startDate, setStartDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endDate, setEndDate] = useState('')
  const [endTime, setEndTime] = useState('')

  const onDateTimeChange = (type: 'start' | 'end', e: any) => {
    const { value } = e.detail
    switch (type) {
      case 'start':
        setStartDate(value[0])
        setStartTime(value[1])
        break
      case 'end':
        setEndDate(value[0])
        setEndTime(value[1])
        break
      default:
        break
    }
  }

  const handleSubmit = () => {
    FetchNewProcess({
      rescue_info_id: rescue_info_id,
      start_time: startDate + ' ' + startTime,
      end_time: endDate + ' ' + endTime,
      evaluation: newComment,
    })
      .then((res) => {
        console.log(res)
        handleClick()
        getProcessInfo(rescue_info_id)
      })
      .catch((error) => console.log({ error }))
  }

  return (
    <>
      <View className="hover-bg"></View>
      <View className="hover-page">
        <View className="hover-text">救援时间</View>
        <RescueTimeInput
          title="开始时间"
          value={[startDate, startTime]} // 使用数组传递日期和时间值
          onChange={(e) => onDateTimeChange('start', e)}
        />
        <RescueTimeInput
          title="结束时间"
          value={[endDate, endTime]} // 使用数组传递日期和时间值
          onChange={(e) => onDateTimeChange('end', e)}
        />
        <View className="button-wrap">
          <Button className="hover-button quit" onClick={handleClick}>
            取消
          </Button>
          <Button className="hover-button" onClick={handleSubmit}>
            提交
          </Button>
        </View>
      </View>
    </>
  )
}

export default ModalHover
