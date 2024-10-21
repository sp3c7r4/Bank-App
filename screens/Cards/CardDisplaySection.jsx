import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { Dimensions } from 'react-native';
import { Colors } from '../../constants/Colors';
import BottomTile from './BottomTile';

const { height, width } = Dimensions.get('window');

export default function CardDisplaySection() {
  return (
    <View style={{flex:1, alignItems: "center"}} >
      <View style={styles.cardDisplay}>
        <View style={{}}>
          <Text style={{fontFamily: "outfit-black", fontSize: 17}}>Virtual Card</Text>
          <Image style={{width:"100%", height: 170,marginTop: 2}} resizeMode='contain' source={require('./../../assets/images/card_new.png')} />
        </View>
        <View>
          <Text style={{fontFamily: "outfit-black", fontSize: 17}}>Your card</Text>
          <View style={{width: "100%", 
            height: height * 0.25, 
            // backgroundColor: Colors.APPCOLOR,
            borderRadius: 20,
            borderStyle: "dashed",
            borderColor: Colors.BOXOUTLINE,
            borderWidth: 2,
            alignItems: "center",
            justifyContent: "center"
            }}>
              <Image style={{
                width: 30,
                height: 30
              }} source={require('./../../assets/images/add_icon.png')} />
          {/* <Text>Hello</Text> */}
          </View>
        </View>
        <BottomTile/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cardDisplay: {
    // flex: 1,
    // borderWidth: 3,
    paddingHorizontal: 20,
    paddingTop: 15,
    width: "100%", 
    backgroundColor: "#fff", 
    marginTop: 15, 
    height: height * 0.75 ,
    borderRadius: 10,
    gap: 10
  }
})