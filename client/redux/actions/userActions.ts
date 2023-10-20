import axios from 'axios'
// import { URI } from '../URI'
import { Dispatch } from 'react'
import {
  userRegisterRequests,
  userRegistrationFailed,
  userRegistrationSuccess
} from '../reducers/userReducers'

// REGISTER USER ACTION!
export const registerUser =
  (name: string, email: string, password: string, avatar: any) =>
  async (dispatch: Dispatch<any>) => {
    try {
      console.log('1%')

      dispatch({ type: userRegisterRequests })
      console.log('10%%')


      const config = {
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json'
        }
      }
      console.log('20%')


      const { data } = await axios.post(
        'http://192.168.212.106:8080/api/v1/registration',
        {
          name,
          email,
          password,
          avatar
        },
        config
      )

      console.log('60%')

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
