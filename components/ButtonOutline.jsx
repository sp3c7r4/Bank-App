import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '../constants/Colors'

export default function ButtonOutline({text}) {
  return (
    <View>
        <View style={styles.buttonView}>
          <Text style={{fontFamily: 'outfit-bold', color: "#fff"}}>{text}</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonView: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 12,
    marginBottom: 10,
    // backgroundColor: Colors.APPCOLOR,
    marginHorizontal: "3%"
  }
})