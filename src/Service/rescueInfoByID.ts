import Taro from '@tarojs/taro'
import { updateRescueInfo, resetTarget } from '../slices/rescueInfoByIDSlice'
import {
  BaseResType,
  fetchRescueTargetInfoType,
  RescueInfoByIDResponse,
  RescueTargetInfoResponse,
} from './fetchTypes'
import store from '../store/store'
import Fetch from './fetch'

export const FetchRescueTargetInfo = async (targetID: number) => {
  const data = {
    rescue_target_id: targetID,
  }
  return Fetch<BaseResType<RescueTargetInfoResponse>>(
    '/rescue/targetinfo',
    data,
    'POST',
  )
}
export const FetchRescueInfoByID = async (props: fetchRescueTargetInfoType) => {
  return Fetch<BaseResType<RescueInfoByIDResponse>>(
    '/rescue/rescuetargetid',
    props,
    'POST',
  )
}
export const getRescueInfoByID = (
  targetID?: number,
  resPage?: number,
  resPageSize?: number,
) => {
  const { page, ID } = store.getState().rescueInfoByID
  const data: fetchRescueTargetInfoType = {
    rescue_target_id: targetID || ID,
    page: targetID ? 0 : resPage || page,
    page_size: resPageSize || 10,
  }
  FetchRescueInfoByID(data).then((res) => {
    res.data.list
      ? store.dispatch(
          updateRescueInfo({ data: res.data.list, ID: targetID || ID }),
        )
      : Taro.showToast({ icon: 'error', title: '没有更多了哦' })
  })
}

export const getRescueTargetInfo = (targetID: number) => {
  FetchRescueTargetInfo(targetID).then((res) => {
    store.dispatch(
      resetTarget({ ID: targetID, newTargetInfo: res.data.rescue_target_info }),
    )
  })
}
