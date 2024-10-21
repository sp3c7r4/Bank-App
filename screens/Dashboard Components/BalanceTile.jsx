import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useMemo, useState } from 'react'
import { Colors } from '../../constants/Colors'
import BottomSheet from '@gorhom/bottom-sheet';

export function stylizeAmount(int){
  let splits = int.toFixed(2).split(".")
  let division = Math.floor(String(splits[0]).length / 3)
  let convertedInteger = String(splits[0]) 
  let value = ''
  for (let i = 0; i < division; i++) {
    let start = convertedInteger.length - (3 * (i + 1));
    let end = convertedInteger.length - (3 * i);
    value = ',' + convertedInteger.slice(start, end) + value;
  }
  value = convertedInteger.slice(0, convertedInteger.length % 3) + value;
  if (value.startsWith(',')) {
    value = value.slice(1);
  }
  // return value
  return value + `.${splits[1]}`
}

export default function BalanceTile({ userInfo, moneyTransfer, moneyDeposit , moneyWithdraw, cryptoSwap, cryptoDeposit, cryptoP2P }) {
  const [swap, setSwap] = useState(false);
  const CryptoTile = ({userInfo, cryptoSwap, cryptoDeposit, cryptoP2P}) => {
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
        <View style={{backgroundColor: Colors.APPCOLOR, height: 90, alignItems: "center"  }}>
          <View style={{flexDirection: "row", gap:10}}>
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
          <Text style={{color: "#000", fontFamily: 'outfit-black', fontSize: 20, marginTop: 10}}>${
          stylizeAmount(userInfo.balance)
          }</Text>
        </View>
        <View style={{flexDirection: "row",justifyContent: "space-evenly", marginTop: 5}}>
          {/*Crypto Transfer*/}
          <TouchableOpacity onPress={cryptoSwap}>
            <View style={{
              backgroundColor: Colors.BALANCETILEGREEN,
              padding: 7,
              borderRadius: 20,
              width: 85,
              display: "flex",
              alignItems:"center",
              justifyContent: "center"
            }}>
              <Text style={{fontFamily: "outfit-medium"}}>Swap</Text>
            </View>
          </TouchableOpacity>
          {/*Crypto Deposit*/}
          <TouchableOpacity onPress={cryptoDeposit}>
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
          {/*Crypto Withdraw*/}
          <TouchableOpacity onPress={cryptoP2P}>
            <View style={{
              backgroundColor: Colors.BALANCETILEGREEN,
              padding: 7,
              borderRadius: 20,
              width: 85,
              display: "flex",
              alignItems:"center",
              justifyContent: "center"
            }}>
              <Text style={{fontFamily: "outfit-medium"}}>P2P</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  const BalancesTile = ({ userInfo, moneyDeposit, moneyTransfer, moneyWithdraw }) => {
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
        <View style={{ backgroundColor: Colors.APPCOLOR, height: 90, alignItems: "center", justifyContent: "center" }}>
          <Text style={{ color: "#000", fontFamily: "outfit-black", fontSize: 35 }}>
            ${stylizeAmount(userInfo.balance)}
          </Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginTop: 5 }}>
          {/* Balance Transfer */}
          <TouchableOpacity onPress={moneyTransfer}>
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
          {/* Balance Deposit */}
          <TouchableOpacity onPress={moneyDeposit}>
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
          {/* Balance Withdraw */}
          <TouchableOpacity onPress={moneyWithdraw}>
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
      marginTop: 15,
      backgroundColor: Colors.APPCOLOR,
      width: "100%",
      padding: 15,
      borderRadius: 10,
    },
  });

  // const snapPoints = useMemo(() => ["25%", "50%", "70%"], []);
  return (
    <View>
      {swap ? <CryptoTile userInfo={userInfo} cryptoSwap={cryptoSwap} cryptoP2P={cryptoP2P} cryptoDeposit={cryptoDeposit}/> : <BalancesTile moneyTransfer={moneyTransfer} moneyWithdraw={moneyWithdraw} moneyDeposit={moneyDeposit} userInfo={userInfo}  />}
    </View>
  );
}