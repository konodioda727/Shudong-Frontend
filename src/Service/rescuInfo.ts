import Fetch from './fetch'
import {
  BaseResType,
  fetchProcessType,
  fetchRescueProcessType,
  RescueCommentsResponse,
  UserInfoResponse,
} from './fetchTypes'
import store from '../store/store'
import { updateProcess } from '../slices/rescueInfoSlice'

export const FetchProcessInfo = (data: fetchRescueProcessType) =>
  Fetch<BaseResType<RescueCommentsResponse>>(
    '/rescue/getrescueprocess',
    {
      page: data.page || 1,
      pageSize: data.page_size || 100,
      ...data,
    },
    'POST',
  )
export const FetchNewProcess = ({
  rescue_info_id,
  start_time,
  end_time,
  evaluation,
}: fetchProcessType) =>
  Fetch<BaseResType<UserInfoResponse>>(
    '/user/info',
    {
      rescue_info_id: rescue_info_id,
      start_time: start_time,
      end_time: end_time,
      evaluation: evaluation,
    },
    'POST',
  )

export const getProcessInfo = (rescue_info_id: number) => {
  FetchProcessInfo({ rescue_info_id: rescue_info_id }).then((res) => {
    store.dispatch(updateProcess(res.data.list))
  })
}
