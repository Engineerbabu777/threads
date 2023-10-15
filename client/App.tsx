

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Main from './Navigations/Main';
import Auth from './Navigations/Auth';
import { Text, View } from 'react-native';

import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({
  default: "native",
});

function App() {
  const [isLogin,setIsLogin] = React.useState(false);

  return (
    <>
      {isLogin ? (
        <NavigationContainer>
          <Main />
        </NavigationContainer>
      ) : (
        <NavigationContainer>
          <Auth />
        </NavigationContainer>
      )}
    </>
  );
}

export default App;
