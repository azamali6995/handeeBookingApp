import { Platform, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { constants, images, FONTS, SIZES, COLORS } from '../constants';
import { useNavigation } from '@react-navigation/native';

const Header = (props) => {
  const navigation = useNavigation()
  
  const handleToggleDrawer =()=>{
    props?.Text == 'Dashborad' ?
    navigation.toggleDrawer()
    :
    navigation?.goBack()
  }


  return (
    <View style={{height:90,  flexDirection: 'row', }}>
      <View style={{ justifyContent: 'flex-end', }}>
        {
          props.Left &&
          <TouchableOpacity style={{ height: 45, width: 40,justifyContent: 'center', }} onPress={() => {handleToggleDrawer() }}>
            <Image source={ props?.Text == 'Dashborad' ?
              require('../assets/images/drawer.png') 
              :
              require('../assets/images/back.png') 
              } 
              style={{height:28, width:28,  marginTop : props?.Text == 'Dashborad'? 5:0 ,}}
             />
          </TouchableOpacity>
        }
        {
          props.Back&&
          <TouchableOpacity style={{ height: 45, width: 45, alignItems: 'flex-end', justifyContent: 'center' }} onPress={() => { }}>
          </TouchableOpacity>
        }
      </View>
      {props.Text &&
      <View style={{  justifyContent: "flex-end", marginBottom:5 }}>
        <Text style={{ alignSelf: 'center', color: 'black',fontSize:24,fontWeight:'700', fontFamily:"Inter-Bold" }}>{props.Text}</Text>
      </View>}
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
        {
          props.Right&&
          <TouchableOpacity style={{ height: 45, width: 45, alignItems: 'flex-end', justifyContent: 'center' }} onPress={() => {  }}>
          </TouchableOpacity>
        }
      </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({})