export type BaseResType<T> = {
  code: number
  msg: string
  data: T
}
export type requestType = 'GET' | 'POST' | 'PUT' | 'DELETE'

// -------------------------------------------responseType
export interface RescueInfoByIDResponse {
  list: SingleRescueInfo[]
}
export interface MyRescueTargetResponse {
  list: MyRescueTargetType[]
}
export interface RescueCommentsResponse {
  list: RescueProcess[]
}
export interface UserInfoResponse {
  user_info: User
}
export interface RescueInfoResponse {
  list: RescueInfo[]
}
export interface RescueTargetInfoResponse {
  rescue_target_info: RescueTargetInfoType
}
// -------------------------------------------fetchQueryType

export type fetchRescueProcessType = {
  rescue_info_id: number
  page?: number
  page_size?: number
}
export type fetchProcessType = {
  rescue_info_id: number
  start_time: string
  end_time: string
  evaluation: string
}
export type fetchRescueTargetInfoType = {
  rescue_target_id: number
  page: number
  page_size: number
}
export type fetchUnclaimedRescueTargetType = {
  page: number
  page_size: number
}

// -------------------------------------------typeDetails

/**
 * RescueInfo
 */
export interface RescueInfo {
  area: string
  birthday: string
  brief_introduction: string
  /**
   * 救援信息在数据库中的创建时间，相当于管理员导入的时间
   */
  create_time: string
  id: number
  nickname: string
  /**
   * 此条微博的发布时间
   */
  release_time: string
  /**
   * 本条救援信息所属救援对象的id
   */
  rescue_target_id: number
  risk_level: string
  sex: number
  text: string
  update_time: string
  weibo_account: string
  weibo_address: string
}

/**
 * User
 */
export interface User {
  address: string
  avatar: string
  birthday: string
  email: string
  id: number
  mobile: string
  role: number
  sex: number
  username: string
}

// 单条救援信息
export interface SingleRescueInfo {
  area: string
  birthday: string
  brief_introduction: string
  create_time: string
  id: number
  nickname: string
  release_time: string
  rescue_target_id: number
  risk_level: string
  sex: number
  text: string
  update_time: string
  weibo_account: string
  weibo_address: string
}

export interface RescueTargetInfoType {
  create_time: string
  /**
   * 救援过程描述
   */
  description: string
  /**
   * 救援结束时间
   */
  end_time: string
  /**
   * 最终评价
   */
  evalutaion: string
  /**
   * 救援对象id
   */
  id: number
  /**
   * 救援对象昵称（按最新的救援信息数据）
   */
  nickname: string
  /**
   * 救援老师1id
   */
  rescue_teacher1_id: number
  /**
   * 救援老师1姓名
   */
  rescue_teacher1_name: string
  /**
   * 救援老师1身份
   */
  rescue_teacher1_role: number
  /**
   * 救援老师2id
   */
  rescue_teacher2_id: number
  /**
   * 救援老师2姓名
   */
  rescue_teacher2_name: string
  /**
   * 救援老师2身份
   */
  rescue_teacher2_role: number
  /**
   * 救援老师3id
   */
  rescue_teacher3_id: number
  /**
   * 救援老师3姓名
   */
  rescue_teacher3_name: string
  /**
   * 救援老师3身份
   */
  rescue_teacher3_role: number
  /**
   * 救援起始时间
   */
  start_time: string
  /**
   * 救援状态（0-待救援 1-救援中 2-已救援）
   */
  status: number
  update_time: string
  /**
   * 救援对象微博地址（唯一标识）
   */
  weibo_address: string
}

export interface MyRescueTargetType {
  create_time: string
  /**
   * 救援过程描述
   */
  description: string
  /**
   * 救援结束时间
   */
  end_time: string
  /**
   * 最终评价
   */
  evalutaion: string
  /**
   * 救援对象id
   */
  id: number
  /**
   * 救援对象昵称（按最新的救援信息数据）
   */
  nickname: string
  /**
   * 救援老师1id
   */
  rescue_teacher1_id: number
  /**
   * 救援老师1姓名
   */
  rescue_teacher1_name: string
  /**
   * 救援老师1身份
   */
  rescue_teacher1_role: number
  /**
   * 救援老师2id
   */
  rescue_teacher2_id: number
  /**
   * 救援老师2姓名
   */
  rescue_teacher2_name: string
  /**
   * 救援老师2身份
   */
  rescue_teacher2_role: number
  /**
   * 救援老师3id
   */
  rescue_teacher3_id: number
  /**
   * 救援老师3姓名
   */
  rescue_teacher3_name: string
  /**
   * 救援老师3身份
   */
  rescue_teacher3_role: number
  /**
   * 救援起始时间
   */
  start_time: string
  /**
   * 救援状态（0-待救援 1-救援中 2-已救援）
   */
  status: number
  update_time: string
  /**
   * 救援对象微博地址（唯一标识）
   */
  weibo_address: string
}

/**
 * RescueProcess
 */
export interface RescueProcess {
  create_time: string
  /**
   * 时长（系统计算）
   */
  duration: string
  /**
   * 本次救援结束时间
   */
  end_time: string
  /**
   * 评价
   */
  evaluation: string
  id: number
  rescue_info_id: number
  rescue_teacher_id: number
  /**
   * 本次救援起始时间
   */
  start_time: string
  update_time: string
}
