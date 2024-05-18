import {StatusBar, StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Alert} from 'react-native';
import React, {useEffect, useState}  from 'react';
import Header from '../../component/Header';
import Translucent from '../../component/MainInputView';
import { useDispatch, useSelector } from 'react-redux';
import { userLoginSelector } from '../../redux/slice/authSlice';
import { userPickerSelector } from '../../redux/slice/pickerSlice';
import { userPackerSelector } from '../../redux/slice/packerSlice';
import { userShipperSelector } from '../../redux/slice/shipperSlice';

import { userPicker , } from '../../redux/slice/pickerSlice';
import { userPacker  } from '../../redux/slice/packerSlice';
import { userShipper } from '../../redux/slice/shipperSlice';
import LoadingPage from '../../component/LoadingPage';
import { useFocusEffect } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';

const PendingOrderScreen = ({navigation, route}) => {
 console.log("routerouterouteroute", route.params)
 const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const {userLoginFetching} = useSelector(userLoginSelector)
  const {userPickerPayload, userPickerFetching} = useSelector(userPickerSelector)
  const {userPackerPayload, userPackerFetching} = useSelector(userPackerSelector)
  const {userShipperPayload, userShipperFetching} = useSelector(userShipperSelector)
  const [selectedItem, setSelectedItem] = useState(null);  
  const [allOrder, setAllOrders] = useState([])


  useFocusEffect(
    React.useCallback(() => {
      dispatch(userPicker())
      dispatch(userShipper())
      dispatch(userPacker()) 
    }, [navigation, isFocused ])
  );
  useEffect(() => {
    handleStateData();
  }, [userPickerPayload, userPackerPayload, userShipperPayload]);

  const handleStateData =()=>{
    if(route.params?.pickerData?.roleId == 2){
      if(userPickerPayload){
        setAllOrders(userPickerPayload?.data)
      } 
    }else if(route.params?.packerData?.roleId == 3){
      if(userPackerPayload){
        setAllOrders(userPackerPayload?.data)
      } 
    }else if(route.params?.shippedData?.roleId == 4){
      if(userShipperPayload){
        setAllOrders(userShipperPayload?.data)
      } 
    }
  }


  const handleSelectedItem = (item, index)=>{
    console.log("item", item)

    if(route.params?.pickerData?.roleId == 2){
       navigation.navigate("OrderPickerScreen",{item}) 
    }else if(route.params?.packerData?.roleId == 3){
      navigation.navigate("OrderPackedScreen",{ item}) 
    } else if(route.params?.shippedData?.roleId == 4){
      navigation.navigate("OrderShippedScreen",{ item}) 
    }
  }

  return (
    <View style={{flex:1, paddingHorizontal:16,}}>
    <StatusBar
        translucent={true}
        backgroundColor="black"
        barStyle={'dark-content'}
      />
      {userShipperFetching || userPickerFetching || userPackerFetching ?
      <LoadingPage/>
      :
      null
    }

      <Header Left={true} Text={'All Orders'} Right={true} Back={false} />
      
      <View style={{ flex:1 ,paddingVertical:10 }}>
      {allOrder?.length <= 0 ? 
        <View style={{alignItems:'center', justifyContent:"center", flex:1 }}>
          <Text style={styles.emptyText}>No order found</Text>
        </View>
      :
      <FlatList
        data={allOrder}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
            <TouchableOpacity
            onPress={() => {handleSelectedItem(item, index)}}>
            <View style={{ borderWidth:2,borderRadius:15, backgroundColor: selectedItem == index ? '#2591CA' : '#fff' ,  borderColor:"#2591CA", height:117, margin:6}}>
             <View style={{height:58, justifyContent:"center", paddingHorizontal:15}}>
             <Text style={{fontFamily:"Inter-Medium", fontSize:14, fontWeight:"500", color: selectedItem == index ? '#fff' : 'black' }}>Order Number:</Text>
              <Text style={{fontFamily:"Inter-Medium", fontSize:12, fontWeight:"500", color :selectedItem == index ? '#fff' : "#2591CA",  marginTop:5}}>{item?.internalId}</Text>
             </View>   
              
             <View style={{height:50, flexDirection:"row", marginBottom:10, justifyContent:'space-between', paddingHorizontal:15}}>
             <View>
                <Text style={{fontFamily:"Inter-Medium", fontSize:14, fontWeight:"500", color: selectedItem == index ? '#fff' : 'black'}}>Customer ID:</Text>
                <Text style={{fontFamily:"Inter-Medium", fontSize:12, fontWeight:"500", color:selectedItem == index ? '#fff' : "#2591CA", marginTop:5}}>{item?.customerId}</Text>
             </View>
               <Text style={{alignSelf:"center", color:selectedItem == index ? '#fff' : "#848484", fontFamily:"Inter-Regular", fontSize:12, fontWeight:"400",}}>{item?.pickedDate?.substring(0,10)}</Text>
             </View> 

            </View>
            </TouchableOpacity>
        )}
      />   
      }   
      </View>
      
    </View>
  );
};

export default PendingOrderScreen;

const styles = StyleSheet.create({
  emptyText:{ 
    alignSelf: 'center',
    color: 'black',
    fontSize:20,
    fontWeight:'700', 
    fontFamily:"Inter-Bold" 
  }

});
