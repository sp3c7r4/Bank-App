import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'

export default function IdentificationType() {
  return (
    <View>
      <View style={{width: "100%", 
    marginTop: 15, 
    backgroundColor: Colors.APPDARKCOLOR, 
    paddingHorizontal: 20, 
    paddingVertical: 10,
    marginHorizontal: 12,
    width: 'auto',
    borderRadius: 10,
    flexDirection: "row",
    gap: 27,
        }}>
      <View style={{gap: 2}}>
        <Text style={{color: Colors.APPCOLOR, fontFamily: "outfit-black"}}>Identification Verification
        </Text>
        <Text style={{color: "#fff", fontFamily: "outfit-medium"}}>ID's Passport Drivers-License SSN</Text>
        <Text style={{color: "#fff", fontFamily: "outfit-medium"}}>Get Started with us <Text style={{fontFamily: "outfit-bold"}}>Today!</Text></Text>
      </View>
      <View style={{}}>
        <Image source={require('./../../assets/images/upload.png')} style={{width: 70, height: 70}}/>
      </View>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({})