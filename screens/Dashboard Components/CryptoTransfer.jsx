import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../constants/Colors'

export default function CryptoTransfer() {
  const [toggle, setToggle] = useState('swap')
  
  const switchToggle = (mode) => {
    mode === 'swap' ? setToggle('swap') : setToggle('withdraw')
    // console.log(toggle)
  }
  console.log(toggle)


  return (
    <View >
      {/*Toggle*/}
      <View style={{alignItems: "center"}}>
      <View style={[styles.switchBar]}>
      <Pressable onPress={() => switchToggle('swap')}>
      {toggle === 'swap' ? 
      <View style={styles.toggleBox}>
          <Text style={{fontFamily: "outfit-bold",}}>Swap</Text>
        </View> : 
        <View style={[styles.toggleBox, {backgroundColor: "transparent"}]}>
        <Text style={{fontFamily: "outfit-bold", color: "#fff"}}>Swap</Text>
      </View>
        }
      </Pressable>
        {/*Withdraw Button */}
        <Pressable onPress={() => switchToggle('withdraw')}>
          {toggle === 'withdraw' 
          ? 
          <View  style={styles.toggleBox}>
          <Text style={{fontFamily: "outfit-bold"}}>Withdraw</Text>
        </View> 
        : 
        <View style={[styles.toggleBox, {backgroundColor: "transparent"}]}>
        <Text style={{fontFamily: "outfit-bold", color: "#fff"}}>Withdraw</Text>
      </View>
        }
          
        </Pressable>
      </View>
      </View>
      {/*End Withdraw Button */}
      {/*End Toggle*/}

      {/*Swap Screen*/}
      <View>
        {toggle === 'swap' ? 
        <>
        <View style={{marginHorizontal: 20}}>
          <View style={{flexDirection: "row", marginTop: 10}}>
            <View style={{
              width: "30%",
              height: 50, 
              borderRadius: 16, 
              position: "absolute", 
              zIndex: 2, 
              backgroundColor: Colors.APPCOLOR,
              alignItems: "center",
              justifyContent: "center"
              }}>
              <Text style={{fontFamily: "outfit-bold", color: "#fff", fontSize: 20}}>USD</Text>
            </View>
              <View style={{
              width: "80%", 
              height: 50, 
              borderRadius: 16, 
              position: "absolute", 
              zIndex: 1, 
              backgroundColor: Colors.BOXOUTLINE,
              justifyContent: "center",
              paddingLeft: 120,
              }}>
              <TextInput placeholder='Enter an amount...' style={{fontFamily: "outfit-bold", color: "#000", opacity: 0.5}}/>
              </View>
          </View>
        </View>
        {/* End of swap Screen*/}
        </>
        : <Text>"Hello"</Text>}
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center"
  }, switchBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    borderRadius: 12,
    width: "90%",
    height: 50,
    backgroundColor: Colors.APPDARKCOLOR
  }, toggleBox: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    height: "70%",
    paddingHorizontal: 50,
    borderRadius: 10
    // width: "50%"
  }
})