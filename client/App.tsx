import * as React from 'react'
import { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Main from './Navigations/Main'
import Auth from './Navigations/Auth'
import { Text, View } from 'react-native'
import Store from './redux/store'
import { NativeWindStyleSheet } from 'nativewind'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { getAllUsers, loadUser } from './redux/actions/userActions'
import Loader from './common/Loader'
import { NativeBaseProvider } from 'native-base'
NativeWindStyleSheet.setOutput({
  default: 'native'
})

function App () {
  return (
    <Provider store={Store}>
      <AppStack />
    </Provider>
  )
}

const AppStack = () => {
  const [isLogin, setIsLogin] = React.useState(false)

  const { isAuthenticated, loading } = useSelector((state: any) => state.user)

  const dispatch = useDispatch()

  React.useEffect(() => {
    Store.dispatch(loadUser())
    getAllUsers()(dispatch)
  }, [])

  console.log({ loading })

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {isAuthenticated ? (
            <NavigationContainer>
              <NativeBaseProvider>
                <Main />
              </NativeBaseProvider>
            </NavigationContainer>
          ) : (
            <NavigationContainer>
              <Auth />
            </NavigationContainer>
          )}
        </>
      )}
    </>
  )
}
export default App
