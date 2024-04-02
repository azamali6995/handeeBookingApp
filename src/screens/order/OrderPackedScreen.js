
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
  import InputText from '../../component/Input'
  import { COLORS } from '../../constants';
  
  const OrderPackedScreen = (props) => {

    const [dropDown, setDropDown] = useState(true) 
    const [itemData, setItemData] = useState({})
    const [boxWidth, setBoxWidth] = useState('') 
    const [boxheight, setBoxheight] = useState('') 
    const [boxWeight, setBoxWeight] = useState('') 




    useEffect(()=>{ 
      setItemData(props?.route?.params?.item)
    },[])

    console.log("PackerItemData", itemData)

    const BoxData = [
      {
        Box1: '1 Box',
        Dimension: '64 x 64',
        Weight: '2.3kg',
      },
    ];
  
    const ItemData = [
      {
        CandyBox: 'Candy Box',
        ItemNo: 1564,
        Qty: 20,
        ShipOrder: '20',
        BioNo: 'B/O No',
        SelfNo: 'Shel No',
      },
      {
        CandyBox: 'Candy Box',
        ItemNo: 1564,
        Qty: 20,
        ShipOrder: '20',
        BioNo: 'B/O No',
        SelfNo: 'Shel No',
      },
      {
        CandyBox: 'Candy Box',
        ItemNo: 1564,
        Qty: 20,
        ShipOrder: '20',
        BioNo: 'B/O No',
        SelfNo: 'Shel No',
      },
      {
        Box1: '1 Box',
        Dimension: '64 x 64',
        Weight: '2.3kg',
      },
    ];
  
    const handlPress =()=>{
      setDropDown(!dropDown)
    }   
  
    const handleOrderAsShipped =()=>{
      console.log('Add here')
    }

    const handleDone =()=>{
       console.log('Add here')
    }
  
    return (
      <View style={{flex: 1, paddingHorizontal:16,}}>
        <StatusBar
          translucent={true}
          backgroundColor="black"
          barStyle={'dark-content'}
        />
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
                 {itemData?.oldOrderNumber ?  itemData?.oldOrderNumber : "null" }
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
                 {itemData?.createdDate ? itemData?.createdDate : "null" }
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
                 {itemData?.customerId ?  itemData?.customerId : "null" }
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
                {itemData?.terms ?  itemData?.terms : "null" }
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
                {itemData?.via ?  itemData?.via : "null" }
               
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
                {itemData?.poNumber ?  itemData?.poNumber : "null" }
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
                {itemData?.shippedDate ? itemData?.shippedDate : "null" }
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
                {itemData?.toShippingAddress ? itemData?.toShippingAddress : "null" }
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
              <View style={{height:20,width:20, borderRadius:10, backgroundColor:"#2591CA",alignItems:"center", justifyContent:"center", marginLeft:5}}>
                <Image source={require('../../assets/images/plus.png')}
                    style={{height:11, width:11}}
                    resizeMode='contain'
                />
              </View>  
            </View>
            
            </View>
            
            <View
              style={{borderWidth: 1, borderColor: '#CCCCCC', marginTop: 15}}
            />
            
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
                <View style={{height:38, justifyContent:"center", marginTop:10, width:110, borderRadius:7}} >
                <InputText
                    val={boxWidth}
                    edit={true}
                    bgStyle={{height:38, borderRadius:7,}}
                    placeholder="64 inch"
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
                <View style={{height:38, justifyContent:"center", marginTop:10, width:110, borderRadius:7}} >
                <InputText
                    val={boxheight}
                    edit={true}
                    bgStyle={{height:38, borderRadius:7,}}
                    placeholder="64 inch"
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
                <View style={{height:38, justifyContent:"center", marginTop:10, width:110, borderRadius:7}} >
                <InputText
                    val={boxWeight}
                    edit={true}
                    bgStyle={{height:38, borderRadius:7,}}
                    placeholder="64 inch"
                    removePadding={true}
                    onChangeText={txt => {
                      setBoxWeight(txt);
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

        <View
            style={{borderWidth: 1, borderColor: '#CCCCCC', marginBottom: 15}}
          />  
        <View style={{}}>
        <FlatList
            data={BoxData}
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
                <View style={{width: '30%'}}>
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

                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      fontFamily: 'Inter-Medium',
                      fontSize: 10,
                      fontWeight: '500',
                      color: '#778B9D',
                    }}>
                    Dimension:
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Inter-Medium',
                      fontSize: 10,
                      fontWeight: '500',
                      marginLeft: 3,
                      color: '#2591CA',
                    }}>
                    {item?.Dimension}
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
                    Dimension:
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Inter-Medium',
                      fontSize: 10,
                      fontWeight: '500',
                      marginLeft: 3,
                      color: '#2591CA',
                    }}>
                    {item?.Weight}
                  </Text>
                </View>
              </View>
            )}
          />
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
              data={ dropDown ? itemData?.itemInOrderOutputDTOs : []}
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
                      <View style={{flexDirection: 'row', marginVertical:3}}>
                        <Text
                          style={{
                            fontFamily: 'Inter-semiBold',
                            fontSize: 14,
                            color: '#2591CA',
                          }}>
                          Candy Box{' '}
                        </Text>
                        <Text
                          style={{
                            fontFamily: 'Inter-Regular',
                            fontSize: 10,
                            marginTop: 2,
                            color: '#778B9D',
                          }}>
                          (Scannaed Item 3){' '}
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
                          }}>
                          Ship order:{' '}
                        </Text>
                        <Text
                          style={{
                            fontFamily: 'Inter-semibold',
                            fontSize: 10,
                            color: '#2591CA',
                          }}>
                          {item?.shipOrder ?? "N/A" }
                        </Text>
                        <Text
                          style={{
                            fontFamily: 'Inter-Regular',
                            fontSize: 10,
                            color: '#778B9D',
                            marginLeft: 15,
                          }}>
                          B/O NO:{' '}
                        </Text>
                        <Text
                          style={{
                            fontFamily: 'Inter-semibold',
                            fontSize: 10,
                            color: '#2591CA',
                          }}>
                          {item?.boNumber ?? "N/A" }
                        </Text>
                        <Text
                          style={{
                            fontFamily: 'Inter-Regular',
                            fontSize: 10,
                            color: '#778B9D',
                            marginLeft: 15,
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
                  <View style={{marginVertical: 5}}>
                    <Text
                      style={{
                        fontFamily: 'Inter-Regular',
                        fontSize: 12,
                        color: '#ABACAC',
                      }}>
                      {item?.description ?? "N/A" }
                    </Text>
                  </View>
  
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      source={require('../../assets/images/location.png')}
                      resizeMode="contain"
                      style={{height: 14, width: 14}}
                    />
                    {/* <Text
                      style={{
                        fontFamily: 'Inter-Regular',
                        fontSize: 12,
                        color: '#778B9D',
                      }}>
                      Lorem Ipsum is simply dummy text of the printing.
                    </Text> */}
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
  
  export default OrderPackedScreen;
  
  const styles = StyleSheet.create({});
  