import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, useSafeAreaFrame } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import * as ImagePicker from 'expo-image-picker'

type Props = {
  navigation: any
}
export default function PostScreen ({ navigation }: Props) {
  const { user } = useSelector((state: any) => state.user)

  const [activeIndex, setActiveIndex] = useState(0)

  const [post, setPost] = useState([
    {
      image: '',
      title: '',
      user
    }
  ])

  useEffect(() => {
    if (post.length === 1 && post[0].title === '' && post[0].image === '') {
      setPost([
        {
          image: '',
          title: '',
          user
        }
      ])
    }
  }, [])

  const handleTitleChange = (index: number, text: string) => {
    setPost(prevPost => {
      const updatedPost = [...prevPost]
      updatedPost[index] = { ...updatedPost[index], title: text }
      return updatedPost
    })
  }

  const uploadImage = async (index: number) => {
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
        setPost(prevPost => {
          const updatedPost = [...prevPost]
          updatedPost[index] = {
            ...updatedPost[index],
            image: data?.assets[0]?.uri
          }
          return updatedPost
        })
        // handleUpload(newFile)
      }
    } catch (err) {
      console.log('POST IMAGE ERROR:', err.message)
    }
  }

  const addNewThread = () => {
    if (post[activeIndex].title !== '' || post[activeIndex].image !== '') {
      setPost(prevPost => [...prevPost, { title: '', image: '', user }])
      setActiveIndex(post.length)
    }
  }

  const removeThread = (index: number) => {
    if (post.length > 1) {
      const updatedPost = [...post]
      updatedPost.splice(index, 1)
      setPost(updatedPost)
      setActiveIndex(post.length - 1)
    } else {
      setPost([{ title: '', image: '', user }])
    }
  }

  return (
    <SafeAreaView className='m-3 flex-1 justify-between'>
      <View>
        <View className='w-full flex-row items-center'>
          {/* BACK CROSS IMAGE BUTTON */}
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

          <Text className='ml-4 text-[20px] font-[600] text-[#000]'>
            New Thread
          </Text>
        </View>

        {post.map((p, i) => (
          <View key={i}>
            <View className='mt-3 flex-row'>
              <Image
                source={{ uri: user?.avatar?.url }}
                style={{ width: 40, height: 40 }}
                borderRadius={100}
              />
              <View className='pl-3'>
                <View className='w-[78%] flex-row justify-between'>
                  <Text className='font-[400] text-[20px] text-[#000]'>
                    {user?.name}
                  </Text>
                  <TouchableOpacity onPress={() => removeThread(i)}>
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
                  value={p?.title}
                  onChangeText={text => handleTitleChange(i, text)}
                  className='mt-1 text-[#000] text-[16px]'
                />
                <TouchableOpacity
                  onPress={() => uploadImage(i)}
                  className='mt-2'
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
            {p?.image && (
              <>
                <View className={'m-2'}>
                  <Image
                    source={{ uri: p?.image }}
                    width={200}
                    height={300}
                    resizeMethod='auto'
                    alt=''
                  />
                </View>
              </>
            )}
            {i === activeIndex && (
              <View className='flex-row m-3 w-full items-start mt-5 opacity-7'>
                <Image
                  source={{ uri: user?.avatar.url }}
                  style={{ width: 30, height: 30 }}
                  borderRadius={100}
                />
                <Text
                  className='pl-3 text-black'
                  onPress={() => {
                    addNewThread()
                  }}
                >
                  Add to thread ...
                </Text>
              </View>
            )}
          </View>
        ))}
      </View>

      <View className='p-2'></View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})
