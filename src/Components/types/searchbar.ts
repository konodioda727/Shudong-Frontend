import { ViewProps } from '@tarojs/components'

export interface SearchbarProps extends ViewProps {
  query: string
  handleChange(args: any): any
  handleSubmit(args: any): any
}
