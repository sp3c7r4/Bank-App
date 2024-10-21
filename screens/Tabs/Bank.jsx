import React, { useContext, useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View, ScrollView } from 'react-native'
import { UserContext } from '../../context/UserContext'
import Header from '../Dashboard Components/Header';
import { Colors } from '../../constants/Colors';
import BalanceTile from '../Dashboard Components/BalanceTile';
import MiddleTile from '../Dashboard Components/MiddleTile';
import TransactionTIle from '../Dashboard Components/TransactionTIle';
import useRefetchUser from '../../hooks/useRefetchUser';

export default function Bank() {
    // const {currentUser} = useContext(UserContext);
    // console.log(currentUser)
    const {currentUser} = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    const {refetchUser} = useRefetchUser(setIsLoading);
    useEffect(function(){
      refetchUser()
    }, [])
    // const data = {"accnumber": 8697322891, 
    //   "address": "439 Harrison Street Webster, NY 14580", 
    //   "balance": 752579.1131401936, 
    //   "country": "Nigeria", 
    //   "cryptos": [
    //     {"bnb_balance": 0, 
    //       "btc_balance": 1.324788258973016, 
    //       "eth_balance": 0.8615410317474865, 
    //       "id": 18, 
    //       "usdt_balance": 0, 
    //       "user_email": "sarafasatar@gmail.com"}
    //     ], "email": "sarafasatar@gmail.com", 
    //     "firstname": "Spectras", 
    //     "identification_state": false, 
    //     "identification_type": null, 
    //     "image_url": "https://res.cloudinary.com/doivh1yki/image/upload/v1728169017/upload4f67de94e215d91c4229aed1789f33cd.jpg", 
    //     "is_admin": false, 
    //     "lastname": "Gee", 
    //     "level": "premium", 
    //     "phone": "+12222222222", 
    //     "pin": "True", 
    //     "ssn": "9999999999999", 
    //     "status": "active", 
    //     "username": "Sp3c7r4", 
    //     "verified": "True"}
  return (
    <View  style={{backgroundColor: Colors.HOMEBACKGROUND, paddingHorizontal: 20}}>
    <Header userInfo={currentUser}/>
    <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        <BalanceTile userInfo={data}/>
        <MiddleTile/>
        <TransactionTIle />
    </ScrollView>
    </View>

  )
}
const styles = StyleSheet.create({
    image: {
        width: 200,
        height: 200,
        borderRadius: 999
    }
})