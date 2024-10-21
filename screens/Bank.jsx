import React, { useContext, useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { UserContext } from '../context/UserContext'
import useRefetchUser from '../hooks/useRefetchUser';

export default function Bank() {
    const {currentUser} = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    const {refetchUser} = useRefetchUser(setIsLoading);
    useEffect(function(){
      refetchUser()
    }, [])
  return (
    <View style={{backgroundColor: "red"}}>
        <Text>{currentUser?.lastname}, {currentUser?.firstname}</Text>
        <Image style={styles.image} source={{uri: currentUser?.image_url}} />
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