import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { rescueInfoByIDSliceType } from './sliceTypes'
import { SingleRescueInfo, RescueTargetInfoType } from '../Service/fetchTypes'
/** 以用户id为index的救援信息 */
const rescueInfoByIDSlice = createSlice({
  name: 'rescueInfoByID',
  initialState: {
    page: 1,
    data: [] as SingleRescueInfo[],
    ID: 0,
    targetInfo: {} as RescueTargetInfoType,
  } as rescueInfoByIDSliceType,
  reducers: {
    resetPage: (
      state: rescueInfoByIDSliceType,
      action: PayloadAction<number>,
    ) => ({
      ...state,
      page: action.payload,
    }),
    resetTarget: (
      state: rescueInfoByIDSliceType,
      action: PayloadAction<{
        ID: number
        newTargetInfo?: RescueTargetInfoType
      }>,
    ) => ({
      ...state,
      data: action.payload.ID != state.ID ? [] : state.data,
      ID: action.payload.ID,
      targetInfo: action.payload.newTargetInfo || state.targetInfo,
    }),
    updateRescueInfo: (
      state: rescueInfoByIDSliceType,
      action: PayloadAction<{ data: SingleRescueInfo[]; ID: number }>,
    ) => ({
      ...state,
      data: [...state.data, ...action.payload.data],
      ID: action.payload.ID,
      page: state.page + 1,
    }),
  },
})

export const { resetPage, resetTarget, updateRescueInfo } =
  rescueInfoByIDSlice.actions
export default rescueInfoByIDSlice.reducer
