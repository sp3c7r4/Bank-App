import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'


export default function TransactionsTileList({type, amount, time, description, asset, merchant}) {
  type = type;
  return (
    <>
    <View style={{paddingHorizontal: 10, 
      width: "100%", 
      height: 60, 
      backgroundColor: "#f0f2f5",
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "row",
      borderBottomWidth: 2,
      borderColor: Colors.BOXOUTLINE
      }}>
      <View style={{flexDirection: "row", gap: 6}}>
        <Image style={{width: 45, height: 45}} source={require('./../../assets/images/btc.png')} />
        <View style={{paddingTop: 4}}>
          <Text style={styles.firstLayer}>{
            
            `${ asset === 'USD' ? 
                  (type === 'debit') ? ('Transfer to ' + merchant) 
                : 
                  (type === 'credit') ? ('Recieved from ' + merchant) 
                : '' 
              : (type === 'debit') ? ("Crypto debit")
              : (type === 'credit') ? ("Crypto credit")
              : '' }`

            }</Text>
          <Text style={{color: Colors.APPCOLOR,fontFamily: "outfit-medium", marginTop: 0, fontSize: 10}}>{(new Date(time)).toUTCString()}</Text>
        </View>
      </View>
      <View style={{flexDirection: "column", alignItems: "flex-end"}}>
      <Text style={[styles.secondLayer, 
        {color: type === 'credit' ? Colors.APPCOLOR : "red"}]}>
        {`${  asset === 'USD' ? type === 'credit' ? '+$'+amount 
         : type === 'debit' ? '-'+amount : '' 
         : asset !== 'USD' ? amount : ''}`}</Text>
        <View style={{width: 50, backgroundColor: "#6EFFA2", justifyContent: 'center', alignItems: "center", borderRadius: 3,}}>
          <Text style={{color: "black", fontFamily: "outfit-medium", fontSize: 10}}>
            {description}
          </Text>
        </View>
      </View>
    </View>
    </>
  )
}

const styles = StyleSheet.create({
  firstLayer: {
    fontSize: 13,
    fontFamily: "outfit-medium",
    color: "black"
  }, secondLayer: {
      fontFamily: "outfit-bold"
  }
})