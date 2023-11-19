import axios from 'axios'
// import { URI } from '../URI'
import { Dispatch } from 'react'
import {
  getUsersRequest,
  getUsersSuccess,
  userLoadRequests,
  userLoadSuccess,
  userLoginFailed,
  userLoginRequest,
  userLoginSuccess,
  userLogoutFailed,
  userLogoutRequest,
  userLogoutSuccess,
  userRegisterRequests,
  userRegistrationFailed,
  userRegistrationSuccess
} from '../reducers/userReducers'
import { Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

// REGISTER USER ACTION!
export const registerUser =
  (name: string, email: string, password: string, avatar: any) =>
  async (dispatch: Dispatch<any>) => {
    try {
      console.log('1%')

      // dispatch({ type: userRegisterRequests })
      console.log('10%%')

      const config = {
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json'
        }
      }
      console.log('20%')

      const { data } = await axios.post(
        'http://192.168.134.155:8080/api/v1/registration',
        {
          name,
          email,
          password,
          avatar
        },
        config
      )

      await AsyncStorage.setItem('token', data.token)

      dispatch({
        type: userRegistrationSuccess,
        payload: { user: data.user }
      })
    } catch (err: any) {
      dispatch({
        type: userRegistrationFailed,
        payload: { error: err.response.data.message }
      })
    }
  }

// LOAD USER!
export const loadUser = () => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: userLoadRequests })
    console.log('94')
    const token = await AsyncStorage.getItem('token')
    console.log({ token })

    const response = await axios.get(
      'http://192.168.134.155:8080/api/v1/me?userId=' + token
    )

    console.log({ responseData: response.data })

    if (response.data.success !== null) {
      dispatch({
        type: userLoadSuccess,
        payload: { user: response.data.user }
      })
    }
  } catch (err: any) {
    dispatch({
      type: userRegistrationFailed,
      payload: { error: err.response.data.message }
    })
  }
}

// LOGIN USER!
export const loginUser =
  (email: string, password: string) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch({
        type: userLoginRequest
      })

      console.log('1')
      const config = { headers: { 'Content-Type': 'application/json' } }

      const { data } = await axios.post(
        'http://192.168.134.155:8080/api/v1/login',
        { email, password },
        config
      )

      dispatch({
        type: userLoginSuccess,
        payload: JSON.stringify(data.user)
      })

      console.log('20%', { data })

      if (data.token) {
        await AsyncStorage.setItem('token', data.token)
      }

      console.log('45%')
    } catch (error: any) {
      dispatch({
        type: userLoginFailed,
        payload: error.response.data.message
      })
    }
  }

// log out user
export const logoutUser = () => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({
      type: userLogoutRequest
    })

    await AsyncStorage.removeItem('token')

    dispatch({
      type: userLogoutSuccess,
      payload: {}
    })
  } catch (error) {
    dispatch({
      type: userLogoutFailed
    })
  }
}

// get all users!
export const getAllUsers = () => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({
      type: getUsersRequest,
    });

    const token = await AsyncStorage.getItem('token')

    console.log({token})

    const { data } = await axios.get(
      'http://192.168.134.155:8080/api/v1/users?userId='+token,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )

    console.log({data:data.users,test:123,success:'nons'});

    dispatch({
      type: getUsersSuccess,
      payload: data.users,
    });
  } catch (error: any) {
    dispatch({
      type: 'getUsersFailed',
      payload: error.response.data.message,
    });
  }
}
