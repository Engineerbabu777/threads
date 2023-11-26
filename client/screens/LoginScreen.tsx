import {
  View,
  Text,
  KeyboardAvoidingView,
  Pressable,
  Alert
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native'
import { loadUser, loginUser } from '../redux/actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

type Props = {
  navigation: any
}

const LoginScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const { error, isAuthenticated } = useSelector((state: any) => state.user)

  
  useEffect(() => {
    if (error) {
      Alert.alert('Login failed!, ', error)
    }

    if (isAuthenticated) {
      loadUser()(dispatch);
      navigation.navigate('Home')
      Alert.alert('Login successful!')
    }
  }, [isAuthenticated, error])

  // HANDLE LOGIN FUNCTION
  const loginHandler = (e: any) => {
    loginUser(email, password)(dispatch)
    console.log('Login Success')
  }

  return (
    <View className='flex-1 items-center justify-center'>
      <KeyboardAvoidingView className='w-[70%]'>
        <Text className='text-[25px] font-600 text-center'>Login</Text>
        <TextInput
          placeholder='Enter Your Email'
          className='w-full h-[40px] border border-gray-600 px-2 my-2 '
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          placeholder='Enter Your Password'
          className='w-full h-[40px] border border-gray-600 px-2 my-2'
          secureTextEntry
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <Pressable
          onPress={(e:any) => {
            loginHandler(e)
          }}
          className='w-full flex items-center justify-center h-[46px] bg-black mt-4'
        >
          <Text className='text-white'>Login</Text>
        </Pressable>

        <Pressable
          className='w-full mt-2'
          onPress={() => navigation.navigate('Signup')}
        >
          <Text className='text-center text-gray-500 font-700'>
            Don't have an account? SignUp
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </View>
  )
}

export default LoginScreen
