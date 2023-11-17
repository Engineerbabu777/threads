import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  posts: [],
  post: {},
  error: null,
  isSuccess: false,
  isLoading: true
}

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    postCreateRequest: state => {
      state.isLoading = true
    },
    postCreateSuccess: (state, action) => {
      state.isLoading = false
      state.post = action.payload
      state.isSuccess = true
    },
    postCreateFailed: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    getAllPostsRequest: state => {
      state.isLoading = true
    },
    getAllPostsSuccess: (state, action) => {
      state.isLoading = false
      state.posts = action.payload
    },
    getAllPostsFailed: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    clearErrors: state => {
      state.error = null
    }
  }
})

export const {
  postCreateRequest,
  postCreateSuccess,
  postCreateFailed,
  getAllPostsRequest,
  getAllPostsSuccess,
  getAllPostsFailed,
  clearErrors
} = postSlice.actions

export const postReducer = postSlice.reducer
