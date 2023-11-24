import { View, Text, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPosts } from '../redux/actions/postActions'
import { FlatList, StatusBar } from 'native-base'
import Loader from '../common/Loader'
import PostCard from '../shared/PostCard'
import Test from '../components/Test'
import Tester from '../shared/Tester'

type Props = {
  navigation: any
}

const HomeScreen = (props: Props) => {
  const dispatch = useDispatch()

  const { posts, isLoading } = useSelector((state: any) => state.post)

  useEffect(() => {
    getAllPosts()(dispatch)
  }, [])

  console.log({ posts })

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <SafeAreaView>
          <StatusBar
            animated={true}
            showHideTransition='fade'
            barStyle='dark-content'
            backgroundColor={'#61dafb'}
          />

          <FlatList
            data={posts}
            renderItem={({ item }) => {
              return (
                <>
                  <FlatList
                    data={posts}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                      <>
                        <PostCard navigation={props.navigation} item={item} />                  
                      </>
                    )}
                    // onScroll={onScroll}
                    // onScrollEndDrag={onScrollEndDrag}
                    // refreshControl={
                    //   <RefreshControl
                    //     refreshing={refreshing}
                    //     onRefresh={() => {
                    //       setRefreshing(true);
                    //       getAllPosts()(dispatch);
                    //       getAllUsers()(dispatch).then(() => {
                    //         setRefreshing(false);
                    //       });
                    //     }}
                    //     progressViewOffset={refreshingHeight}
                    //   />
                    // }
                    // onResponderRelease={onRelease}
                    // ListHeaderComponent={
                    // <Animated.View
                    //   style={{
                    //     paddingTop: extraPaddingTop,
                    //   }}
                    // />
                    // }
                  />
                </>
              )
            }}
          />
        </SafeAreaView>
      )}
    </>
  )
}

export default HomeScreen
