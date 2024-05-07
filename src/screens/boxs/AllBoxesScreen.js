import { StyleSheet, Text, FlatList,View } from 'react-native'
import React from 'react'
import {getBoxPacking , getBoxPackingSelector }  from '../../redux/slice/getBoxPackingList';
import Header from '../../component/Header';
import { useSelector } from 'react-redux';
import LoadingPage from '../../component/LoadingPage';

const AllBoxesScreen = () => {
  const {getBoxPackingPayload , getBoxPackingFetching} = useSelector(getBoxPackingSelector)
  return (
    <View style={{flex:1, paddingHorizontal:20}}>

     {getBoxPackingFetching && 
       <LoadingPage /> 
     }  
     <Header Left={true} Text={'All Boxes'} Right={true} Back={false} />
      <View style={{flex:1,}}>
        {getBoxPackingPayload?.length <= 0 ? 
         <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>   
          <Text style={styles.emptyText}>No Box againt this order</Text> 
          </View>
         :
         <FlatList
            data={getBoxPackingPayload}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() => {
              return <View style={{borderWidth: 1, borderColor: '#CCCCCC'}} />;
            }}
            renderItem={({item, index}) => (
              <View
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingHorizontal: 5,
                  flexDirection: 'row',
                  height: 60,
                }}>
                <View style={{width: '30%'}}>
                  <Text
                    style={{
                      fontFamily: 'Inter-SemiBold',
                      fontSize: 14,
                      fontWeight: '600',
                      color: '#2591CA',
                    }}>
                    1 Box
                  </Text>
                </View>

                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      fontFamily: 'Inter-Medium',
                      fontSize: 10,
                      fontWeight: '500',
                      color: '#778B9D',
                    }}>
                    Height:
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Inter-Medium',
                      fontSize: 10,
                      fontWeight: '500',
                      marginLeft: 3,
                      color: '#2591CA',
                    }}>
                    {item?.height}
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      fontFamily: 'Inter-Medium',
                      fontSize: 10,
                      fontWeight: '500',
                      color: '#778B9D',
                    }}>
                    Weight:
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Inter-Medium',
                      fontSize: 10,
                      fontWeight: '500',
                      marginLeft: 3,
                      color: '#2591CA',
                    }}>
                    {item?.weight}
                  </Text>
                </View>
              </View>
            )}
          />    
        }
        </View>    
    </View>
   
  )
}

export default AllBoxesScreen

const styles = StyleSheet.create({

    emptyText:{ 
        alignSelf: 'center',
        color: 'black',
        fontSize:20,
        fontWeight:'700', 
        fontFamily:"Inter-Bold" 
      }

})