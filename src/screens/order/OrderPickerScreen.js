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
  import { pickedMarkByPickerList, pickedMarkByPickerListSelector } from '../../redux/slice/pickedMarkByPickerList';

  import Checkbox from '../../component/Checkbox';
  import { useFocusEffect } from '@react-navigation/native';
  import LoadingPage from '../../component/LoadingPage';
  import {Menu} from 'react-native-paper'

  const OrderPickerScreen = (props) => {
    const {navigation, route} = props
    const {qrScanningCount} = useSelector(state => state?.ScanningCount);

    const {pickedMarkByPickerListFetching, } = useSelector(pickedMarkByPickerListSelector)
    console.log("state", pickedMarkByPickerListFetching)


    const dispatch = useDispatch();
    const [dropDown, setDropDown] = useState(true) 
    const [itemData, setItemData] = useState({})
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const [isChecked, setChecked] = useState(false);
    const [btnEnable, setBtnEnable] = useState(false)
    const [outOfStockItem, setOutOfStockItem] = useState(null);
    const [visible, setVisible] = useState(false);
    const [openedMenuIndex, setOpenedMenuIndex] = useState(null);

    useEffect(()=>{ 
      setItemData(props?.route?.params?.item)
    },[])


    useFocusEffect(
      React.useCallback(() => {
        if(pickedMarkByPickerListFetching == true){
          navigation?.navigate("DashboradScreen")
        }
      }, [])
    );

    useFocusEffect(
      React.useCallback(() => {
        if (itemData?.itemInOrderOutputDTOs?.length === qrScanningCount?.length) {
          setBtnEnable(true);
        } else {
          setBtnEnable(false);
        }

        if(pickedMarkByPickerListFetching == true){
          navigation?.navigate("DashboradScreen")
        }  

      }, [itemData, qrScanningCount, pickedMarkByPickerListFetching])
    );
  
    const handleBoxScan =(item)=>{
    props.navigation.navigate("QrScanner")
    }
  
    const handlePickerList =()=>{
      let body ={
        "orderId": route.params?.item?.internalId,
        "pickerId": route.params?.item?.pickerId,
        "isPicked": true,
        "pickedDate": route.params?.item?.pickedDate,
        "itemListDTOs" : route.params?.item?.itemInOrderOutputDTOs?.map((singleItem)=>({
          "itemId": singleItem?.orderId,
          "quantityPicked": singleItem?.quantity
        }))
      }
      dispatch(pickedMarkByPickerList(body))
    }

    const handleOpenMenu = (index) => {
      setOpenedMenuIndex(index);
      setVisible(true);
    };

  const handleMenuClose = () => {
    setVisible(false);
  };
  const handleMenuItemPress = (action) => {
    // Perform action based on selected menu item
    if (action === 'delete') {
      // Perform delete action
    } else if (action === 'update') {
      // Perform update action
    }
    setVisible(false);
  };

 

    return (
      <View style={{flex: 1, paddingHorizontal:16,}}>
        <StatusBar
          translucent={true}
          backgroundColor="black"
          barStyle={'dark-content'}
        />
        {pickedMarkByPickerListFetching &&
            <LoadingPage />
          }
        <Header Left={true} Text={'Orders Picker'} Right={true} Back={false} />
        <ScrollView 
          contentContainerStyle = {{flexGrow :1, paddingVertical:10}}
          showsVerticalScrollIndicator = {false} >
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
                {itemData?.shippedDate ? itemData?.shippedDate?.substring(0,10): "N/A" }
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
  
          <View
              style={{borderWidth: 1, borderColor: '#CCCCCC', marginVertical:15}}
            />
            <View style={{flex:1}}>
            <View style={{flexDirection:'row', marginBottom :10, justifyContent: 'space-between'}}>
              <Text
                style={{
                  fontFamily: 'Inter-Bold',
                  fontWeight: '700',
                  fontSize: 24,
                }}>
                Items
              </Text>
              
            </View>
                {console.log("PickerItemslist", itemData)}
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
                      <View style={{alignItems:"center", flexDirection:"row", marginVertical:3}}>
                       <View style={{width:"60%"}}>
                       <Text
                        numberOfLines={2}
                        ellipsizeMode='tail'
                          style={{
                            fontFamily: 'Inter-semiBold',
                            fontSize: 12,
                            color: '#2591CA',
                          
                          }}>
                         {item?.description} 
                        </Text>
                       </View> 

                       <View style={{alignItems:"flex-end", paddingHorizontal:16, width:"30%",  }}>
                       <TouchableOpacity 
                          style={{height:30, paddingRight:8, paddingLeft:17, flexDirection:"row",  borderRadius:7, backgroundColor:"#2591CA", alignItems:"center", justifyContent:"center", }}   
                          onPress={()=>handleBoxScan(item)}  >
                            <Image
                              source={require('../../assets/images/scan.png')}
                              resizeMode='contain'
                              style={{height: 20, width: 20, tintColor : "white", marginRight:5 }} />
                            <Text style={{fontFamily:'Inter-Regular', fontWeight:"400", color:'white', fontSize:10}}>Scan</Text>
                          </TouchableOpacity>
                       </View>   
                        
                       
                      </View>
  
                      <View style={{flexDirection: 'row', marginVertical: 3}}>
                       <View style={{width:"75%",alignItems:"center", flexDirection:"row", }}>
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

                         <View style={{alignItems:"flex-end", justifyContent:"center", height:30, width:30 }}>
                          <Menu
                            visible={openedMenuIndex === index && visible}
                            onDismiss={handleMenuClose}
                            anchor={
                              <TouchableOpacity onPress={() => handleOpenMenu(index)}>
                                <Image source={require('../../assets/images/dots.png')} style={{height:20,width:20}} /> 
                              </TouchableOpacity>
                            }>
                            <Menu.Item onPress={() => handleMenuItemPress('delete')} title="Out of Stock" />
                          </Menu>
                          </View>                            
                      </View>
                      <View 
                       style={{
                        flexDirection: 'row', 
                        width:'90%', 
                        alignItems:"center", 
                        justifyContent:"space-between", 
                        marginVertical: 3}}
                        >
                       <View style={{flexDirection:"row"}}>
                       <Text
                          style={{
                            fontFamily: 'Inter-Regular',
                            fontSize: 10,
                            color: '#778B9D',
                          }}>
                          Shelf NO:{' '}
                        </Text>
                        <Text
                          style={{
                            fontFamily: 'Inter-semibold',
                            fontSize: 10,
                            color: '#2591CA',
                          }}>
                          {item?.shelfNumber?.substring(0, 3) ?? "N/A"}
                        </Text>
                      </View>   
                        
                       <View style={{alignItems:"flex-end"}}>
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
                </>
              )}/>     
            </View>
        </ScrollView>

        {/* {btnEnable &&  */}
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
              handlePickerList();
            }}
            disabled={false}
            loading={false}
          />
        </View>
        {/* } */}
      </View>
    );
  };
  
  export default OrderPickerScreen;
  
  const styles = StyleSheet.create({});
  