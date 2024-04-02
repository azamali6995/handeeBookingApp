import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Checkbox = ({ isChecked, onToggle }) => {
  return (
    <TouchableOpacity onPress={onToggle}>
       {isChecked ? (
         <Icon name="checkbox-marked" size={20} color="#24B38A" />
       ) : (
         <Icon name="checkbox-blank-outline" size={20} color="#24B38A" />
       )}
     </TouchableOpacity>
  );
};

export default Checkbox;

