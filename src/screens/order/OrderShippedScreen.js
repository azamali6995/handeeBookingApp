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
import Button from '../../component/Button';
import { useSelector, useDispatch } from 'react-redux';
import {boxPackingSelector}  from '../../redux//slice/boxPacking';
import {shippedMarkByShipper, shippedMarkByShipperSelector} from '../../redux//slice/shippedMarkByShipper';
import LoadingPage from '../../component/LoadingPage';
const OrderShippedScreen = (props) => {
  const dispatch = useDispatch();

  const {route, navigation} = props
  const {boxPackingPayload} = useSelector(boxPackingSelector)
  const {shippedMarkByShipperFetching ,shippedMarkByShipperPayload } = useSelector(shippedMarkByShipperSelector)

  const [dropDown, setDropDown] = useState(true) 
  const [itemData, setItemData] = useState({})
  const [boxData, setBoxData] = useState([])

  useEffect(()=>{ 
    setItemData(props?.route?.params?.item)
    console.log("Shipped", props?.route?.params?.item)
    setBoxData(props?.route?.params?.item?.packingBoxesDetailOutputDTOs)
  },[])


  useEffect(()=>{
    if(shippedMarkByShipperFetching == true){
      navigation?.navigate("DashboradScreen")
    }
  },[shippedMarkByShipperFetching])
 
  const handlPress =()=>{
    setDropDown(!dropDown)
  }   

  const handleOrderAsShipped =()=>{
    let body ={
      "internalId": route?.params?.item?.internalId,
      "fulfillmentId":route?.params?.item?.fulfilmentNumber
    }
    


    console.log("paasdfasdfsad", body)
    dispatch(shippedMarkByShipper(body))
  }


  return (
    <View style={{flex: 1, paddingHorizontal:16,}}>
      <StatusBar
        translucent={true}
        backgroundColor="black"
        barStyle={'dark-content'}
      />
      {  shippedMarkByShipperFetching &&
            <LoadingPage />
           
          }
      <Header Left={true} Text={'Orders Shipped'} Right={true} Back={false} />
      <ScrollView 
      showsVerticalScrollIndicator={false}
      style={{flexGrow : 1, paddingTop:10}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{paddingVertical: 10}}>
              <Text
                style={{
                  fontFamily: 'Inter-Medium',
                  fontSize: 14,
                  fontWeight: '500',
                  color: 'black',
                }}>
                Order Number:
              </Text>
              <Text
                style={{
                  fontFamily: 'Inter-Medium',
                  marginTop: 5,
                  fontSize: 12,
                  fontWeight: '500',
                  color: '#2591CA',
                }}>
                 {itemData?.oldOrderNumber ?  itemData?.oldOrderNumber : "N/A" }
              </Text>
            </View>
  
            <View style={{paddingVertical: 10}}>
              <Text
                style={{
                  fontFamily: 'Inter-Medium',
                  fontSize: 14,
                  fontWeight: '500',
                  color: 'black',
                }}>
                Date:
              </Text>
              <Text
                style={{
                  fontFamily: 'Inter-Medium',
                  marginTop: 5,
                  fontSize: 12,
                  fontWeight: '500',
                  color: '#2591CA',
                }}>
                 {itemData?.createdDate?.substring(0,10)}
              </Text>
            </View>
  
            <View style={{paddingVertical: 10}}>
              <Text
                style={{
                  fontFamily: 'Inter-Medium',
                  fontSize: 14,
                  fontWeight: '500',
                  color: 'black',
                }}>
                Customer ID:
              </Text>
              <Text
                style={{
                  fontFamily: 'Inter-Medium',
                  marginTop: 5,
                  fontSize: 12,
                  fontWeight: '500',
                  color: '#2591CA',
                }}>
                 {itemData?.customerId ?  itemData?.customerId : "N/A" }
              </Text>
            </View>
          </View>
  
          <View style={{flexDirection: 'row', }}>
            <View style={{paddingVertical: 10, width:"33%",}}>
              <Text
                style={{
                  fontFamily: 'Inter-Medium',
                  fontSize: 14,
                  fontWeight: '500',
                  color: 'black',
                }}>
                Terms:
              </Text>
              <Text
                style={{
                  fontFamily: 'Inter-Medium',
                  marginTop: 5,
                  fontSize: 12,
                  fontWeight: '500',
                  color: '#2591CA',
                }}>
                {itemData?.terms ?  itemData?.terms : "N/A" }
              </Text>
            </View>
  
            <View style={{paddingVertical: 10,  width:"33%", alignItems:"center"}}>
              <Text
                style={{
                  fontFamily: 'Inter-Medium',
                  fontSize: 14,
                  fontWeight: '500',
                  color: 'black',
                }}>
                VIA:
              </Text>
              <Text
                style={{
                  fontFamily: 'Inter-Medium',
                  marginTop: 5,
                  fontSize: 12,
                  fontWeight: '500',
                  color: '#2591CA',
                }}>
                {itemData?.via ?  itemData?.via : "N/A" }
               
              </Text>
            </View>
  
            <View style={{paddingVertical: 10,  width:"33%",justifyContent:"flex-end", alignItems:'flex-end' }}>
              <Text
                style={{
                  fontFamily: 'Inter-Medium',
                  fontSize: 14,
                  fontWeight: '500',
                  color: 'black',
                }}>
                P/O Number:
              </Text>
              <Text
                style={{
                  fontFamily: 'Inter-Medium',
                  marginTop: 5,
                  fontSize: 12,
                  fontWeight: '500',
                  color: '#2591CA',
                }}>
                {itemData?.poNumber ?  itemData?.poNumber : "N/A" }
              </Text>
            </View>
          </View>
  
          <View style={{flexDirection: 'row',}}>
            <View style={{paddingVertical: 10, width: '44%',}}>
              <Text
                style={{
                  fontFamily: 'Inter-Medium',
                  fontSize: 14,
                  fontWeight: '500',
                  color: 'black',
                }}>
                Ship Date:
              </Text>
              <Text
                style={{
                  fontFamily: 'Inter-Medium',
                  marginTop: 5,
                  fontSize: 12,
                  fontWeight: '500',
                  color: '#2591CA',
                }}>
                {itemData?.shippedDate ? itemData?.shippedDate?.substring(0,10) : "N/A" }
              </Text>
            </View>
  
            <View style={{paddingVertical: 10, marginLeft:5, width:'55%'}}>
              <Text
                style={{
                  fontFamily: 'Inter-Medium',
                  fontSize: 14,
                  fontWeight: '500',
                  color: 'black',
                }}>
                Ship To:
              </Text>
              <Text
                style={{
                  fontFamily: 'Inter-Medium',
                  marginTop: 5,
                  fontSize: 12,
                  fontWeight: '500',
                  color: '#2591CA',
                }}>
                {itemData?.toShippingAddress ? itemData?.toShippingAddress : "N/A" }
              </Text>
            </View>
          </View>

        <View style={{paddingVertical: 5 , flex:0.55}}>
          <Text
            style={{fontFamily: 'Inter-Bold', fontWeight: '700', fontSize: 24}}>
            Boxes
          </Text>
          <View
            style={{borderWidth: 1, borderColor: '#CCCCCC', marginTop: 15}}
          />
          <View style={{height:179}}>
          {boxData?.length <= 0 ? 
            <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>   
              <Text style={styles.emptyText}>No Box againt this order</Text> 
              </View>
              :  
              <FlatList
                data={boxData}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.id}
                ItemSeparatorComponent={() => {
                  return <View style={{borderWidth: 1, borderColor: '#CCCCCC'}} />;
                }}
                renderItem={({item, index}) => (
                  <View
                    style={{
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingHorizontal: 5,
                      flexDirection: 'row',
                      height: 60,
                      flex:1
                    }}>
                    <View style={{width: '15%'}}>
                      <Text
                        style={{
                          fontFamily: 'Inter-SemiBold',
                          fontSize: 14,
                          fontWeight: '600',
                          color: '#2591CA',
                        }}>
                        1 Box
                      </Text>
                    </View>

                    <View style={{flexDirection: 'row', }}>
                      <Text
                        style={{
                          fontFamily: 'Inter-Medium',
                          fontSize: 10,
                          fontWeight: '500',
                          color: '#778B9D',
                        }}>
                        Height:
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Inter-Medium',
                          fontSize: 10,
                          fontWeight: '500',
                          marginLeft: 3,
                          color: '#2591CA',
                        }}>
                        {item?.height}
                      </Text>
                    </View>
                        

                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={{
                          fontFamily: 'Inter-Medium',
                          fontSize: 10,
                          fontWeight: '500',
                          color: '#778B9D',
                        }}>
                        Width:
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Inter-Medium',
                          fontSize: 10,
                          fontWeight: '500',
                          marginLeft: 3,
                          color: '#2591CA',
                        }}>
                        {item?.width}
                      </Text>
                    </View>

                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={{
                          fontFamily: 'Inter-Medium',
                          fontSize: 10,
                          fontWeight: '500',
                          color: '#778B9D',
                        }}>
                        Weight:
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Inter-Medium',
                          fontSize: 10,
                          fontWeight: '500',
                          marginLeft: 3,
                          color: '#2591CA',
                        }}>
                        {item?.weight}
                      </Text>
                    </View>    

                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={{
                          fontFamily: 'Inter-Medium',
                          fontSize: 10,
                          fontWeight: '500',
                          color: '#778B9D',
                        }}>
                        Length:
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Inter-Medium',
                          fontSize: 10,
                          fontWeight: '500',
                          marginLeft: 3,
                          color: '#2591CA',
                        }}>
                        {/* {item?.length} */}
                        12
                      </Text>
                    </View>     


                  </View>
                )}
              />
            }



            </View>
          <View
            style={{borderWidth: 1, borderColor: '#CCCCCC', marginBottom: 15}}
          />

         </View>


          <View style={{flex:1}}>
          <View style={{flexDirection: 'row', paddingVetical:10, justifyContent: 'space-between'}}>
            <Text
              style={{
                fontFamily: 'Inter-Bold',
                fontWeight: '700',
                fontSize: 24,
              }}>
              Items
            </Text>
            <TouchableOpacity 
             style={{height:30, width:40, justifyContent:"center", alignItems:"center", }}   
             onPress={()=>handlPress()}  >
              <Image
                source={dropDown ?  
                require('../../assets/images/downicon.png') 
                :
                require('../../assets/images/upicon.png') 
                }
                resizeMode='contain'
                style={{height: 16, width: 16,}}
              />
            </TouchableOpacity>
          </View>

          <FlatList
              data={ dropDown ? itemData?.itemInOrdersOutputDTOs : []}
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
                            marginLeft:10,
                            color: '#778B9D',
                            // marginLeft: 15,
                          }}>
                          Shelf NO:{' '}
                        </Text>
                        <Text
                          style={{
                            fontFamily: 'Inter-semibold',
                            fontSize: 13,
                            color: '#2591CA',
                          }}>
                          {item?.shelfNumber ?? "N/A" }
                        </Text>
                      </View>
  
                      <View style={{flexDirection: 'row', marginVertical: 3}}>
                       <Text
                          style={{
                            fontFamily: 'Inter-Regular',
                            fontSize: 13,
                            color: '#778B9D',
                            // marginLeft: 15,
                          }}>
                         order qty:{' '}
                        </Text>
                        <Text
                          style={{
                            fontFamily: 'Inter-semibold',
                            fontSize: 14,
                            color: '#2591CA',
                          }}>
                          {item?.quantityOrdered}
                        </Text>

                        <Text
                          style={{
                            fontFamily: 'Inter-Regular',
                            fontSize: 13,
                            color: '#778B9D',
                            marginLeft: 10,
                          }}>
                         shiped qty:{' '}
                        </Text>
                        <Text
                          style={{
                            fontFamily: 'Inter-semibold',
                            fontSize: 14,
                            color: '#2591CA',
                          }}>
                          {item?.quantityShipped}
                        </Text>
                      </View>
                    </View>
                  </View>
                  
  
                 
                </>
              )}
            />       
          </View>

        
      </ScrollView>

      <View
        style={{
          paddingVertical: 10,
          paddingHorizontal: 16,
          justifyContent: 'center',
        }}>
        <Button
          buttonStyle={{borderRadius: 10}}
          title={'Mark order as Shipped'}
          LIcon={false}
          LIconStyle={{marginLeft: 5}}
          RIcon={false}
          RIconStyle={{marginRight: 5}}
          onPress={() => {
            handleOrderAsShipped();
          }}
          disabled={false}
          loading={false}
        />
      </View>
    </View>
  );
};

export default OrderShippedScreen;

const styles = StyleSheet.create({});
