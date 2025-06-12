import { configureStore } from '@reduxjs/toolkit'
import copyReducer from './redux/copySlice'

export const store = configureStore({
  reducer: {
    copy: copyReducer,
  },
})