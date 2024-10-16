import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'

export default function TransactionTIle() {
  return (
    <View style={styles.container}>
      <Text>TransactionTIle</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 300,
    marginTop: 15,
    marginBottom: 11,
    backgroundColor: "#fff", 
    paddingHorizontal: 20, 
    paddingVertical: 10,
    borderRadius: 25,
    flexDirection: "row",
    gap: 48
  }
})