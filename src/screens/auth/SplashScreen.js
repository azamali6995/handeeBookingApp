import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect } from 'react'
import LocalStorage from '../../services/LocalStorage';

let local = new LocalStorage();


const SplashScreen = (props) => {
   const {navigation, routes} = props

  useEffect(()=>{
    handleTokenAndRedirection()
  },[])


   const handleTokenAndRedirection = async()=>{
      let result = await local.getSession(result => {
        console.log("Resullootreadsafsdf", result)
        if(result?.userInfo?.data?.token){
          setTimeout(() => {
            if( result?.userInfo?.data?.token){
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'DashboradScreen', params: { } }],
                });
            }else
            {
              navigation.reset({
                index: 0,
                routes: [{ name: 'LoginScreen', params: { value: 0 } }],
              });
            }
           
          }, 2000);
        }else{
          setTimeout(()=>{
            navigation.reset({
              index: 0,
              routes: [{ name: 'LoginScreen', params: { value: 0 } }],
            });
          }, 2000)
        }
    });
    console.log("result", result)
   }

  return (
    <View style={{flex:1, backgroundColor:"white", alignItems:"center", justifyContent:"center"}}>
      <Image 
        style={{height:50, width:220,}}
        source ={require('../../assets/images/splash.png') }
       /> 
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({})