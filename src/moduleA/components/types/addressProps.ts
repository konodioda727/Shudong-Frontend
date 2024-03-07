import provinceList from '../address/city'

export interface AddressProps {
  withCity?: boolean
  onPick?: (...args: any[]) => void
  onAConfirm?: (...args: any[]) => void
  address: `${provinceType}-${cityType}`
}

export type provinceType = (typeof provinceList)[number]['value']
export type cityType =
  (typeof provinceList)[number]['children'][number]['value']
