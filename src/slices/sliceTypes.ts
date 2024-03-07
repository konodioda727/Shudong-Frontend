import {
  RescueProcess,
  RescueTargetInfoType,
  SingleRescueInfo,
  User,
} from '../Service/fetchTypes'

export type rescueInfoSliceType = {
  eventID: number
  targetID: number
  rescueInfo: SingleRescueInfo
  targetInfo: RescueTargetInfoType
  process: RescueProcess[]
}

export type rescueInfoByIDSliceType = {
  page: number
  data: SingleRescueInfo[]
  ID: number
  targetInfo: RescueTargetInfoType
}

export type myInfoSliceType = {
  myRescueTarget: RescueTargetInfoType[]
  myInfo: User
  unclaimedRescueInfo: SingleRescueInfo[]
  claimedRescueInfo: SingleRescueInfo[]
  claimedPage: number
  unclaimedPage: number
}
