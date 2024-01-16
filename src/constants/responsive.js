import {
    Dimensions
  } from 'react-native';
  
  const { height, width } = Dimensions.get('window');
  
  const actualDimensions =  {
    height:  (height<width) ? width : height,
    width: (width>height) ? height : width
  };
  export const responsiveHeight = (h) => {
    return actualDimensions.height * (h / 100);
  };
  
  export const responsiveWidth = (w) => {
    return actualDimensions.width * (w / 100);
  };
  
  export const responsiveFontSize = (f) => {
    const tempHeight = (16 / 9) *actualDimensions.width;
    return Math.sqrt(Math.pow(tempHeight, 2) + Math.pow(actualDimensions.width, 2)) * (f / 100);
  };