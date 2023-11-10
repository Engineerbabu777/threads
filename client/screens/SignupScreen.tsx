import {
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Image,
  Alert
} from 'react-native'
import React, { useEffect, useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { BsCloudUpload } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../redux/actions/userActions'
import axios from 'axios'
import { userRegistrationFailed } from '../redux/reducers/userReducers'
import { useNavigation } from '@react-navigation/native'

type Props = {
  navigation: any
}

const SignupScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [avatar, setAvatar] = useState({
    secure_url:'',
    public_id:'',
  })
  const dispatch = useDispatch()
  const { error, user, isAuthenticated } = useSelector(
    (state: any) => state.user
  )

  useEffect(() => {
    if (error) {
      Alert.alert(error)
      dispatch({
        type: userRegistrationFailed,
        payload: { error: null }
      })
    }
    if(isAuthenticated){
      navigation.navigate('Home')
    }
  }, [error])

  console.log(isAuthenticated)



  const handleUpload = async(image: any) => {

    const data = new FormData()
    data.append('file', image)
    data.append('upload_preset', 'new-data')
    data.append('cloud_name', 'djo2k58eq')
    try{

      const fetchRequestData =  await axios.post('https://api.cloudinary.com/v1_1/djo2k58eq/image/upload',
         data
      )

      setAvatar({
        secure_url:fetchRequestData?.data.secure_url,
        public_id:fetchRequestData?.data.public_id,
      });

    // return '12'

      // return fetchRequestData.data;

    } catch(error:any){
      console.log('ERROR WHILE SAVING IMAGE!',error.message);
      Alert.alert('Change Image/try again later, ',error?.message)
    }

   

    

  }

  const uploadImage = async () => {
    console.log('0%');
    try{
// No permissions request is necessary for launching the image library
let data = await ImagePicker.launchImageLibraryAsync({
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
  allowsEditing: true,
  aspect: [1, 1],
  quality: 0.5
})


if (!data?.canceled) {

  let newFile = {
    uri: data.assets[0].uri,
    type: `test/${data.assets[0].uri.split('.')[1]}`,
    name: `test.${data.assets[0].uri.split('.')[1]}`
  }

  handleUpload(newFile)

}

    } catch(error:any){
      
      console.log('ERROR WHILE SAVING IMAGE!',error.message);
      Alert.alert('Change Image/try again later, ',error?.message)
    }

    
  }


  // HANDLE REGISTER FUNCTION
  const registerHandler = () => {
    // SAVE IMAGE IN CLOUD-NARY!

// console.log('h1')
    registerUser(name, email, password, avatar)(dispatch)
  }

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
              uri: avatar?.secure_url
                ? avatar?.secure_url
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
          onPress={registerHandler}
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
