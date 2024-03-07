import Taro from '@tarojs/taro'
import Fetch from './fetch'
import {
  BaseResType,
  fetchUnclaimedRescueTargetType,
  MyRescueTargetResponse,
  MyRescueTargetType,
  RescueInfoResponse,
  UserInfoResponse,
} from './fetchTypes'
import store from '../store/store'
import {
  updateMyTarget,
  updateUnclaimedInfo,
  updateUserInfo,
  updateClaimedInfo,
  resetClaimedInfo,
  resetUnclaimedInfo,
} from '../slices/myInfoSlice'

export const FetchUserInfo = async (user_id?: number) =>
  Fetch<BaseResType<UserInfoResponse>>(
    '/user/info',
    user_id ? { user_id: user_id } : {},
    'POST',
  )

export const FetchClaim = async (id: number) =>
  Fetch('/rescue/claim', { rescue_target_id: id }, 'POST')
export const FetchRescueInfo = async (
  props: fetchUnclaimedRescueTargetType,
  type: 'claimed' | 'unclaimed',
) => Fetch<BaseResType<RescueInfoResponse>>(`/rescue/${type}`, props, 'POST')
export const getMyRescueTargets = (
  filter?: (item: MyRescueTargetType) => boolean,
) => {
  Fetch<BaseResType<MyRescueTargetResponse>>(
    '/rescue/gettask',
    {
      page: 1,
      page_size: 6, //最多同时救援6个
    },
    'POST',
  ).then((task) => {
    store.dispatch(
      updateMyTarget(filter ? task.data.list.filter(filter) : task.data.list),
    )
  })
}

export const getMyInfo = () => {
  FetchUserInfo().then((res) => {
    store.dispatch(updateUserInfo(res.data.user_info))
  })
}

export const getRescueInfo = (
  type: 'claimed' | 'unclaimed',
  resPage?: number,
  pageSize?: number,
) => {
  const { unclaimedPage, claimedPage } = store.getState().myInfo
  const page = type === 'claimed' ? claimedPage : unclaimedPage
  FetchRescueInfo(
    {
      page: resPage || page,
      page_size: pageSize || 10,
    },
    type,
  ).then((res) => {
    const list = res.data.list
    list
      ? store.dispatch(
          type === 'claimed'
            ? updateClaimedInfo(list)
            : updateUnclaimedInfo(list),
        )
      : Taro.showToast({
          title: '没有更多了哦',
          icon: 'error',
        })
  })
}
export const resetRescueInfo = (
  type: 'claimed' | 'unclaimed',
  pageSize?: number,
) => {
  FetchRescueInfo(
    {
      page: 0,
      page_size: pageSize || 10,
    },
    type,
  ).then((res) => {
    const list = res.data.list
    list
      ? store.dispatch(
          type === 'claimed'
            ? resetClaimedInfo(list)
            : resetUnclaimedInfo(list),
        )
      : Taro.showToast({
          title: '没有更多了哦',
          icon: 'error',
        })
  })
}
export const resetRescue = () => {
  resetRescueInfo('claimed')
  resetRescueInfo('unclaimed')
}
