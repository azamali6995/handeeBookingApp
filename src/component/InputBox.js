import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity,Image } from 'react-native'

const inputBox = (props) => {
    const[secureText, setSecureText]=useState(true)
    return (
        <View style={{ 
            backgroundColor: '#FFFFFF', 
            borderRadius: 30, 
            marginVertical:10,  
            height: 55, 
            flexDirection: 'row', 
            alignItems: 'center',
            justifyContent:"center", 
            marginBottom:10,borderWidth:1, ...props.bgStyle }}>
            <View style={{alignItems:"center", justifyContent:"center", paddingHorizontal:5}}>
            <TextInput
                style={{ flex: 1, fontSize: 15, fontFamily: 'Inter_Regular',  marginLeft: props.removePadding ? 0 : 15 }}
                secureTextEntry={props.RightIcon&& secureText}
                value={props.val}
                placeholder={props.placeholder}
                placeholderTextColor={"#9C9C9C"}
                editable={props.edit}
                keyboardType={props.keyboardType}
                autoCapitalize={props.autoCapitalize}
                autoCorrect={false}
                onChangeText={(txt) => handleonTextChange(txt)}
            />
            </View>
            
        </View>
    )

    function handleonTextChange(txt) {
        props.onChangeText(txt)
    }
}

export default inputBox


