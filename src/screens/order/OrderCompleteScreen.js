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
            {completedOrdersPayload[0]?.itemInOrderOutputDTOs?.length <= 0 ? 
            
             <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>   
                <Text style={styles.emptyText}>No order found</Text> 
              </View> 
            :
            <FlatList
              data={completedOrdersPayload[0]?.itemInOrderOutputDTOs}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => {
                return (
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: '#CCCCCC',
                      marginVertical: 10,
                    }}
                  />
                );
              }}
              renderItem={({item, index}) => (
                <>
                  <View
                    style={{
                      alignItems: 'center',
                      paddingHorizontal: 5,
                      flexDirection: 'row',
                    }}>
                    <View style={{ marginVertical: 5}}>
                      <Image
                        source={require('../../assets/images/producticon.png')}
                        style={{height: 87, width: 87}}
                        resizeMode="contain"
                      />
                    </View>
  
                    <View style={{paddingHorizontal: 10,  }}>
                    <View style={{ paddingRight:10,  marginVertical:3}}>
                        <Text
                        numberOfLines={2}
                        ellipsizeMode='tail'
                          style={{
                            fontFamily: 'Inter-semiBold',
                            fontSize: 14,
                            color: '#2591CA',
                          
                          }}>
                         {item?.description.substring(0, 30)} 
                        </Text>
                       
                      </View>
  
                      <View style={{flexDirection: 'row', marginVertical: 3}}>
                        <Text
                          style={{
                            fontFamily: 'Inter-Regular',
                            fontSize: 13,
                            color: '#778B9D',
                          }}>
                          Item No:{' '}
                        </Text>
                        <Text
                          style={{
                            fontFamily: 'Inter-semibold',
                            fontSize: 14,
                            color: '#2591CA',
                          }}>
                          {item?.itemId}
                        </Text>
                        <Text
                          style={{
                            fontFamily: 'Inter-Regular',
                            fontSize: 13,
                            color: '#778B9D',
                            marginLeft: 15,
                          }}>
                          Qty:{' '}
                        </Text>
                        <Text
                          style={{
                            fontFamily: 'Inter-semibold',
                            fontSize: 14,
                            color: '#2591CA',
                          }}>
                          {item?.quantity}
                        </Text>
                      </View>
  
                      <View style={{flexDirection: 'row', marginVertical: 3}}>
                        
                        <Text
                          style={{
                            fontFamily: 'Inter-Regular',
                            fontSize: 10,
                            color: '#778B9D',
                            // marginLeft: 15,
                          }}>
                          Shelf NO:{' '}
                        </Text>
                        <Text
                          style={{
                            fontFamily: 'Inter-semibold',
                            fontSize: 10,
                            color: '#2591CA',
                          }}>
                          {item?.shelfNumber ?? "N/A" }
                        </Text>
                      </View>
                    </View>
                  </View>
                  
  
                 
                </>
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
  