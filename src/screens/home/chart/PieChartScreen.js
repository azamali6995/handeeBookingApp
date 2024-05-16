import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PieChart from 'react-native-pie-chart';
import { graphStaticsSelector } from '../../../redux/slice/graphStatics';
import { useSelector } from 'react-redux';


const PieChartScreen = () => {
  const widthAndHeight = 160;
  const sliceColor = ['#FF0000', '#19E6F2', '#C735F6',];
  const [chartData, setChartData] = useState([10,10,10])
  const { graphStaticsFetching, graphStaticsPayload } = useSelector(graphStaticsSelector)

  console.log("graphStaticsPayload", graphStaticsPayload)

  useEffect(() => {
    if(graphStaticsPayload){
      const { delieveredOrders, inProcessOrders, pendingOrders } = graphStaticsPayload;
      setChartData([delieveredOrders, pendingOrders, inProcessOrders]);
    }
  }, [graphStaticsPayload]);


  const sliceColorTem = [
    {
      color: '#FF0000',
      order: 'Delievered Orders',
    },
    {
      color: '#19E6F2',
      order: 'Pending Orders',
    },
    {
      color: '#C735F6',
      order: 'InProcess Orders',
    },
   
  ];

  const total = chartData.reduce((acc, value) => acc + value, 0);

  return (
    <View style={styles.container}>
      {/* <View style={{height:35, alignItems:"flex-start"}}> */}
        <Text style={{ fontWeight: '500', paddingLeft:10, paddingVertical: 10, fontFamily: 'Inter-Medium', fontSize: 16,  }}>
          Order graph
        </Text>
      {/* </View> */}

      <View style={{ flexDirection: 'row', justifyContent: 'center', paddingHorizontal: 10 }}>
        <View style={styles.percentageContainer}>
          {chartData.map((value, index) => (
            <View style={{ flexDirection: 'row',marginTop:15 }} key={index}>
              <View style={{ height: 20, width: 20, marginRight: 10, borderRadius: 2, backgroundColor: sliceColor[index] }} />
              <Text style={{ fontWeight: '500', fontFamily: 'Inter-Medium', fontSize: 12 }}>{`${sliceColorTem[index].order}`}</Text>
            </View>
          ))}
        </View>
        <View style={{ width: '50%', alignItems: "flex-end", justifyContent: "flex-end", paddingVertical: 15 }}>
          <PieChart
            widthAndHeight={widthAndHeight}
            series={chartData}
            sliceColor={sliceColor}
            coverRadius={0.6}
            coverFill={'#FFF'}
            sliceLabels={sliceColorTem.map((item) => item.order)}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
  },
  percentageContainer: {
    width: '50%',
    // alignItems: 'flex-start',
    marginTop:15
    // justifyContent: 'space-around',
  },
  title: {
    fontSize: 24,
    margin: 10,
  },
});

export default PieChartScreen;
