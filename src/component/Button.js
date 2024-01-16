import React from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import {COLORS} from '../constants';
const Button = props => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: "#2591CA",
          justifyContent: 'center',
          height:55,
          marginBottom: 10,
          ...props.buttonStyle,
        },
      ]}
      disabled={props?.loading ? props?.loading : props.disabled}
      onPress={() => props.onPress()}>
      {props?.loading ? null : (
        <View style={{...props.RIconStyle}}>{props.RIcon}</View>
      )}
      <View>
        {props.loading ? (
          <ActivityIndicator size="large" color="#FFFFFF" />
        ) : (
          <Text
            style={{
              fontSize: props?.title ==  'Done'? 10:  16,
              fontFamily:props?.title ==  'Done'? 'Inter-Medium' :  'Inter-Bold',
              color: COLORS.white,
              alignSelf: 'center',
            }}>
            {props.title}
          </Text>
        )}
      </View>
      {props?.loading ? null : (
        <View style={{...props.LIconStyle}}>{props.LIcon}</View>
      )}
    </TouchableOpacity>
  );
};

export default Button;
