import { ViewProps } from '@tarojs/components'
import { ReactNode } from 'react'

export interface R_containerProps extends ViewProps {
  title: ReactNode
  context?: ReactNode
}
