import { PickerSelectorProps } from '@tarojs/components'

export interface ModalHoverProps {
  handleClick: (...args: any[]) => any
  newComment: string
  rescue_info_id: number
}

export interface DateTimePickerProps extends PickerSelectorProps {
  onChange?: (...args: any[]) => any
  className?: string
  title: string
  value: number
}

export interface DateInputProps {
  value: [string, string]
  title: string
  onChange?: (...args: any[]) => any
}
