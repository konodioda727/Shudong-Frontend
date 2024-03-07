import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  SingleRescueInfo,
  RescueTargetInfoType,
  RescueProcess,
} from '../Service/fetchTypes'
import { rescueInfoSliceType } from './sliceTypes'

const rescueInfoSlice = createSlice({
  name: 'rescueInfo',
  initialState: {
    rescueInfo: {} as SingleRescueInfo,
    targetInfo: {} as RescueTargetInfoType,
    process: [],
    eventID: 0,
    targetID: 0,
  } as rescueInfoSliceType,
  reducers: {
    updateRescueInfo: (
      state: rescueInfoSliceType,
      action: PayloadAction<SingleRescueInfo>,
    ) => ({
      ...state,
      rescueInfo: action.payload,
      eventID: action.payload.id,
      targetID: action.payload.rescue_target_id,
    }),
    updateTargetInfo: (
      state: rescueInfoSliceType,
      action: PayloadAction<RescueTargetInfoType>,
    ) => ({ ...state, targetInfo: action.payload }),
    updateProcess: (
      state: rescueInfoSliceType,
      action: PayloadAction<RescueProcess[]>,
    ) => ({ ...state, process: action.payload }),
  },
})

export default rescueInfoSlice.reducer
export const { updateTargetInfo, updateRescueInfo, updateProcess } =
  rescueInfoSlice.actions
