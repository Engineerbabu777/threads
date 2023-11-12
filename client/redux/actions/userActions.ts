import axios from 'axios'
// import { URI } from '../URI'
import { Dispatch } from 'react'
import {
  userLoadRequests,
  userLoadSuccess,
  userLoginFailed,
  userLoginRequest,
  userLoginSuccess,
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
        'http://192.168.159.174:8080/api/v1/registration',
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
    // dispatch({ type: userLoadRequests })
    console.log('94')
    const token = await AsyncStorage.getItem('token')
    console.log({ token })

    const response = await axios.get(
      'http://192.168.159.174:8080/api/v1/me?userId='+token
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
        'http://192.168.159.174:8080/api/v1/login',
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
