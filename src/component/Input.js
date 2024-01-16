import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity,Image } from 'react-native'

const Input = (props) => {
    const[secureText, setSecureText]=useState(true)
    return (
        <View style={{ backgroundColor: '#FFFFFF', borderRadius: 30, marginVertical:10,  height: 55, flexDirection: 'row', alignItems: 'center',marginBottom:10,borderWidth:1, ...props.bgStyle }}>
            <View style={{ marginLeft: 12,alignItems:'center',justifyContent:'center', ...props.leftIconStyle }}>
             <Image source={props.LeftIcon} style={{ height: 16, width: 16 }} />
            </View>

            <TextInput
                style={{ flex: 1, fontSize: 15, fontFamily: 'Inter_Regular',  marginLeft: 15 }}
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
            <TouchableOpacity style={{ marginRight: 12,...props.rightIconStyle }} onPress={()=>{setSecureText(!secureText)}}>
            <Image source={props.RightIcon} style={{ height: 25, width: 25 }} />
            </TouchableOpacity>

        </View>
    )

    function handleonTextChange(txt) {
        props.onChangeText(txt)
    }
}

export default Input


