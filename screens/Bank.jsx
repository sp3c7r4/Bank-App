import React, { useContext } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { UserContext } from '../context/UserContext'

export default function Bank() {
    const {currentUser} = useContext(UserContext);
    console.log(currentUser)
  return (
    <View>
        <Text>{currentUser.lastname}, {currentUser.firstname}</Text>
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