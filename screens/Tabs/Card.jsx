import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../Dashboard Components/Header'
import { data } from './Bank'
import { Colors } from '../../constants/Colors'
import CardDisplaySection from '../Cards/CardDisplaySection'
import BottomTile from '../Cards/BottomTile'

export default function Card() {
  return (
    <View>
      <Header userInfo={data}/>
      <View style={{flex: 1, backgroundColor: Colors.HOMEBACKGROUND, paddingHorizontal: 12}}>
        <CardDisplaySection/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})