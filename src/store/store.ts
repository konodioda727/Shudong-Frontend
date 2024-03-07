import { configureStore } from '@reduxjs/toolkit'
import RescueInfoReducer from '../slices/rescueInfoSlice'
import RescueInfoByIDReducer from '../slices/rescueInfoByIDSlice'
import MyInfoReducer from '../slices/myInfoSlice'

const store = configureStore({
  reducer: {
    rescueInfo: RescueInfoReducer,
    rescueInfoByID: RescueInfoByIDReducer,
    myInfo: MyInfoReducer,
  },
})

export default store
