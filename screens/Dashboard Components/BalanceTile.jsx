import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../constants/Colors'



export default function BalanceTile({ userInfo }) {
  const [swap, setSwap] = useState(false);
  
  const CryptoTile = ({userInfo}) => {
  // console.log(userInfo.cryptos[0].btc_balance)
    return (
      <View style={styles.container}>
        <View style={{alignItems: "center"}}>
          <Image source={require('./../../assets/images/crypto_bag.png')} style={{width: 40, height: 40}}/>
          <Text style={{fontFamily: 'outfit-bold'}}>Crypto</Text>
        </View>
        <View style={{position: 'absolute', right: 25, top: 20}}>
        <TouchableOpacity onPress={() => setSwap(!swap)} style={styles.swapButton}>
          <Image
            source={require('./../../assets/images/swap.png')}
            resizeMode="contain"
            style={{ width: 25, height: 25 }}
          />
        </TouchableOpacity>
        </View>
        <View style={{backgroundColor: Colors.APPCOLOR, height: 90, alignItems: "center", flex:1}}>
          <View style={{flexDirection: "row", gap:7}}>
            <View>
              <Text style={{color: "black", fontFamily: 'outfit-black'}}>BTC</Text>
              <View style={{backgroundColor: "#fff", 
              paddingVertical: 6, 
              paddingHorizontal: 10, 
              borderTopRightRadius: 10, 
              borderBottomLeftRadius: 10, 
                borderBottomRightRadius: 10}}>
                <Text style={{color: "black", fontFamily: 'outfit-black', fontSize: 10}}>{userInfo.cryptos[0].btc_balance.toFixed(6)}</Text>
              </View>
            </View>
            <View>
              <Text style={{color: "black", fontFamily: 'outfit-black'}}>ETH</Text>
              <View style={{backgroundColor: "#fff", 
              paddingVertical: 6, 
              paddingHorizontal: 10, 
              borderTopRightRadius: 10, 
              borderBottomLeftRadius: 10, 
                borderBottomRightRadius: 10}}>
                <Text style={{color: "black", fontFamily: 'outfit-black', fontSize: 10}}>{userInfo.cryptos[0].btc_balance.toFixed(6)}</Text>
              </View>
            </View>
            <View>
              <Text style={{color: "black", fontFamily: 'outfit-black'}}>BNB</Text>
              <View style={{backgroundColor: "#fff", 
              paddingVertical: 6, 
              paddingHorizontal: 10, 
              borderTopRightRadius: 10, 
              borderBottomLeftRadius: 10, 
                borderBottomRightRadius: 10}}>
                <Text style={{color: "black", fontFamily: 'outfit-black', fontSize: 10}}>{userInfo.cryptos[0].btc_balance.toFixed(6)}</Text>
              </View>
            </View>
            <View>
              <Text style={{color: "black", fontFamily: 'outfit-black'}}>USDT</Text>
              <View style={{backgroundColor: "#fff", 
              paddingVertical: 6, 
              paddingHorizontal: 10, 
              borderTopRightRadius: 10, 
              borderBottomLeftRadius: 10, 
                borderBottomRightRadius: 10}}>
                <Text style={{color: "black", fontFamily: 'outfit-black', fontSize: 10}}>{userInfo.cryptos[0].btc_balance.toFixed(6)}</Text>
              </View>
            </View>
          </View>
          <Text style={{color: "#000", fontFamily: 'outfit-black', fontSize: 20, marginTop: 10}}>${userInfo.balance.toFixed(2)}</Text>
        </View>
        <View style={{flexDirection: "row",justifyContent: "space-evenly", marginTop: 5}}>
          <TouchableOpacity>
            <View style={{
              backgroundColor: Colors.BALANCETILEGREEN,
              padding: 7,
              borderRadius: 20,
              width: 85,
              display: "flex",
              alignItems:"center",
              justifyContent: "center"
            }}>
              <Text style={{fontFamily: "outfit-medium"}}>Transfer</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={{
              backgroundColor: Colors.APPDARKCOLOR,
              padding: 7,
              borderRadius: 20,
              width: 85,
              display: "flex",
              alignItems:"center",
              justifyContent: "center"
            }}>
              <Text style={{fontFamily: "outfit-medium", color: "#fff"}}>Deposit</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={{
              backgroundColor: Colors.BALANCETILEGREEN,
              padding: 7,
              borderRadius: 20,
              width: 85,
              display: "flex",
              alignItems:"center",
              justifyContent: "center"
            }}>
              <Text style={{fontFamily: "outfit-medium"}}>Withdraw</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  const BalancesTile = ({ userInfo }) => {
    return (
      <View style={styles.container}>
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("./../../assets/images/money_bag.png")}
            style={{ width: 40, height: 40 }}
          />
          <Text style={{ fontFamily: "outfit-bold" }}>Asset</Text>
        </View>
        <View style={{ position: "absolute", right: 25, top: 20 }}>
          <TouchableOpacity onPress={() => setSwap(!swap)} style={styles.swapButton}>
            <Image
              source={require("./../../assets/images/swap.png")}
              resizeMode="contain"
              style={{ width: 25, height: 25 }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ backgroundColor: Colors.APPCOLOR, height: 90, alignItems: "center" }}>
          <Text style={{ color: "#000", fontFamily: "outfit-black", fontSize: 35 }}>
            ${userInfo.balance.toFixed(2)}
          </Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginTop: 5 }}>
          <TouchableOpacity>
            <View
              style={{
                backgroundColor: Colors.BALANCETILEGREEN,
                padding: 7,
                borderRadius: 20,
                width: 85,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontFamily: "outfit-medium" }}>Transfer</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View
              style={{
                backgroundColor: Colors.APPDARKCOLOR,
                padding: 7,
                borderRadius: 20,
                width: 85,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontFamily: "outfit-medium", color: "#fff" }}>Deposit</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View
              style={{
                backgroundColor: Colors.BALANCETILEGREEN,
                padding: 7,
                borderRadius: 20,
                width: 85,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontFamily: "outfit-medium" }}>Withdraw</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      marginTop: 20,
      backgroundColor: Colors.APPCOLOR,
      width: "100%",
      padding: 20,
      borderRadius: 20,
    },
  });

  return (
    <View>
      {swap ? <CryptoTile userInfo={userInfo}/> : <BalancesTile userInfo={userInfo} />}
    </View>
  );
}