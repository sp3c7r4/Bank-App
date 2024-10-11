import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '../constants/Colors'

export default function ButtonGreen({text}) {
  return (
    <View>
        <View style={styles.buttonView}>
          <Text style={{fontFamily: 'outfit-bold'}}>{text}</Text>
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
    borderWidth: 4,
    borderRadius: 12,
    marginBottom: 10,
    backgroundColor: Colors.APPCOLOR,
    marginHorizontal: "3%"
  }
})