import {
  myInfoSliceType,
  rescueInfoByIDSliceType,
  rescueInfoSliceType,
} from '../slices/sliceTypes'

export type storeType = {
  rescueInfo: rescueInfoSliceType
  rescueInfoByID: rescueInfoByIDSliceType
  myInfo: myInfoSliceType
}
