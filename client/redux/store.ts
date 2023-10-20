import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './reducers/userReducers'

const Store = configureStore({
  reducer: {
    user: userReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export default Store
