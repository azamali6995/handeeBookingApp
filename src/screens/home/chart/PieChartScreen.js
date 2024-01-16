import React, {Component} from 'react';
import {StyleSheet, ScrollView, Text, View} from 'react-native';
import PieChart from 'react-native-pie-chart';

export default class PieChartScreen extends Component {
  render() {
    const widthAndHeight = 160;
    const series = [789, 321, 123, 640, 537];
    const sliceColor = ['#FF0000', '#19E6F2', '#C735F6', '#FFBD42', '#75D260'];

    const sliceColorTem = [
      {
        color:'#FF0000',
        order:'Rejected Order'
      },
      {
        color:'#19E6F2',
        order:'Pending Order'
      },
      {
        color:'#C735F6',
        order:'Deliver Order'
      },
      {
        color:'#FFBD42',
        order:'In process Order'
      },
      {
        color:'#75D260',
        order:'Pending Order'
      },

    ]

    const total = series.reduce((acc, value) => acc + value, 0);

    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row',  justifyContent:"center",  paddingHorizontal:20,  }}>
          <View style={styles.percentageContainer}>
            <Text style={{fontWeight:"500", paddingVertical:10, fontFamily:"Inter-Medium", fontSize:16}}>Order graph</Text>
            {series.map((value, index) => (
              <View style ={{flexDirection:"row"}}>
                <View style={{height:20, width:20, marginRight:10, borderRadius:2, backgroundColor:sliceColor[index]}} />
                <Text style={{fontWeight:"500", fontFamily:"Inter-Medium", fontSize:12}}>{`${sliceColorTem[index].order}`}</Text>
              </View>  
            ))}
          </View>
          <View style={{width:"50%", alignItems:"center", justifyContent:"center", paddingVertical:15}}>
            <PieChart
              widthAndHeight={widthAndHeight}
              series={series}
              sliceColor={sliceColor}
              coverRadius={0.6}
              coverFill={'#FFF'}
              sliceLabels={sliceColorTem.map((item) => item.order)}
            />
          </View>    
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  percentageContainer: {
    width:"50%",
    alignItems:"flex-start",
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 24,
    margin: 10,
  },
});
