import React, { useRef, useState } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import Header from '../Dashboard Components/Header';
import BalanceTile from '../Dashboard Components/BalanceTile';
import MiddleTile from '../Dashboard Components/MiddleTile';
import TransactionTile from '../Dashboard Components/TransactionTile.jsx';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import CryptoButtonTile from '../Dashboard Components/CryptoButtonTile.jsx';
import MoneyButtonTile from '../Dashboard Components/MoneyButtonTile.jsx';
import CustomerCare from '../Modals/CustomerCare.jsx';
import ModalStack from '../Dashboard Components/ModalStack.jsx';
import { useNavigation } from '@react-navigation/native';

export const data = {"accnumber": 8697322891, 
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
    "image_url": "https://pbs.twimg.com/profile_images/1366466342354751491/JyhZpbtu_400x400.jpg", 
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

export default function Bank() {
  const navigation = useNavigation()
  const [mode, setMode] = useState('')
  const [modalVisible, setModalVisible] = useState(false);

  const bottomSheetRef = useRef(null);
  const snapPoints = ['45%', '90%']
  function handlePresentModal(mode) {
    setMode(mode)
    bottomSheetRef.current?.present()
  }
  function navigateToTransferScreen() {
    bottomSheetRef.current?.close()
  }
  const handleFocus = () => {
    bottomSheetRef.current?.snapTo(1);  // Scroll to the 90% snap point (index 2)
  };

  // Scroll back to lower snap point when TextInput loses focus
  const handleBlur = () => {
    bottomSheetRef.current?.snapTo(0);  // Scroll back to 25% snap point (index 0)
  };
  // console.log(mode)
  return (
    <>
    <View  style={{flex: 1, backgroundColor: "#fff"}}>
      <Header userInfo={data}/>
      <View style={{paddingHorizontal: 12}}>
      {/* <ScrollView showsVerticalScrollIndicator={false}> */}
        <BalanceTile userInfo={data} 
        // CryptoButtonTile={() => handlePresentModal('transfer')} 
        moneyWithdraw={() => handlePresentModal('withdraw')}
        moneyTransfer={() => handlePresentModal('transfer')}
        cryptoSwap={() => handlePresentModal('cryptoSwap')}
        cryptoP2P={() => handlePresentModal('cryptoP2P')}
        moneyDeposit={() => setModalVisible(true)}
        cryptoDeposit={() => setModalVisible(true)}
          />
        <MiddleTile/>
        <View style={{}}>
          <TransactionTile/>
        </View>
      {/* </ScrollView> */}
      </View>
      <CustomerCare onRequestClose={() => setModalVisible(false)} visible={modalVisible}/>
        <BottomSheetModalProvider>
          <View>
            <BottomSheetModal ref={bottomSheetRef} 
            index={0}
            enablePanDownToClose={true}
            snapPoints={snapPoints}
            backdropComponent={({ style }) => (
            <View style={[style, styles.backdrop]} />
          )}
          backgroundStyle={styles.bottomSheetBackground}>
              <View>
                {mode === 'transfer' ? <MoneyButtonTile onPressTransferToMontreal={"Hello"}/> : mode === 'withdraw' ? <MoneyButtonTile buttonSwapMode={'withdraw'}/> : mode === 'cryptoSwap' ? <CryptoButtonTile/> : mode === "cryptoP2P" ? <CryptoButtonTile buttonSwapMode={'P2P'}/> : <Text></Text>}
              </View>
            </BottomSheetModal>
          </View>
        </BottomSheetModalProvider>
    </View>
    </>

  )
}
const styles = StyleSheet.create({
  backdrop: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Faint gray/black background
    },bottomSheetBackground: {
      backgroundColor: '#fff'
    },
    blurContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    text: {
      fontSize: 18,
      color: '#fff',
    },
    openButton: {
      padding: 10,
      backgroundColor: 'blue',
      color: 'white',
      borderRadius: 5,
    },
    modalText: {
      marginBottom: 20,
      fontSize: 16,
    },
    closeButton: {
      color: 'red',
      fontSize: 16,
    },
})