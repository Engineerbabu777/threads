import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, useSafeAreaFrame } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import * as ImagePicker from 'expo-image-picker'
import axios from 'axios'
import { createPostAction, getAllPosts } from '../redux/actions/postActions'

type Props = {
  navigation: any
}
export default function PostScreen ({ navigation }: Props) {
  const { user } = useSelector((state: any) => state.user)
  const {isSuccess, isLoading,post} = useSelector((state: any) => state.post);
  const [activeIndex, setActiveIndex] = useState(0)
  const [active, setActive] = useState(false)
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')

  console.log({isSuccess});
  useEffect(() => {
    if (
      replies.length === 1 &&
      replies[0].title === '' &&
      replies[0].image === ''
    ) {
      setReplies([]);
    }
    if (isSuccess) {
      navigation.goBack();
      getAllPosts()(dispatch);
    }
    setReplies([]);
    setTitle('');
    setImage('');
  }, [isSuccess]);

  const [replies, setReplies] = useState([
    {
      title: '',
      image: '',
      user
    }
  ])

  const handleTitleChange = (index: number, text: string) => {
    setReplies(prevPost => {
      const updatedPost = [...prevPost]
      updatedPost[index] = { ...updatedPost[index], title: text }
      return updatedPost
    })
  }

  const uploadImage = async (index: number=-1) => {
    try {
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

        const response = await handleUpload(newFile);


        if(index!=-1){
          setReplies(prevPost => {
            const updatedPost = [...prevPost]
            updatedPost[index] = {
              ...updatedPost[index],
              image: response?.secure_url,
            }
            return updatedPost
          })
        }else{
          setImage(response.secure_url)
        }
        
        // handleUpload(newFile)
      }
    } catch (err) {
      console.log('POST IMAGE ERROR:', err.message)
    }
  }

  const handleUpload = async(image: any) => {

    const data = new FormData()
    data.append('file', image)
    data.append('upload_preset', 'new-data')
    data.append('cloud_name', 'djo2k58eq')
    try{

      const fetchRequestData =  await axios.post('https://api.cloudinary.com/v1_1/djo2k58eq/image/upload',
         data
      )

      console.log('FETCH REQUEST DATA:',fetchRequestData);

      return {
        secure_url:fetchRequestData?.data.secure_url,
        public_id:fetchRequestData?.data.public_id,
      }


    } catch(error:any){
      console.log('ERROR WHILE SAVING IMAGE!',error.message);
      Alert.alert('Change Image/try again later, ',error?.message)
    }
  }

  const addNewThread = () => {
    if (
      replies[activeIndex].title !== '' ||
      replies[activeIndex].image !== ''
    ) {
      setReplies(prevPost => [...prevPost, { title: '', image: '', user }])
      setActiveIndex(replies.length)
    }
  }

  const removeThread = (index: number) => {
    if (replies.length > 0) {
      const updatedPost = [...replies]
      updatedPost.splice(index, 1)
      setReplies(updatedPost)
      setActiveIndex(replies.length - 1)
    } else {
      setReplies([{ title: '', image: '', user }])
    }
  }

  const addFreshNewThread = () => {
    if (title !== '' || image !== '') {
      setActive(true)
      setReplies(prevPost => [...prevPost, { title: '', image: '', user }])
      setActiveIndex(replies.length)
    }
  }

  const createPost = () => {
    if (title !== '' || (image !== '' && !isLoading)) {
      createPostAction(title, image, user, replies)(dispatch);
    }
  }

  return (
    <SafeAreaView className='flex-1'>
      <View className='w-full flex-row items-center m-3'>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/2961/2961937.png'
            }}
            style={{
              width: 20,
              height: 20
            }}
          />
        </TouchableOpacity>
        <Text className='pl-4 text-[20px] font-[500] text-[#000]'>
          New Thread
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className='m-3 flex-[1] justify-between'>
          <View>
            {/* create post */}
            <View className='mt-3 flex-row'>
              <Image
                source={{ uri: user?.avatar.url }}
                style={{ width: 40, height: 40 }}
                borderRadius={100}
              />
              <View className='pl-3'>
                <View className='w-[78%] flex-row justify-between'>
                  <Text className='text-[20px] font-[400] text-black'>
                    {user?.name}
                  </Text>
                  <TouchableOpacity>
                    <Image
                      source={{
                        uri: 'https://cdn-icons-png.flaticon.com/512/2961/2961937.png'
                      }}
                      style={{
                        width: 20,
                        height: 20
                      }}
                    />
                  </TouchableOpacity>
                </View>
                <TextInput
                  placeholder='Start a thread...'
                  placeholderTextColor={'#000'}
                  value={title}
                  onChangeText={text => setTitle(text)}
                  className='mt-1 text-[#000] text-[16px]'
                />
                <TouchableOpacity className='mt-2' onPress={() => uploadImage(-1)}>
                  <Image
                    source={{
                      uri: 'https://cdn-icons-png.flaticon.com/512/10857/10857463.png'
                    }}
                    style={{
                      width: 20,
                      height: 20
                    }}
                    tintColor={'#000'}
                  />
                </TouchableOpacity>
              </View>
            </View>
            {image && (
              <View className='m-2'>
                <Image
                  source={{ uri: image }}
                  width={200}
                  height={300}
                  resizeMethod='auto'
                  alt=''
                />
              </View>
            )}
            {replies.length === 0 && (
              <View className='flex-row m-3 w-full items-start mt-5 opacity-7'>
                <Image
                  source={{ uri: user?.avatar.url }}
                  style={{ width: 30, height: 30 }}
                  borderRadius={100}
                />
                <Text className='pl-3 text-black' onPress={addFreshNewThread}>
                  Add to thread ...
                </Text>
              </View>
            )}

            {replies.map((item, index) => (
              <View key={index}>
                <View className='mt-3 flex-row'>
                  <Image
                    source={{ uri: user?.avatar.url }}
                    style={{ width: 40, height: 40 }}
                    borderRadius={100}
                  />
                  <View className='pl-3'>
                    <View className='w-[78%] flex-row justify-between'>
                      <Text className='text-[20px] font-[400] text-black'>
                        {user?.name}
                      </Text>
                      <TouchableOpacity onPress={() => removeThread(index)}>
                        <Image
                          source={{
                            uri: 'https://cdn-icons-png.flaticon.com/512/2961/2961937.png'
                          }}
                          style={{
                            width: 20,
                            height: 20
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                    <TextInput
                      placeholder='Start a thread...'
                      placeholderTextColor={'#000'}
                      value={item.title}
                      onChangeText={text => handleTitleChange(index, text)}
                      className='mt-2 text-[#000] text-[16px]'
                    />
                    <TouchableOpacity
                      className='mt-2'
                      onPress={() => uploadImage(index)}
                    >
                      <Image
                        source={{
                          uri: 'https://cdn-icons-png.flaticon.com/512/10857/10857463.png'
                        }}
                        style={{
                          width: 20,
                          height: 20
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                {item.image && (
                  <View className='m-2'>
                    <Image
                      source={{ uri: item.image }}
                      width={200}
                      height={300}
                      resizeMethod='auto'
                      alt=''
                    />
                  </View>
                )}
                {index === activeIndex && (
                  <View className='flex-row m-3 w-full items-start mt-5 opacity-7'>
                    <Image
                      source={{ uri: user?.avatar.url }}
                      style={{ width: 30, height: 30 }}
                      borderRadius={100}
                    />
                    <Text className='pl-3 text-black' onPress={addNewThread}>
                      Add to thread ...
                    </Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <View className='p-2 flex-row justify-between'>
        <Text className='text-black px-1 py-1'>Anyone can reply</Text>
        <TouchableOpacity onPress={createPost}>
          <Text className='text-[#1977f2]'>Post</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})
