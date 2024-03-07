import { SingleRescueInfo } from '../../Service/fetchTypes'

export type rescueStatusType = {
  text: string
  color: string
}
export const rescueStatus: rescueStatusType[] = [
  {
    text: '未救援',
    color: '#f57b70',
  },
  {
    text: '救援中',
    color: '#f9a53e',
  },
  {
    text: '已救援',
    color: '#76A9FF',
  },
]

export interface RescueMessageItemProps extends SingleRescueInfo {
  navURL?: string
}
