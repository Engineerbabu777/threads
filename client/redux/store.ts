import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { userReducer } from './reducers/userReducers'

const Store = configureStore({
  reducer: {
    user: userReducer,
  }
})

export default Store
