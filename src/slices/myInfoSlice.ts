import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { myInfoSliceType } from './sliceTypes'
import {
  MyRescueTargetType,
  SingleRescueInfo,
  User,
  RescueTargetInfoType,
} from '../Service/fetchTypes'

const MyInfoSlice = createSlice({
  name: 'myInfo',
  initialState: {
    unclaimedPage: 1,
    claimedPage: 1,
    myInfo: {} as User,
    unclaimedRescueInfo: [] as SingleRescueInfo[],
    claimedRescueInfo: [] as SingleRescueInfo[],
    myRescueTarget: [] as RescueTargetInfoType[],
  } as myInfoSliceType,
  reducers: {
    updateMyTarget: (
      state: myInfoSliceType,
      action: PayloadAction<MyRescueTargetType[]>,
    ) => ({ ...state, myRescueTarget: action.payload }),
    updateUserInfo: (state: myInfoSliceType, action: PayloadAction<User>) => ({
      ...state,
      myInfo: action.payload,
    }),
    resetClaimedInfo: (
      state: myInfoSliceType,
      action: PayloadAction<SingleRescueInfo[]>,
    ) => ({
      ...state,
      claimedRescueInfo: action.payload,
      claimedPage: 1,
    }),
    resetUnclaimedInfo: (
      state: myInfoSliceType,
      action: PayloadAction<SingleRescueInfo[]>,
    ) => ({
      ...state,
      unclaimedRescueInfo: action.payload,
      unclaimedPage: 1,
    }),
    updateClaimedInfo: (
      state: myInfoSliceType,
      action: PayloadAction<SingleRescueInfo[]>,
    ) => ({
      ...state,
      claimedRescueInfo: [...state.claimedRescueInfo, ...action.payload],
      claimedPage: state.claimedPage + 1,
    }),
    updateUnclaimedInfo: (
      state: myInfoSliceType,
      action: PayloadAction<SingleRescueInfo[]>,
    ) => ({
      ...state,
      unclaimedRescueInfo: [...state.unclaimedRescueInfo, ...action.payload],
      unclaimedPage: state.unclaimedPage + 1,
    }),
  },
})

export const {
  updateMyTarget,
  updateUnclaimedInfo,
  updateUserInfo,
  updateClaimedInfo,
  resetUnclaimedInfo,
  resetClaimedInfo,
} = MyInfoSlice.actions
export default MyInfoSlice.reducer
