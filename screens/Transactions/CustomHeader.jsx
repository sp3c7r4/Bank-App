import { View, Text, StatusBar,StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { Colors } from '../../constants/Colors'
import transactions from './../../transactions.json'



function getTotal(type) {
  let arrays = [];

  function addUp() {
    transactions.forEach((item) => {
      if (type === 'debit' && item.transaction_type === 'debit' && item.asset === 'USD') {
        arrays.push(item.amount);
      } else if (type === 'credit' && item.transaction_type === 'credit' && item.asset === 'USD') {
        arrays.push(item.amount);
      }
    });
  }

  addUp();

  let total = arrays.reduce((acc, item) => {
    return acc + item;
  }, 0); // Start accumulator at 0

  return total;
}
// console.log(getTotal('credit'))
// addUp(transactions)

export default function CustomHeader() {
  return (
    <View>
      <View style={styles.customHeader}>
        <StatusBar barStyle={"dark-content"} hidden={false} backgroundColor={"#fff"}/>
        <View>
          <Text style={{fontFamily: "outfit-bold", fontSize: 20}}>Transactions</Text>
          <View style={{flexDirection: "row", gap: 30, marginTop: 5}}>
          <Text style={styles.ongoingTransaction}>In: <Text style={{color: Colors.APPCOLOR, fontFamily: "outfit-bold", fontSize: 15}}>+</Text>{`$${getTotal('credit')}`}</Text>
          <Text style={[styles.ongoingTransaction, {position: "absolute", top: -3.5, left: 70}]}>Out: <Text style={{color: "red", fontFamily: "outfit-bold", fontSize: 18}}>-</Text>{`$${getTotal('debit')}`}</Text>
        </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  customHeader: {
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    paddingTop: StatusBar.currentHeight+10,
    marginBottom: 5,
    paddingBottom: 10,
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between"
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 50
  }, ongoingTransaction: {
    fontFamily: "outfit",
    fontSize: 13
  }
})