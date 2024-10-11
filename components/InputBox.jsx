import { View, Text, TextInput, StyleSheet, Image } from 'react-native'
import React from 'react'
import { Colors } from '../constants/Colors'

export default function InputBox({name, placeholder, image}) {
  return (
    <View style={{marginTop: 10}}>
      <Text style={{
          fontFamily: "outfit-bold"}}>{name}</Text>
    <View style={{display: "flex", flexDirection: "row"}}>
      <View style={styles.inputStyle}>
        <TextInput style={{
          fontFamily: "outfit-bold",
          marginLeft: 13,
          fontSize: 10
        }} placeholder={placeholder ? placeholder : name}/>
      </View>
      <View style={{display: "flex", alignItems: "center",
        justifyContent: "center", width: 40, height: 40, 
        backgroundColor: Colors.APPCOLOR, borderRadius: 10, marginLeft: -20}}>
      <Image style={{width: 19, height: 23}} resizeMode='contain' source={image}/>
      </View>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
  inputStyle: {
    paddingVertical: 5, 
    height: 40,
    width: 136,
    backgroundColor: Colors.INPUTBOX, 
    borderWidth: 2, 
    borderColor: Colors.BOXOUTLINE,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  }
})