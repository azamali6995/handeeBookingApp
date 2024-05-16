import {
    StyleSheet,
    Text,
    StatusBar,
    View,
    FlatList,
    TouchableOpacity,
    Image,
    ScrollView,
  } from 'react-native';
  import React, { useState, useEffect } from 'react';
  import Header from '../../component/Header';
  import { useSelector , useDispatch } from 'react-redux';
  import {completedOrders , completedOrdersSelector }  from '../../redux/slice/completedOrder';
  import LoadingPage from '../../component/LoadingPage';
  import { useFocusEffect } from '@react-navigation/native';


  const OrderCompleteScreen = (props) => {
    const {route, navigation} = props
    const dispatch = useDispatch();
    const {completedOrdersPayload , completedOrdersFetching} = useSelector(completedOrdersSelector)

    useFocusEffect(
      React.useCallback(() => {
        // if(completedOrdersPayload?.httpStatusCode == 200){
          dispatch(completedOrders())
        // }
      }, [navigation])
    );

    return (
      <View style={{flex: 1, paddingHorizontal:16,}}>
        <StatusBar
          translucent={true}
          backgroundColor="black"
          barStyle={'dark-content'}
        />
          {completedOrdersFetching  &&
            <LoadingPage />
          }
      <Header Left={true} Text={'Orders Completed'} Right={true} Back={false} />      
      {completedOrdersPayload?.length <= 0 ? 
        <View style={{alignItems:'center', justifyContent:"center", flex:1 }}>
          <Text style={styles.emptyText}>No order found</Text>
        </View>
      :
      <FlatList
        data={completedOrdersPayload}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
            <View>
            <View style={{ borderWidth:2,borderRadius:15,  borderColor:"#2591CA", height:117, margin:6}}>
             <View style={{height:58, justifyContent:"center", paddingHorizontal:15}}>
             <Text style={{fontFamily:"Inter-Medium", fontSize:14, fontWeight:"500",}}>Order Number:</Text>
              <Text style={{fontFamily:"Inter-Medium", fontSize:12, fontWeight:"500", color :"#2591CA",  marginTop:5}}>{item?.internalId}</Text>
             </View>   
             <View style={{height:50, flexDirection:"row", marginBottom:10, justifyContent:'space-between', paddingHorizontal:15}}>
             <View>
                <Text style={{fontFamily:"Inter-Medium", fontSize:14, fontWeight:"500", }}>
                  Customer ID:
                </Text>
                <Text style={{fontFamily:"Inter-Medium", fontSize:12, fontWeight:"500", color: "#2591CA", marginTop:5}}>
                  {item?.customerId}
                </Text>
             </View>
               <Text style={{alignSelf:"center",  fontFamily:"Inter-Regular", fontSize:12, fontWeight:"400",}}>
                 {item?.pickedDate?.substring(0,10)}
               </Text>
             </View> 
            </View>
            </View>
        )}
       />
      }



      </View>
    );
  };
  
  export default OrderCompleteScreen;
  
  const styles = StyleSheet.create({
    emptyText:{ 
      alignSelf: 'center',
      color: 'black',
      fontSize:16,
      fontWeight:'700', 
      fontFamily:"Inter-Bold" 
    }
  });
  