import { View, Text, TextInput, StyleSheet, Image } from 'react-native'
import React from 'react'
import { Colors } from '../constants/Colors'

export default function LoginInputBox({name, placeholder, image}) {
  
  return (
    <View style={{marginTop: 10}}>
      <Text style={{
          fontFamily: "outfit-black", fontSize: 15}}>{name}</Text>
    <View style={{display: "flex", flexDirection: "row"}}>
      <View style={styles.inputStyle}>
        <TextInput style={{
          fontFamily: "outfit-bold",
          // textAlign: "center",
          color: Colors.BOXOUTLINE,
          opacity: 0.4,
          marginLeft: 13,
          fontSize: 20,
          // opacity: 0.6
        }} placeholder={placeholder ? placeholder : name}/>
      </View>
      <View style={{display: "flex", alignItems: "center",
        justifyContent: "center", width: 60, height: 60, 
        backgroundColor: Colors.APPCOLOR, borderRadius: 10, marginLeft: -20}}>
      <Image style={{width: 30, height: 30}} resizeMode='contain' source={image}/>
      </View>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
  inputStyle: {
    display: "flex",
    justifyContent: "center",
    paddingVertical: 5, 
    height: 60,
    width: "85%",
    backgroundColor: Colors.INPUTBOX, 
    borderWidth: 2, 
    borderColor: Colors.BOXOUTLINE,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  }
})