import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TransactionsTileList from './TransactionsTileList'
import transactions from '../../transactions.json'
const {height, width} = Dimensions.get("window")
export default function TransactionTile() {
  return (
    <View style={styles.container}>
      <Text style={{paddingHorizontal: 15, fontFamily: "outfit-medium", fontSize: 13, paddingTop: 10}}>Recent Activities</Text>
      <FlatList showsVerticalScrollIndicator={false} data={transactions.slice(0,5)} renderItem={({item, index}) => {
          return (
          <TransactionsTileList type={item.transaction_type} amount={item.amount} 
          description={item.description} 
          merchant={item.merchant}
          asset={item.asset}
          time={item.timestamp}
          />
          )
        }} keyExtractor={item => item.timestamp} 
        ListFooterComponent={() => (
          <View style={{height: 50, backgroundColor: "#f0f2f5", alignItems: "center", justifyContent: "center"}}>
            <Text style={{fontFamily: "outfit-medium", fontSize: 15}}>View more</Text>
          </View>
        )}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: height * 0.3,
    marginTop: 15,
    marginBottom: 11,
    backgroundColor: "#f0f2f5",
    borderRadius: 10,
  }
})