import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import 'react-native-gesture-handler';
import store from "./src/redux/store/index";
import { RootNavigation } from './src/navigation/RootNavigation';
import { Provider } from 'react-redux';


const App = () => {
  

  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  )
}

export default App