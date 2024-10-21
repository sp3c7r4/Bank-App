import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'

const {height} = Dimensions.get("window")

export default function BottomTile() {
  return (
    <View style={{ alignItems: "center",gap: 30, justifyContent: "center", flexDirection: "row", width: "100%", height: height * 0.1,borderRadius: 10, backgroundColor: Colors.APPDARKCOLOR}}>
      <View style={{padding: 5}}>
      <Text style={{color: Colors.APPCOLOR, fontFamily: "outfit-black", fontSize: 12}}>Create our premium virtual card</Text>
        <Text style={{color: "#fff", fontFamily: "outfit-medium", fontSize: 10}}>Direct Deposit - $500</Text>
        <Text style={{color: "#fff", fontFamily: "outfit-medium", fontSize: 10}}>Get Started with us <Text style={{fontFamily: "outfit-bold"}}>Today!</Text></Text>
      </View>
      <View>
        <Image style={{width: 50, height: 50, marginLeft: 3}} source={require('./../../assets/images/glow.png')} />
      </View>
      {/* <Text>BottomTile</Text> */}
    </View>
  )
}

const styles = StyleSheet.create({})