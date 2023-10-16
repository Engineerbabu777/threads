import { View, Text, KeyboardAvoidingView, Pressable } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native'

type Props = {
  navigation: any
}

const LoginScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // HANDLE LOGIN FUNCTION
  const loginHandler = () => {
    Alert.alert('Login Success')
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
          onPress={() => {
            loginHandler()
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
