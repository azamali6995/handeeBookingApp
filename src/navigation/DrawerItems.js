import React, {Component} from 'react';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

export default (DrawerItems = props => {
  return props.drawerItems.map((data, key) => {
    return (
      <View
        key={key}
        style={{
          flex: 0.05,
          justifyContent:"center",
        }}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            key={key}
            style={{
              flex: 1,
              flexDirection: 'row',
            }}
            onPress={() => props.onPress(data)}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flex: 0.2,
              }}>
                <Image resizeMode='contain' source={data.name} 
                 style={{height: data.name == 3 ? 25 : 20,width: data.name==3 ?25: 20}}/>
            </View>
            <View
              style={{
                flex: .7,
                flexDirection: 'row',
                alignItems: 'center',
                colors:"black"
              }}>
              <Text style={{color:"#fff", fontSize:20, fontWeight:"400", fontFamily:'Inter-Regular'}}>
                {data?.title}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{flex: 0.12, justifyContent:"center" }}>
             {data?.title == 'Pending Order' && 
            <Image  source={require('../assets/images/drawerdown.png')}
              style={{width:11, height:7}}
              resizeMode='contain'
            />  
             }
          </TouchableOpacity>    
        </View>
      </View>
    );
  });
});
