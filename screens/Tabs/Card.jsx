import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import Header from '../Dashboard Components/Header'
import { data } from './Bank'
import { Colors } from '../../constants/Colors'
import CardDisplaySection from '../Cards/CardDisplaySection'
import BottomTile from '../Cards/BottomTile'
import { UserContext } from '../../context/UserContext'

export default function Card() {
  const {currentUser} = useContext(UserContext)
  return (
    <View>
      <Header userInfo={currentUser}/>
      <View style={{flex: 1, backgroundColor: Colors.HOMEBACKGROUND, paddingHorizontal: 12}}>
        <CardDisplaySection/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})