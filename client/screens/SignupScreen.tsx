import {
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  Pressable
} from 'react-native'
import React, { useState } from 'react'

type Props = {
  navigation: any
}

const SignupScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  // HANDLE REGISTER FUNCTION
  const registerHandler = () => {}

  return (
    <View className='flex-1 items-center justify-center'>
      <KeyboardAvoidingView className='w-[70%]'>
        <Text className='text-[25px] font-600 text-center'>Sign Up</Text>
        <TextInput
          placeholder='Enter Your Name'
          className='w-full h-[40px] border border-gray-600 px-2 my-2 '
          value={name}
          onChangeText={text => setName(text)}
        />
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
            registerHandler()
          }}
          className='w-full flex items-center justify-center h-[46px] bg-black mt-4'
        >
          <Text className='text-white'>Sign Up</Text>
        </Pressable>

        <Pressable
          className='w-full mt-2'
          onPress={() => navigation.navigate('Login')}
        >
          <Text className='text-center text-gray-500 font-700'>
            Already have an account? Login
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </View>
  )
}

export default SignupScreen
