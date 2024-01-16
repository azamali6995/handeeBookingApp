import {StyleSheet, Text, View, Image,TouchableOpacity, Platform, TextInput} from 'react-native';
import React, {useState} from 'react';
import Button from '../../component/Button';
import {COLORS, icons} from '../../constants';
import TranslucentView from '../../component/MainInputView';
import InputText from '../../component/Input';
import CheckBox from '@react-native-community/checkbox';

const LoginScreen = (props) => {
  const [secureText, setSecureText] = useState(true);
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const handleLogin =()=>{
    console.log("Helooooooo")
    props.navigation.navigate("DashboradScreen")
  }
 
  return (
    <TranslucentView>
      <View
        style={{
          flex:0.6,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop:15
        }}>
        <Text
          style={{
            fontFamily: 'Inter_Bold',
            fontSize: 28,
            fontWeight: '700',
            color: '#00000',
          }}>
          Welcome Back!
        </Text>
        <Text
          style={{
            fontFamily: 'Inter_',
            fontSize: 14,
            fontWeight: '400',
            color: '#7C7C7C',
            marginTop: 10,
          }}>
          Please login to continue
        </Text>
      </View>
      <View style={{}}>
        <InputText
          val={name}
          edit={true}
          keyboardType="email-address"
          LeftIcon={icons.Email_Icon}
          leftIconStyle={{backgroundColor: COLORS.white}}
          bgStyle={{marginHorizontal: 5}}
          placeholder="Email"
          onChangeText={txt => {
            setName(txt);
          }}
        />
        <InputText
          edit={true}
          val={pass}
          keyboardType="email-address"
          LeftIcon={icons.Password_Icon}
          leftIconStyle={{backgroundColor: COLORS.white}}
          bgStyle={{marginHorizontal: 5}}
          placeholder="Password"
          onChangeText={txt => {
            setPass(txt);
          }}
          RightIcon={false}
          rightIconStyle={{backgroundColor: COLORS.white}}
        />
        {/* <TextInput secureTextEntry={secureText}  style={{borderWidth:1,height:45}}/> */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop:5,
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row'}}>
            <CheckBox
              disabled={false}
              boxType={'square'}
              value={toggleCheckBox}
              onValueChange={newValue => setToggleCheckBox(newValue)}
              style={{width: 25, height: 16, marginRight: 10, paddingRight:10, marginLeft: 5}}
              onCheckColor={'#2591CA'}
              onTintColor={'#2591CA'}
            />

            <Text
              style={{
                alignSelf: 'flex-start',
                fontWeight: '500',
                fontSize: 14,
                fontFamily: 'Inter_Medium',
                color: '#7C7C7C',
              }}>
              Remember me?
            </Text>
          </View>

          <Text
            style={{
              alignSelf: 'flex-end',
              marginRight: 5,
              fontWeight: '500',
              fontSize: 14,
              fontFamily: 'Inter_Medium',
              color: '#2591CA',
            }}>
            Forgot Password?
          </Text>
        </View>

        <Button
          buttonStyle={{borderRadius: 30,
            marginTop: 50,
          }}
          title={'Login'}
          LIcon={false}
          LIconStyle={{marginLeft: 5}}
          RIcon={false}
          RIconStyle={{marginRight: 5}}
          onPress={() => {handleLogin()}}  
          disabled={false}
          loading={false}
        />
      </View>
      <View style={{flex: 0.5, alignItems:"center", justifyContent:"flex-end"}}>
        <Text style={{fontFamily:"Inter-Regular"}}>Or via social media</Text>

        <View style={{flexDirection:"row", alignItems:"center", marginTop:10}}>
         <TouchableOpacity style={{height:40, width:40,marginRight:10, borderRadius:20, backgroundColor:"#1877F2", alignItems:"center",justifyContent:"center"}}>
           <Image source={require('../../assets/images/facebook.png')} 
            style={{height:22, width:11,}}
           /> 
         </TouchableOpacity> 
         <TouchableOpacity style={{height:40, width:40,marginLeft:10, borderRadius:20, backgroundColor:"#E54545", alignItems:"center",justifyContent:"center"}}>
           <Image source={require('../../assets/images/gmail.png')} 
            style={{height:20, width:20,}}
           /> 
         </TouchableOpacity> 
      </View>
      </View>
      
      <View style={{flex:1,alignItems:"center", justifyContent:"center",}}>
          <View style={{flex:1,  }} />  
          <View style={{flex:0.6, flexDirection:"row", }}>
          <Text style={{color:"#9C9C9C", fontSize:14,fontWeight:"400", fontFamily:"Inter-Medium"}}>Don’t have an account?</Text> 
          <TouchableOpacity>
            <Text style={{fontSize:16, color:"#2591CA", fontWeight:700, marginLeft:10, fontFamily:"Inter-Bold"}}>Sign Up</Text>
          </TouchableOpacity>
          </View>  

      </View>
    </TranslucentView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
