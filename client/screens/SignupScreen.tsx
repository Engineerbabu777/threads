import {
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Image
} from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { BsCloudUpload } from 'react-icons/bs'

type Props = {
  navigation: any
}

const SignupScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [avatar, setAvatar] = useState(null)

  const uploadImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    })

    console.log(result)

    if (!result.canceled) {
      setAvatar(result.assets[0].uri)
    }
  }

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

        <View className='flex gap-6 flex-row items-center justify-center'>
          <Image
            source={{
              uri: avatar
                ? avatar
                : 'https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png'
            }}
            className='w-[50px] h-[50px] rounded-full '
          />

          <Pressable
            onPress={uploadImage}
            className='flex items-center gap-2 flex-row'
          >
            {!avatar ? (
              <>
                <Image
                  source={{
                    uri: 'https://simpleicon.com/wp-content/uploads/cloud-upload-1.png'
                  }}
                  className='w-6 h-6 '
                />
                <Text>Upload an Image</Text>
              </>
            ) : (
              <Text>Change Image</Text>
            )}
          </Pressable>
        </View>
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
