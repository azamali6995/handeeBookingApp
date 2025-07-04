
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
  import InputText from '../../component/InputBox'
  import { COLORS } from '../../constants';
  import { useSelector , useDispatch } from 'react-redux';
  import {boxPacking, boxPackingSelector}  from '../../redux/slice/boxPacking';
  import {getBoxPacking , getBoxPackingSelector }  from '../../redux/slice/getBoxPackingList';
  import {pakedMarkedByPaker, pakedMarkedByPakerSelector} from '../../redux//slice/packedMarkedByPaker';
  import LoadingPage from '../../component/LoadingPage';
  import { useFocusEffect } from '@react-navigation/native';


  const OrderPackedScreen = (props) => {
    const {route, navigation} = props
    const dispatch = useDispatch();
    const {boxPackingPayload, boxPackingFetching} = useSelector(boxPackingSelector)
    const {getBoxPackingPayload , getBoxPackingFetching} = useSelector(getBoxPackingSelector)
    const {pakedMarkedByPakerFetching ,pakedMarkedByPakerPayload } = useSelector(pakedMarkedByPakerSelector)

    const [dropDown, setDropDown] = useState(true) 
    const [itemData, setItemData] = useState({})
    const [boxWidth, setBoxWidth] = useState('') 
    const [boxheight, setBoxheight] = useState('') 
    const [boxWeight, setBoxWeight] = useState('') 
    const [boxLength, setBoxLength] = useState('') 
    const [isAddBox , setIsAddBox] = useState(false)

    useEffect(()=>{ 
      setItemData(props?.route?.params?.item)
    },[])

    useEffect(()=>{
      if(pakedMarkedByPakerFetching == true){
        navigation?.navigate("DashboradScreen")
      }
    },[pakedMarkedByPakerFetching])


    const handlPress =()=>{
      setDropDown(!dropDown)
    }   

    const handleAddBox =()=>{
      setIsAddBox(!isAddBox)
    }
  
    const handleOrderAsShipped =()=>{
      let body ={
        "inrernalId": route?.params?.item?.internalId,
        "fulfillmentId":route?.params?.item?.fulfilmentNumber
      }
      console.log("Bosysdfasdfas", body)
      dispatch(pakedMarkedByPaker(body))
    }

    const handleDone =()=>{
      let body = {
        "width": boxWidth,
        "height": boxheight,
        "weight": boxWeight,
        "length": boxLength,
        "orderId": route?.params?.item?.internalId,
      }
      dispatch(boxPacking(body))
      setBoxWeight('')
      setBoxheight('')
      setBoxWidth('')
      setBoxLength('')
      dispatch(getBoxPacking(route?.params?.item?.internalId))
    }

    useFocusEffect(
      React.useCallback(() => {
        if(boxPackingPayload?.httpStatusCode == 200){
          let id = route?.params?.item?.internalId
          dispatch(getBoxPacking(id))
        }else{
          let id = route?.params?.item?.internalId
          dispatch(getBoxPacking(id)) 
        }
      }, [boxPackingPayload])
    );

    return (
      <View style={{flex: 1, paddingHorizontal:16,}}>
        <StatusBar
          translucent={true}
          backgroundColor="black"
          barStyle={'dark-content'}
        />
          {boxPackingFetching || pakedMarkedByPakerFetching ?
            <LoadingPage />
            : null
          }

        <Header Left={true} Text={'Orders Packed'} Right={true} Back={false} />
        <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle ={{flexGrow: 1, paddingVertical:10 }}>
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
                 {itemData?.orderName ?  itemData?.orderName : "N/A" }
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
                 {itemData?.createdDate ? itemData?.createdDate?.substring(0,10) : "N/A" }
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
                {itemData?.shipmethod ?  itemData?.shipmethod : "N/A" }
               
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
  
          <View style={{paddingVertical: 15 , }}>
            <View style={{flexDirection:"row", justifyContent:"space-between"}}>
            <Text
              style={{fontFamily: 'Inter-Bold', fontWeight: '700', fontSize: 24}}>
              Boxes
            </Text>
            <View style={{flexDirection:"row"}}>
         
              <Text
                style={{fontFamily: 'Inter-Medium', fontWeight: '500', color:"black", fontSize: 16}}>
                Add Box
              </Text>
              
              <TouchableOpacity 
              onPress={()=>{handleAddBox()}}
              style={{height:20,width:20, borderRadius:10, backgroundColor:"#2591CA",alignItems:"center", justifyContent:"center", marginLeft:5}}>
                <Image source={require('../../assets/images/plus.png')}
                    style={{height:11, width:11}}
                    resizeMode='contain'
                />
              </TouchableOpacity>  
            </View>
            </View>

           
            {isAddBox &&
            <View  style={{}}>
             <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{paddingVertical: 10}}>
                <Text
                    style={{
                    fontFamily: 'Inter-Medium',
                    fontSize: 14,
                    fontWeight: '500',
                    color: '#778B9D',
                    }}>
                    Width
                </Text>
                <View style={{height:38, justifyContent:"center", marginTop:10, width:82.8, borderRadius:7}} >
                <InputText
                    val={boxWidth}
                    edit={true}
                    bgStyle={{height:38, borderRadius:7}}
                    placeholder="inch"
                    removePadding={true}
                    onChangeText={txt => {
                      setBoxWidth(txt);
                    }}
                  />
                </View> 
                </View>
    
                <View style={{paddingVertical: 10}}>
                <Text
                    style={{
                    fontFamily: 'Inter-Medium',
                    fontSize: 14,
                    fontWeight: '500',
                    color: '#778B9D',
                    }}>
                    Height
                </Text>
                <View style={{height:38, justifyContent:"center", marginTop:10, width:82.8, borderRadius:7}} >
                <InputText
                    val={boxheight}
                    edit={true}
                    bgStyle={{height:38, borderRadius:7,}}
                    placeholder="inch"
                    removePadding={true}
                    onChangeText={txt => {
                      setBoxheight(txt);
                    }}
                  />
                </View> 
                </View> 
    
                <View style={{paddingVertical: 10}}>
                <Text
                    style={{
                    fontFamily: 'Inter-Medium',
                    fontSize: 14,
                    fontWeight: '500',
                    color: '#778B9D',
                    }}>
                    Weight
                </Text>
                <View style={{height:38, justifyContent:"center", marginTop:10, width:82.8, borderRadius:7}} >
                <InputText
                    val={boxWeight}
                    edit={true}
                    bgStyle={{height:38, borderRadius:7,}}
                    placeholder="kg"
                    removePadding={true}
                    onChangeText={txt => {
                      setBoxWeight(txt);
                    }}
                  />
                </View> 
                
                </View>

                <View style={{paddingVertical: 10}}>
                <Text
                    style={{
                    fontFamily: 'Inter-Medium',
                    fontSize: 14,
                    fontWeight: '500',
                    color: '#778B9D',
                    }}>
                    Length
                </Text>
                <View style={{height:38, justifyContent:"center", marginTop:10, width:82.8, borderRadius:7}} >
                <InputText
                    val={boxLength}
                    edit={true}
                    bgStyle={{height:38, borderRadius:7,}}
                    placeholder="inch"
                    removePadding={true}
                    onChangeText={txt => {
                      setBoxLength(txt);
                    }}
                  />
                </View> 
                
                </View>    


              </View>   
                  
             <View
          style={{
            paddingVertical: 10,
            // paddingHorizontal: 165,
            justifyContent: 'center',
            marginHorizontal:130
          }}>
          <Button
            buttonStyle={{borderRadius: 6, height:24,paddingHorizontal:20 }}
            title={'Done'}
            LIcon={false}
            LIconStyle={{marginLeft: 5}}
            RIcon={false}
            RIconStyle={{marginRight: 5}}
            onPress={() => {
              handleDone();
            }}
            disabled={false}
            loading={false}
          />
            </View>   
            
            </View>
            }
            <TouchableOpacity 
              onPress={()=> navigation.navigate("AllBoxesScreen", {})}
                
              style={{height:20,  alignItems:"flex-end" }}>
                <Text>see more</Text>
            </TouchableOpacity>
            <View
                style={{borderWidth: 1, borderColor: '#CCCCCC', marginBottom: 15}}
              /> 
            <View style={{height:179}}>
            {getBoxPackingPayload?.length <= 0 ? 
            <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>   
              <Text style={styles.emptyText}>No Box againt this order</Text> 
              </View>
              :  
              <FlatList
                data={getBoxPackingPayload}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item?.id}
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
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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
                  style={{height: 16, width: 16, }}
                />
              </TouchableOpacity>
            </View>


            <FlatList
              data={dropDown ? itemData?.itemInOrdersOutputDTOs : []}
              keyExtractor={item => item?.id}
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
            justifyContent: 'center',
            paddingHorizontal:16
          }}>
          <Button
            buttonStyle={{borderRadius: 10, }}
            title={'Mark order as Packed'}
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
  
  export default OrderPackedScreen;
  
  const styles = StyleSheet.create({
    emptyText:{ 
      alignSelf: 'center',
      color: 'black',
      fontSize:16,
      fontWeight:'700', 
      fontFamily:"Inter-Bold" 
    }
  });
  