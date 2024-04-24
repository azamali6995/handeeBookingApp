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
  import React, { useEffect, useState } from 'react';
  import Header from '../../component/Header';
  import Button from '../../component/Button';
  import { useSelector , useDispatch } from 'react-redux';
  import { markAsPicked } from '../../redux/slice/markAsPickedSlice';
  import Checkbox from '../../component/Checkbox';
  import { useFocusEffect } from '@react-navigation/native';

 
  const OrderPickerScreen = (props) => {
    const {navigation, route} = props
    const {qrScanningCount} = useSelector(state => state?.ScanningCount);
    console.log("qrScanningCount234234234", qrScanningCount.length)

    const dispatch = useDispatch();
    const [dropDown, setDropDown] = useState(true) 
    const [itemData, setItemData] = useState({})
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const [isChecked, setChecked] = useState(false);
    const [ScanData, setScanData] = useState([])
    const [btnEnable, setBtnEnable] = useState(false)


    useEffect(()=>{ 
      setItemData(props?.route?.params?.item)
    },[])

    useFocusEffect(
      React.useCallback(() => {
        if (itemData?.itemInOrderOutputDTOs?.length === qrScanningCount?.length) {
          setBtnEnable(true);
        } else {
          setBtnEnable(false);
        }
      }, [itemData, qrScanningCount])
    );


    const BoxData = [
      {
        Box1: '1 Box',
        Dimension: '64 x 64',
        Weight: '2.3kg',
      },
      {
        Box1: '1 Box',
        Dimension: '64 x 64',
        Weight: '2.3kg',
      },
      {
          Box1: '1 Box',
          Dimension: '64 x 64',
          Weight: '2.3kg',
        },
        {
          Box1: '1 Box',
          Dimension: '64 x 64',
          Weight: '2.3kg',
        },
        {
          Box1: '1 Box',
          Dimension: '64 x 64',
          Weight: '2.3kg',
        },
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
    //   setDropDown(!dropDown)
    props.navigation.navigate("QrScanner")
    }   
  
    const handleOrderAsShipped =()=>{
      let body ={
        pickingId : 0,
        orderId:0,
        pickerId:0,  
        isPicked: true,
        pickedDate:"2024-03-28T14:30:16.694Z",
        itemId:0
      }
      dispatch(markAsPicked(body))
    }
  
  

    return (
      <View style={{flex: 1, paddingHorizontal:16,}}>
        <StatusBar
          translucent={true}
          backgroundColor="black"
          barStyle={'dark-content'}
        />
        <Header Left={true} Text={'Orders Picker'} Right={true} Back={false} />
        <ScrollView 
        contentContainerStyle={{flexGrow: 1, paddingVertical:10}}
        showsVerticalScrollIndicator={false}
        >
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
  
          <View
              style={{borderWidth: 1, borderColor: '#CCCCCC', marginVertical:15}}
            />
            <View style={{flex:1}}>
            <View style={{flexDirection: 'row', marginBottom:10, justifyContent: 'space-between'}}>
              <Text
                style={{
                  fontFamily: 'Inter-Bold',
                  fontWeight: '700',
                  fontSize: 24,
                }}>
                Items
              </Text>
              <TouchableOpacity 
               style={{height:30, width:121, flexDirection:"row", justifyContent:"center", alignItems:"center", borderRadius:7, backgroundColor:"#2591CA" }}   
               onPress={()=>handlPress()}  >
                <Image
                  source={require('../../assets/images/scan.png')}
                  resizeMode='contain'
                  style={{height: 20, width: 20, tintColor : "white", marginRight:10 }} />
                <Text style={{fontFamily:'Inter-Regular', fontWeight:"400", color:'white', fontSize:10}}>Scanned Item</Text>
              </TouchableOpacity>
            </View>
  
                {/* {console.log("itemDatapackingBoxDetailOutputDTOs", itemData?.itemInOrderOutputDTOs)} */}
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
  
                      
                      <View style={{flexDirection: 'row',  alignItems:"center", marginVertical: 3}}>
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
                          {item?.shipOrder?.substring(0, 3) ?? "N/A"}
                        </Text>
                        <Text
                          style={{
                            fontFamily: 'Inter-Regular',
                            fontSize: 10,
                            color: '#778B9D',
                            marginLeft: 10,
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
                            marginLeft: 10,
                          }}>
                          Shelf NO:{' '}
                        </Text>
                        <Text
                          style={{
                            fontFamily: 'Inter-semibold',
                            fontSize: 10,
                            color: '#2591CA',
                          }}>
                          {item?.shipOrder?.substring(0, 3) ?? "N/A"}
                        </Text>
                        <View style={{marginLeft:15, }}>
                        <Checkbox
                          isChecked={isChecked}
                          onToggle={() => {
                            setChecked(!isChecked);
                          }}
                        />
                        </View>
                        
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
              )}/>     
            </View>
        </ScrollView>

        {btnEnable && 
        <View
          style={{
            paddingVertical: 10,
            paddingHorizontal: 16,
            justifyContent: 'center',
          }}>
          <Button
            buttonStyle={{borderRadius: 10}}
            title={'Mark order as Picked'}
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
        }
      </View>
    );
  };
  
  export default OrderPickerScreen;
  
  const styles = StyleSheet.create({});
  