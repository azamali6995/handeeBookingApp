import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import BouncyCheckbox from "react-native-bouncy-checkbox";

const Checkbox = ({ isChecked, onToggle }) => {
  return (
  <BouncyCheckbox
  size={20}
  fillColor="#3DD617"
  unFillColor="#FFFFFF"
  iconStyle={{ borderColor: "#3DD617" }}
  innerIconStyle={{ borderWidth: 1 }}
  textStyle={{ fontFamily: "JosefinSans-Regular" }}
  onPress={(isChecked: boolean) => {console.log(isChecked)}}
/>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    borderRadius: 10,
    backgroundColor:"pink"
  },
});

export default Checkbox;
