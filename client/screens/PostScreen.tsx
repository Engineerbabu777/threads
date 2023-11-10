import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView, useSafeAreaFrame } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'

type Props = {
  navigation: any
}
export default function PostScreen ({ navigation }: Props) {
  const { user } = useSelector((state: any) => state.user)
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
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})
