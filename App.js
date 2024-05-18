import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import 'react-native-gesture-handler';
import store from "./src/redux/store/index";
import { RootNavigation } from './src/navigation/RootNavigation';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';

const App = () => {
  

  return (
    <Provider store={store}>
      <PaperProvider>
         <RootNavigation />
      </PaperProvider>
    </Provider>
  )
}

export default App