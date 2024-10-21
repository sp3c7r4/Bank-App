import { View, Text, StatusBar, Image, StyleSheet } from 'react-native'
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext'
import React from 'react'

export default function Header({userInfo}) {
  // const {currentUser} = useContext(UserContext);
  // console.log(currentUser)
  console.log(userInfo.image_url)
  return (
    <View style={styles.container}>
      <Image source={{uri: userInfo.image_url}} style={styles.profilePic}/>
      <View style={{paddingTop: 10}}>
        <Text style={{fontFamily: 'outfit-bold'}}>Hello,</Text>
        <Text style={{fontFamily: 'outfit-black', marginTop: -2}}>{userInfo.firstname} {userInfo.lastname}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight-20,
    paddingTop: 20,
    paddingBottom: 10,
    flexDirection: "row",
    gap: 10
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 50
  }
})