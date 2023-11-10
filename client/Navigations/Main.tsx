import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from "./Tabs";
import SearchScreen from '../screens/SearchScreen';

type Props = {};

const Main = (props: Props) => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Tabs} options={{headerShown:false}} />
    </Stack.Navigator>
  );
};

export default Main;
