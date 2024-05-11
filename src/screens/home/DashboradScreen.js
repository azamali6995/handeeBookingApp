import { StyleSheet, Text, StatusBar, FlatList, Dimensions, TouchableOpacity, View, Image, ScrollView } from 'react-native'
import { FlatGrid, SectionGrid } from 'react-native-super-grid';
import { PieChart } from "react-native-chart-kit";
import React, { useEffect } from 'react'
import Header from '../../component/Header'
import { useSelector , useDispatch } from 'react-redux';
import { userLoginSelector } from '../../redux/slice/authSlice';
import { userPickerSelector } from '../../redux/slice/pickerSlice';
import { userPackerSelector } from '../../redux/slice/packerSlice';
import { userShipperSelector } from '../../redux/slice/shipperSlice';
import { dashboardStatus, dashboardStatusSelector } from '../../redux/slice/dashboradDetailStatus'
import { userPicker , } from '../../redux/slice/pickerSlice';
import { userPacker  } from '../../redux/slice/packerSlice';
import { userShipper } from '../../redux/slice/shipperSlice';

import PieChartScreen from './chart/PieChartScreen';
import BarChart from './chart/BarChart';
import LoadingPage from '../../component/LoadingPage';
import LocalStorage from '../../services/LocalStorage';


const DashboradScreen = (props) => {
  const dispatch = useDispatch();
  let Local = new LocalStorage()
  const { userLoginPayload, userLoginFetching } = useSelector(userLoginSelector)
  const { userPickerFetching,  } = useSelector(userPickerSelector)
  const { userPackerFetching  } = useSelector(userPackerSelector)
  const { userShipperFetching  } = useSelector(userShipperSelector)
  const { dashboardStatusPayload , dashboardStatusFetching } = useSelector(dashboardStatusSelector)

    useEffect(()=>{
        const handleGetUserInfo = async()=>{
           await Local.getSession(result => {
            result?.userInfo?.data?.rolesOutputDTO.map(item=>{
              if(item.roleId == 2 ){
                dispatch(userPicker())
                }else if(item.roleId == 3){
                  dispatch(userPacker())
                }else if(item.roleId == 4 ){
                  dispatch(userShipper())
                }
            })
        });
       }
       handleGetUserInfo()
    },[])

    useEffect(()=>{
      const dashboardStatusDetail = async()=>{
        dispatch(dashboardStatus())
     }
     dashboardStatusDetail()
  },[])

  const TotalOrder = [
    {
      packed: 'Orders Pending Fulfilment',
      count: dashboardStatusPayload?.pendingOrder || 0,
      id: 1,
    },
    {
      packed: 'Orders to be Packed',
      count: dashboardStatusPayload?.toBePacked || 0,
      id: 2,
    },
    {
      packed: 'Orders to be Shipped',
      count: dashboardStatusPayload?.toPeShipped || 0,
      id: 3,
    },
    {
      packed: 'Shipped Orders',
      count: dashboardStatusPayload?.shippedOrder || 0,
      id: 4,
    },
  ];

    
    const data = [
        { label: 'Jan', value: 500 },
        { label: 'Feb', value: 312 },
        { label: 'Mar', value: 424 },
        { label: 'Apr', value: 745 },
        { label: 'May', value: 89 },
        { label: 'Jun', value: 434 },
        { label: 'Jul', value: 650 },
        { label: 'Aug', value: 980 },
        { label: 'Sep', value: 123 },
        { label: 'Oct', value: 186 },
        { label: 'Nov', value: 689 },
        { label: 'Dec', value: 643 }
    ]

   
    const handleOrderScreen =(item)=>{
    
        // if(item?.id ==1){
        // props.navigation.navigate("PendingOrderScreen")
        // } else if(item?.id ==2){
        // props.navigation.navigate("PendingOrderScreen")
        // }else if(item?.id ==3){
        // props.navigation.navigate("PendingOrderScreen")    
        // }else {
        // props.navigation.navigate("PendingOrderScreen")    
        // }
      }
    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };  
     
  return (
    <View style={{flex: 1, paddingHorizontal:10}}>
    <StatusBar
      translucent={true}
      backgroundColor="black"
      barStyle={'dark-content'}
    />
    { dashboardStatusFetching || userPickerFetching || userPackerFetching || userShipperFetching  || dashboardStatusFetching ?
      <LoadingPage />
        :
        null
      }
    <View style={{paddingHorizontal:10}}>
     <Header Left={true} Text={'Dashborad'} Right={true} Back={false} customNavigation={props?.navigation} />
    </View>
    <ScrollView 
    showsVerticalScrollIndicator={false}
    contentContainerStyle = {{flexGrow:1, }}>
    <View style={{ paddingTop:10, }}>
    <FlatList
        data={TotalOrder}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        numColumns={2}
        renderItem={({item, index}) => (
        <View style={styles.item}>
               <View style={{flexDirection:"row", height:70, paddingTop:10 }}>
                  <View style={{width:"80%", }}>
                    <Text style={{fontFamily:"Inter-Medium", fontWeight:'500', fontSize:16, paddingHorizontal:7}}>
                        {item?.packed}
                    </Text>
                  </View> 

                  <View style={{height:30, width:30, alignItems:"center", justifyContent:"center", borderRadius:6, backgroundColor:"#2591CA"}}>
                    <Image source={require('../../assets/images/graph.png')} 
                        style={{height:14, width:14}}
                        resizeMode='contain'
                    />
                  </View>
               </View> 

               <View style={{height:70, width:"100%", justifyContent:"flex-end", paddingBottom:10, paddingHorizontal:16 }}>
                  <Text style={{fontFamily:'Inter-Regular', fontSize:20, fontWeight:"400"}}>
                    {item?.count}
                  </Text>  

                  <View style={{height:2, width:"100%", backgroundColor:"#A1BEE8", marginTop:10 }}> 
                    <View  style={{height:2, width:"76%", backgroundColor:"#2591CA"}} />
                  </View>  
                <View />
               </View> 

          </View>
        )}
     />

    </View>  

    <View style={{paddingHorizontal:10, paddingVertical:10}}>
      <Text
        style={{fontFamily: 'Inter-semiBold', color:"#000", fontWeight: '500', fontSize: 16}}>
         Orders
      </Text>
      <View style={{paddingHorizontal:15, marginBottom:10}}>
         <BarChart
          data={data} 
          round={100} 
          unit="€"
          chartConfig={chartConfig}

          />
      </View>    

        <View style={
          { 
            height: 216, 
            borderRadius: 10, 
            borderWidth: 4, 
            borderColor: "#ECECEC",
            alignItems:"center",
            justifyContent:"center"

            }}>
            <PieChartScreen />
     </View>
    </View>        
    </ScrollView> 

   
    </View>
  )
}

export default DashboradScreen

const styles = StyleSheet.create({

  item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
    height: "auto",
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
  }

})