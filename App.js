import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import 'react-native-gesture-handler';

import { RootNavigation } from './src/navigation/RootNavigation';

const App = () => {
  
  


  return (
    <View style={{flex:1}}>
      <RootNavigation />
    </View>
  )
}

export default App