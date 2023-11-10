import { View, Text, Image } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen'
import SearchScreen from '../screens/SearchScreen'
import NotificationsScreen from '../screens/NotificationsScreen'
import PostScreen from '../screens/PostScreen'
import ProfileScreen from '../screens/ProfileScreen'

type Props = {}

const Tab = createBottomTabNavigator()

const Tabs = (props: Props) => {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true
      }}
    >
      <Tab.Screen
        name='Home2'
        component={HomeScreen}
        options={({ route }) => ({
          tabBarIcon: ({ focused }) => (
            <Image
              source={{
                uri: focused
                  ? 'https://cdn-icons-png.flaticon.com/128/3917/3917032.png'
                  : 'https://cdn-icons-png.flaticon.com/128/3917/3917014.png'
              }}
              style={{
                width: 30,
                height: 30,
                tintColor: focused ? '#000' : '#444'
              }}
            />
          )
        })}
      />

      <Tab.Screen
        name='Search'
        component={SearchScreen}
        options={({ route }) => ({
          tabBarIcon: ({ focused }) => (
            <Image
              source={{
                uri: focused
                  ? 'https://cdn-icons-png.flaticon.com/128/3917/3917132.png'
                  : 'https://cdn-icons-png.flaticon.com/128/3917/3917132.png'
              }}
              style={{
                width: 30,
                height: 30,
                tintColor: focused ? '#000' : '#444'
              }}
            />
          )
        })}
      />

      <Tab.Screen
        name='Post'
        component={PostScreen}
        options={({ route }) => ({
          tabBarStyle: { display: route.name === 'Post' ? 'none' : 'flex' },
          tabBarIcon: ({ focused }) => (
            <Image
              source={{
                uri: focused
                  ? 'https://cdn-icons-png.flaticon.com/512/10015/10015412.png'
                  : 'https://cdn-icons-png.flaticon.com/512/10015/10015412.png'
              }}
              style={{
                width: 30,
                height: 30,
                tintColor: focused ? '#000' : '#444'
              }}
            />
          )
        })}
      />

      <Tab.Screen
        name='Notifications'
        component={NotificationsScreen}
        options={({ route }) => ({
          tabBarIcon: ({ focused }) => (
            <Image
              source={{
                uri: focused
                  ? 'https://cdn-icons-png.flaticon.com/512/1077/1077086.png'
                  : 'https://cdn-icons-png.flaticon.com/512/1077/1077035.png'
              }}
              style={{
                width: 30,
                height: 30,
                tintColor: focused ? '#000' : '#444'
              }}
            />
          )
        })}
      />

      <Tab.Screen
        name='Profile'
        component={ProfileScreen}
        options={({ route }) => ({
          tabBarIcon: ({ focused }) => (
            <Image
              source={{
                uri: focused
                  ? 'https://cdn-icons-png.flaticon.com/512/1077/1077063.png'
                  : 'https://cdn-icons-png.flaticon.com/512/1077/1077063.png'
              }}
              style={{
                width: 30,
                height: 30,
                tintColor: focused ? '#000' : '#444'
              }}
            />
          )
        })}
      />
    </Tab.Navigator>
  )
}

export default Tabs
