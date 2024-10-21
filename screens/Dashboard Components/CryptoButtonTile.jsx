import { View, Text, StyleSheet, Pressable, TextInput, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Colors } from '../../constants/Colors'

export default function CryptoButtonTile({buttonSwapMode}) {
  const [toggle, setToggle] = useState('swap')
  
  // console.log(buttonSwapMode)
  useEffect(() => {
    if (buttonSwapMode !== undefined) {
      setToggle(buttonSwapMode);
    }
  }, [buttonSwapMode]);
  
  const switchToggle = (mode) => {
    mode === 'swap' ? setToggle('swap') : setToggle('P2P')
    // console.log(toggle)
  }
  // console.log(toggle)


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
        {/*P2P Button */}
        <Pressable onPress={() => switchToggle('P2P')}>
          {toggle === 'P2P' 
          ? 
          <View  style={styles.toggleBox}>
          <Text style={{fontFamily: "outfit-bold"}}>P2P</Text>
        </View> 
        : 
        <View style={[styles.toggleBox, {backgroundColor: "transparent"}]}>
        <Text style={{fontFamily: "outfit-bold", color: "#fff"}}>P2P</Text>
      </View>
        }
          
        </Pressable>
      </View>
      </View>
      {/*End P2P Button */}
      {/*End Toggle*/}

      {/*Swap Screen*/}
      <View>
        {toggle === 'swap' ? 
        <>
        <View style={{marginHorizontal: 20}}>
          <View style={{flexDirection: "row", marginVertical: 20}}>
            <View style={{
              width: "30%",
              height: 50, 
              borderRadius: 16, 
              position: "absolute", 
              zIndex: 2, 
              backgroundColor: Colors.APPDARKCOLOR,
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
              <View style={{position: "absolute", zIndex: 3, right: 10}}>
                <Image style={{width: 45, height: 45,}} resizeMode='contain' source={require('./../../assets/images/swap_crypto_black.png')}/>
              </View>
          </View>
          <View style={{flexDirection: "row", marginVertical: 40}}>
            <View style={{
              width: "30%",
              height: 50, 
              borderRadius: 16, 
              position: "absolute", 
              zIndex: 2, 
              backgroundColor: Colors.APPDARKCOLOR,
              alignItems: "center",
              justifyContent: "center"
              }}>
              <Text style={{fontFamily: "outfit-bold", color: "#fff", fontSize: 20}}>BTC</Text>
            </View>
              <View style={{
              width: "100%", 
              height: 50, 
              borderRadius: 16, 
              position: "absolute", 
              zIndex: 1, 
              backgroundColor: Colors.BOXOUTLINE,
              justifyContent: "center",
              paddingLeft: 120,
              }}>
              <TextInput placeholder='Enter a value...' style={{fontFamily: "outfit-bold", color: "#000", opacity: 0.5}}/>
              </View>
          </View>
          
        </View>
        {/* End of swap Screen*/}
        </>
        : <View style={{marginHorizontal: "5%", marginTop: 10}}>
            <Text style={{textAlign: "center", fontFamily: "outfit-bold", fontSize: 10}}>
            Customer Care Contact Information
            <Text>{"Contact custtomer care support. Please choose one of the following options to get in touch: \n"}</Text>
<Text style={{color: Colors.APPCOLOR}}> Email Support:</Text>{" support@yourbank.com \nWe strive to respond within 24 hours."}

<Text>{`Zangi Cha Support:
Prefer instant assistance? Chat with us on Zangi!
Simply open the Zangi app and search for our customer care contact:
YourBank Support
We’re available from 8 AM to 8 PM (local time) for real-time assistance.

Thank you for choosing us, and we look forward to helping you!`}</Text>
</Text>
            
          </View>}
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
    paddingHorizontal: 59.5,
    borderRadius: 8
    // width: "50%"
  }
})