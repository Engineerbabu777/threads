

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Main from './Navigations/Main';
import Auth from './Navigations/Auth';
import { Text, View } from 'react-native';
import Store from './redux/store';
import { NativeWindStyleSheet } from "nativewind";
import {Provider} from 'react-redux';
NativeWindStyleSheet.setOutput({
  default: "native",
});

function App() {

  return (
    <Provider store={Store}>
      <AppStack />
    </Provider>
   
  );
}


const AppStack = () => {
  const [isLogin,setIsLogin] = React.useState(false);

  return(
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
  )
}
export default App;
