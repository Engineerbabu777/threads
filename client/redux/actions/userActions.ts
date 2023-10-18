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
  (name: string, email: string, password: string, avatar: string) =>
  async (dispatch: Dispatch<any>) => {
    try {
      dispatch({ type: userRegisterRequests })

      const config = {
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json'
        }
      }

      const { data } = await axios.post(
        'http://192.168.138.102:8080/api/v1/registration',
        {
          name,
          email,
          password,
          avatar
        },
        config
      )

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
