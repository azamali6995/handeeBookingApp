import React, { useEffect, useState } from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import { useSelector  } from 'react-redux';
import { userLoginSelector } from '../redux/slice/authSlice';
import LocalStorage from '../services/LocalStorage';


const DrawerItems = (props) => {
  const {navigation, } = props
  let Local = new LocalStorage()
  const [showDropdown, setShowDropdown] = useState(false);
  const [userId, setUserId] = useState(1)
  const [userInformation, setUserInformation] = useState([])
  const [roleData, setRoleData] = useState([])

  useEffect(()=>{
    const handleGetUserInfo = async()=>{
       await Local.getSession(result => {
        setUserInformation(result?.userInfo)
        let SortAccordingRoleId = result.userInfo?.data?.rolesOutputDTO?.sort((a, b)=> a.roleId - b.roleId) 
        setRoleData(SortAccordingRoleId)  
    });
   }
   handleGetUserInfo()
  },[navigation])

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const handlePicker =(item)=>{
    navigation.closeDrawer()
    navigation.navigate("PendingOrderScreen", {pickerData : item})
  }
  const handleShipped =(item)=>{
    navigation.closeDrawer()
    navigation.navigate("PendingOrderScreen", {shippedData : item})
  }
  const handlePacker =(item)=>{
    navigation.closeDrawer()
    navigation.navigate("PendingOrderScreen", {packerData : item})
  }

  return props.drawerItems.map((data, key) => {
    return (
      <View
        key={key}
        style={{
          flex: 0.05,
          justifyContent: 'center',
          alignItems:"center"
        }}>
        <View style={{ flexDirection: 'row',  alignItems:"center" }}>
          <TouchableOpacity
            key={key}
            style={{ flex: 1, flexDirection: 'row',}}
            onPress={() => {
              if (data?.title === 'Pending Order') {
                toggleDropdown();
              } else {
                props.onPress(data);
              }
            }}>
            <View style={{alignItems:"center",  flex: 0.2 }}>
              <Image resizeMode='contain' source={data.name} style={{ height: data.name == 3 ? 25 : 20, width: data.name == 3 ? 25 : 20 }} />
            </View>
            <View style={{ flex: 0.7, flexDirection: 'row',  colors: 'black' }}>
              <Text style={{ color: '#fff', fontSize: 20, fontWeight: '400', fontFamily: 'Inter-Regular' }}>
                {data?.title}
              </Text>
            </View>
          </TouchableOpacity>
          <View style={{width:20, marginRight:10 }}>
          {data?.title === 'Pending Order' && (
            <TouchableOpacity style={{  }} onPress={toggleDropdown}>
              <Image
                source={require('../assets/images/drawerdown.png')}
                style={{ width: 11, height: 7 }}
                resizeMode='contain'
              />
            </TouchableOpacity>
          )}
          </View>
          
        </View>
        {data?.title === 'Pending Order' && showDropdown && (
          <View style={{flexDirection: 'column', alignItems:"center", marginRight:28}}>
          {roleData?.map(item =>{
                return(
            item?.roleId == 2 ?  
            <TouchableOpacity style={{marginTop:10, height:40, justifyContent:"center",}} onPress={() => {handlePicker(item)} }>
              <Text style={{ color: '#fff' }}>Orders to be Picked</Text>
            </TouchableOpacity>
            
            :
            item?.roleId == 3 ? 
            <TouchableOpacity style={{marginTop:10, height:40, justifyContent:"center",}} onPress={() => {handlePacker(item)}}>
              <Text style={{ color: '#fff' }}>Orders to be Packed</Text>
            </TouchableOpacity>
            :
            item?.roleId == 4 &&
            <TouchableOpacity style={{marginTop:10, height:40, justifyContent:"center",}} onPress={() => {handleShipped(item)}}>
              <Text style={{ color: '#fff' }}>Orders to be Shipped</Text>
            </TouchableOpacity>

                )
            })}
          </View>
        )}
      </View>
    );
  });
};

export default DrawerItems;
