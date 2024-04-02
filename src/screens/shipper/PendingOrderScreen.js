import {StatusBar, StyleSheet, Text, View, FlatList, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState}  from 'react';
import Header from '../../component/Header';
import Translucent from '../../component/MainInputView';
import { useDispatch, useSelector } from 'react-redux';
import { userLoginSelector } from '../../redux/slice/authSlice';
import { userPickerSelector } from '../../redux/slice/pickerSlice';
import { userPackerSelector } from '../../redux/slice/packerSlice';
import { userShipperSelector } from '../../redux/slice/shipperSlice';

const PendingOrderScreen = (props) => {
  const dispatch = useDispatch();
  const {userLoginFetching, userLoginPayload} = useSelector(userLoginSelector)
  const {userPickerPayload,} = useSelector(userPickerSelector)
  const {userPackerPayload,} = useSelector(userPackerSelector)
  const {userShipperPayload} = useSelector(userShipperSelector)


  const [selectedItem, setSelectedItem] = useState(null);  
  const [allOrder, setAllOrders] = useState([])

  useEffect(()=>{
    if(userLoginPayload?.data?.roleId == 2){
      if(userPickerPayload){
        setAllOrders(userPickerPayload?.data)
      } 
    }else if(userLoginPayload?.data?.roleId == 3){
      if(userPackerPayload){
        setAllOrders(userPackerPayload?.data)
      } 
    }else if(userLoginPayload?.data?.roleId == 4){
      if(userShipperPayload){
        setAllOrders(userShipperPayload?.data)
      } 
    }
  },[])

  console.log("<======allOrder=====>", userLoginPayload )
  console.log("userPackerPayload=======>", userPackerPayload)
  console.log("userShipperPayload=======>", userShipperPayload)



  const handleSelectedItem = (item, index)=>{
    console.log("SingleItem", item)
    if(userLoginPayload?.data?.roleId == 2){
       props.navigation.navigate("OrderPickerScreen",{item}) 
    }else if(userLoginPayload?.data?.roleId == 3){
      props.navigation.navigate("OrderPackedScreen",{ item}) 
    } else if(userLoginPayload?.data?.roleId == 4){
      props.navigation.navigate("OrderShippedScreen",{ item}) 
    }
  }

  return (
    <View style={{flex:1, paddingHorizontal:16,}}>
    <StatusBar
        translucent={true}
        backgroundColor="black"
        barStyle={'dark-content'}
      />
      <Header Left={true} Text={'All Orders'} Right={true} Back={false} />
      
      <View style={{ flex:1 ,paddingVertical:10 }}>
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
               <Text style={{alignSelf:"center", color:selectedItem == index ? '#fff' : "#848484", fontFamily:"Inter-Regular", fontSize:12, fontWeight:"400",}}>{item?.pickedDate}</Text>
             </View> 

            </View>
            </TouchableOpacity>
        )}
      />      
      </View>
      
    </View>
  );
};

export default PendingOrderScreen;

const styles = StyleSheet.create({});
