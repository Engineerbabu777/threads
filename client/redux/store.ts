import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './reducers/userReducers'
import { postReducer } from './reducers/postReducer'

const Store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export default Store
