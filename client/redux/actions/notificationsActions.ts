import axios from 'axios';
import {Dispatch} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getNotificationFailed, getNotificationRequest, getNotificationSuccess } from '../reducers/notificationsReducer';

// get notifications
export const getNotifications = (userId:any) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({
      type: getNotificationRequest,
    });

    console.log(userId)

    console.log('1')

    const token = await AsyncStorage.getItem('token');
    console.log('2')


    const response = await axios.get("http://192.168.169.136:8080/api/v1/get-notifications?userId="+userId?._id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('3')


    console.log({data:response?.data});

    dispatch({
      type: getNotificationSuccess,
      payload: response?.data.notifications,
    });
  } catch (error: any) {
    console.log(error.message)
    dispatch({
      type: getNotificationFailed,
      payload: error.response.data.message,
    });
  }
};