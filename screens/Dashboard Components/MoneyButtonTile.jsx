import { View, Text, StyleSheet, Pressable, TextInput, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Colors } from '../../constants/Colors'
import { useNavigation } from '@react-navigation/native'

export default function MoneyButtonTile({buttonSwapMode, onPressTransferToBank, onPressTransferToMontreal}) {
  const [toggle, setToggle] = useState('transfer')
  const navigation = useNavigation()
  
  const navigateToTransferScreen = () => {
    navigation.navigate("ToBank")
  }
  // console.log(buttonSwapMode)
  useEffect(() => {
    if (buttonSwapMode !== undefined) {
      setToggle(buttonSwapMode);
    }
  }, [buttonSwapMode]);
  
  const switchToggle = (mode) => {
    mode === 'transfer' ? setToggle('transfer') : setToggle('withdraw')
    // console.log(toggle)
  }
  // console.log(toggle)


  return (
    <View >
      {/*Toggle*/}
      <View style={{alignItems: "center"}}>
      <View style={[styles.switchBar]}>
      <Pressable onPress={() => switchToggle('transfer')}>
      {toggle === 'transfer' ? 
      <View style={styles.toggleBox}>
          <Text style={{fontFamily: "outfit-bold",}}>Transfer</Text>
        </View> : 
        <View style={[styles.toggleBox, {backgroundColor: "transparent"}]}>
        <Text style={{fontFamily: "outfit-bold", color: "#fff"}}>Transfer</Text>
      </View>
        }
      </Pressable>
        {/*withdraw Button */}
        <Pressable onPress={() => switchToggle('withdraw')}>
          {toggle === 'withdraw' 
          ? 
          <View  style={styles.toggleBox}>
          <Text style={{fontFamily: "outfit-bold"}}>withdraw</Text>
        </View> 
        : 
        <View style={[styles.toggleBox, {backgroundColor: "transparent"}]}>
        <Text style={{fontFamily: "outfit-bold", color: "#fff"}}>withdraw</Text>
      </View>
        }
          
        </Pressable>
      </View>
      </View>
      {/*End withdraw Button */}
      {/*End Toggle*/}

      {/*transfer Screen*/}
      <View>
        {toggle === 'transfer' ? 
        <>
        <View style={{flexDirection: "row", justifyContent: "space-around"}}>
          <TouchableOpacity onPress={() => {
            navigateToTransferScreen();
            (() =>console.log(onPressTransferToMontreal))()
            }}>
            <View style={{marginTop: 30, alignItems: "center"}}>
              <View style={{marginHorizontal: "5%", backgroundColor: Colors.BOXOUTLINE, height: 100, width: 100, borderRadius: 15, alignItems: "center", justifyContent: "center"}}>
                <Image style={{width: 100, height: 100, borderRadius: 10}} source={require('./../../assets/images/to_montreal.png')}/>
              </View>
              <Text style={{color: Colors.APPDARKCOLOR, fontSize: 15, fontFamily: "outfit-bold", marginTop: 5}}>To Montreal</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigateToTransferScreen()}>
            <View style={{marginTop: 30, alignItems: "center"}}>
              <View style={{marginHorizontal: "5%", backgroundColor: Colors.BOXOUTLINE, height: 100, width: 100, borderRadius: 15, alignItems: "center", justifyContent: "center"}}>
                <Image style={{width: 100, height: 100, borderRadius: 10}} source={require('./../../assets/images/to_bank.png')}/>
              </View>
              <Text style={{color: Colors.APPDARKCOLOR, fontSize: 15, fontFamily: "outfit-bold", marginTop: 5}}>To Bank</Text>
              </View>
          </TouchableOpacity>
        </View>
        {/* End of transfer Screen*/}
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
    paddingHorizontal: 45,
    borderRadius: 8
    // width: "50%"
  }
})