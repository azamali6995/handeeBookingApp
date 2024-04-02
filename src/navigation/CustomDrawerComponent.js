
import React from 'react';
import {
  Image,
  View,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  StyleSheet,
  Text
} from 'react-native';
import metrics from '../constants/metrics';
import {responsiveWidth, responsiveHeight} from '../constants/responsive';

import DrawerItem from './DrawerItems';

export default function CustomDrawerComponent(props) {
  const { navigation } =props  

  const drawerItems = [
    {
      title: 'Dashboard',
      name: require('../assets/images/dashbordicon.png'),
      routeName: 'DashboradScreen',
    },
    {
     title: 'Pending Order',
      name: require('../assets/images/order.png'),
      routeName: 'PendingOrderScreen',
    },
    {
      title: 'Completed Orders',
      name: require('../assets/images/order.png'),
      routeName: 'OrderScreen',
    },
  ];

  const handleCloseDrawer =()=>{
    navigation.closeDrawer()
  }
 
  const handleLogOut = async() => {
  };

  const onPressDrawerItem = (data) => {
    navigation.closeDrawer()
    navigation.navigate(data?.routeName);
  };
 

  return (
    <View style= {styles.mainContainer}>
      <StatusBar translucent backgroundColor="transparent" />
      <ScrollView  contentContainerStyle={{ flexGrow: 1, }}>
      
        <View style={styles.innerContainer}>
          <TouchableOpacity 
          onPress={()=>handleCloseDrawer()}
          style={styles.container}>
          <Image source={require('../assets/images/cross.png')} 
            style={{height:25, width:25}}
            resizeMode='contain'
          />
          </TouchableOpacity>
          <View style={styles.drawerContainer}>
            <DrawerItem
              drawerItems={drawerItems}
              onPress={onPressDrawerItem}
              navigation={navigation}
            />
          </View>
        <View style={[styles.LogoutContainer,{}]}>
         <TouchableOpacity style={styles.LogoutButton} 
           onPress={() => { handleLogOut() }} >
            <Image source={require('../assets/images/logout.png')} 
              style={{height:25, width:25, }}
              resizeMode='contain'
            />
             <Text style={styles.logoutText}>
               Logout
             </Text>
         </TouchableOpacity>
       </View>
         
           </View>
              
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer:{
    flex: 1,
  },
  innerContainer:{
    flex: 1,
  },
  container:{
    flexGrow: 0.1,
    alignItems:"flex-end",
    justifyContent:"flex-end",
    paddingVertical: metrics.smallPadding,
    paddingHorizontal: metrics.smallPadding
  },
  drawerContainer:{
    borderBottomWidth:1,
    borderBottomColor:"white",
    flex: 0.90,
    idth: responsiveWidth(100)
  },
  LogoutContainer:{
    justifyContent: "center",
    height: 90,
    width: "100%",
  },
  LogoutButton: {
    paddingLeft:20,
    flexDirection:"row",
    alignItems:"center",
  },
  logoutText:{ 
    color: 'white', 
    marginLeft:5, 
    fontSize:20, 
    fontFamily:"Inter-Regular", 
    fontWeight:"400" 
  }

})