import {StatusBar, StyleSheet, Text, View, FlatList, TouchableOpacity, Image} from 'react-native';
import React, {useState}  from 'react';
import Header from '../../component/Header';

import Translucent from '../../component/MainInputView';

const PendingOrderScreen = (props) => {

  const [selectedItem, setSelectedItem] = useState(null);  

  const Orders = [
    {
      orderNumber:122342342,
      customId: 2353324,
      date: '10/12/2022',
      status: 'fulfilment'
    },
    {
      orderNumber: 122342342,
      customId: 2353324,
      date: '10/12/2022',
      status: 'Packed'

    },
    {
      orderNumber: 122342342,
      customId: 2353324,
      date: '10/12/2022',
      status: 'Shipped'

    },
    {
      orderNumber: 122342342,
      customId: 2353324,
      date: '10/12/2022',
      status: 'Shipped Orders'

    },
    {
      orderNumber: 122342342,
      customId: 2353324,
      date: '10/12/2022',
      status: 'fulfilment'

    },
    {
      orderNumber: 122342342,
      customId: 2353324,
      date: '10/12/2022',
      status: 'Packed'

    },
    {
      orderNumber: 122342342,
      customId: 2353324,
      date: '10/12/2022',
      status: 'Shipped'

    },
  ];

  const handleSelectedItem = (item, index)=>{
    setSelectedItem(index)
    {item?.status == "Shipped" ? 
    props.navigation.navigate("OrderPackedScreen") :
    item?.status == "Packed" ? 
    props.navigation.navigate("OrderPickerScreen") 
    :
    props.navigation.navigate("OrderScreen") 
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
        data={Orders}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
            <TouchableOpacity
            onPress={() => {handleSelectedItem(item, index)}}>
            <View style={{ borderWidth:2,borderRadius:15, backgroundColor: selectedItem == index ? '#2591CA' : '#fff' ,  borderColor:"#2591CA", height:117, margin:6}}>
             <View style={{height:58, justifyContent:"center", paddingHorizontal:15}}>
             <Text style={{fontFamily:"Inter-Medium", fontSize:14, fontWeight:"500", color: selectedItem == index ? '#fff' : 'black' }}>Order Number:</Text>
              <Text style={{fontFamily:"Inter-Medium", fontSize:12, fontWeight:"500", color :selectedItem == index ? '#fff' : "#2591CA",  marginTop:5}}>{item?.orderNumber}</Text>
             </View>   
              
             <View style={{height:50, flexDirection:"row", marginBottom:10, justifyContent:'space-between', paddingHorizontal:15}}>
             <View>
                <Text style={{fontFamily:"Inter-Medium", fontSize:14, fontWeight:"500", color: selectedItem == index ? '#fff' : 'black'}}>Customer ID:</Text>
                <Text style={{fontFamily:"Inter-Medium", fontSize:12, fontWeight:"500", color:selectedItem == index ? '#fff' : "#2591CA", marginTop:5}}>{item?.orderNumber}</Text>
             </View>
               <Text style={{alignSelf:"center", color:selectedItem == index ? '#fff' : "#848484", fontFamily:"Inter-Regular", fontSize:12, fontWeight:"400",}}>{item?.date}</Text>
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
