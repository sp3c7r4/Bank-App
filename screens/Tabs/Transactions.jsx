import { Dimensions, StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import CustomHeader from "../Transactions/CustomHeader";
import TransactionsTile from "../Transactions/TransactionsTile";
import transactions from "./../../transactions.json";

// console.log(transactions)
const { width } = Dimensions.get("window");
// console.log(transactions);
// console.log(width)
export default function Transactions() {
  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <CustomHeader />
      <View style={{}}>
        <FlatList
          data={transactions}
          renderItem={({ item, index }) => {
            // console.log(index);
            return (
              <TransactionsTile
                type={item.transaction_type}
                amount={item.amount}
                description={item.description}
                merchant={item.merchant}
                asset={item.asset}
                time={item.timestamp}
              />
            );
          }}
          keyExtractor={(item) => item.timestamp}
          ListFooterComponent={() => <View style={{ height: 100 }} />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
