import React, { useContext,useRef, useState } from 'react'
import { Image, StyleSheet, Text, View, ScrollView,Button } from 'react-native'
import { UserContext } from '../../context/UserContext'
import Header from '../Dashboard Components/Header';
import { Colors } from '../../constants/Colors';
import BalanceTile from '../Dashboard Components/BalanceTile';
import MiddleTile from '../Dashboard Components/MiddleTile';
import TransactionTIle from '../Dashboard Components/TransactionTIle';
import ScreenBottomSheet from '../ScreenBottomSheet';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import CryptoTransfer from '../Dashboard Components/CryptoTransfer';

export default function Bank() {
  const [mode, setMode] = useState('')

  const data = {"accnumber": 8697322891, 
    "address": "439 Harrison Street Webster, NY 14580", 
    "balance": 752579.1131401936, 
    "country": "Nigeria", 
    "cryptos": [
      {"bnb_balance": 0, 
        "btc_balance": 1.324788258973016, 
        "eth_balance": 0.8615410317474865, 
        "id": 18, 
        "usdt_balance": 0, 
        "user_email": "sarafasatar@gmail.com"}
      ], "email": "sarafasatar@gmail.com", 
      "firstname": "Spectras", 
      "identification_state": false, 
      "identification_type": null, 
      "image_url": "https://res.cloudinary.com/doivh1yki/image/upload/v1728169017/upload4f67de94e215d91c4229aed1789f33cd.jpg", 
      "is_admin": false, 
      "lastname": "Gee", 
      "level": "premium", 
      "phone": "+12222222222", 
      "pin": "True", 
      "ssn": "9999999999999", 
      "status": "active", 
      "username": "Sp3c7r4", 
      "verified": "True"
  }
  const bottomSheetRef = useRef(null);
  const snapPoints = ['30%', '50%']
  function handlePresentModal(transfer) {
    setMode(transfer)
    bottomSheetRef.current?.present()
  }
  console.log(mode)
  return (
    <>
    <View  style={{flex: 1, backgroundColor: Colors.HOMEBACKGROUND, paddingHorizontal: 20}}>
      <Header userInfo={data}/>
      <ScrollView showsVerticalScrollIndicator={false}>
        <BalanceTile userInfo={data} cryptoTransfer={() => handlePresentModal('transfer')}/>
        <MiddleTile/>
      <TransactionTIle/>
      </ScrollView>
        <BottomSheetModalProvider>
          <View>
            <BottomSheetModal ref={bottomSheetRef} 
            index={0} 
            keyboardBehavior="padding" // Ensures keyboard interaction
            enablePanDownToClose={true}
            snapPoints={snapPoints} 
            backdropComponent={({ animatedIndex, style }) => (
            <View style={[style, styles.backdrop]} />
          )}
          backgroundStyle={styles.bottomSheetBackground}>
              <View>
                {mode === 'transfer' ? <CryptoTransfer/> : <Text>"Hello"</Text>}
              </View>
            </BottomSheetModal>
          </View>
        </BottomSheetModalProvider>
    </View>
    </>

  )
}
const styles = StyleSheet.create({
    image: {
        width: 200,
        height: 200,
        borderRadius: 999
    }, backdrop: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Faint gray/black background
    },bottomSheetBackground: {
      backgroundColor: '#fff'
    }
})