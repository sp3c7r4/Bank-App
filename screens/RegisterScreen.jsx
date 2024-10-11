import { View, Text, Pressable, Image, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { useNavigation } from '@react-navigation/native'
import { Colors } from '../constants/Colors'
import React from 'react'
import InputBox from '../components/InputBox'


export default function RegisterScreen() {
  const navigation = useNavigation()
  const router = useRouter()
  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={() => navigation.goBack()}>
        <Image style={styles.backButton} source={require('./../assets/images/backbutton.png')} />
      </Pressable>
      <ScrollView contentContainerStyle={{}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
      <View style={{display: "flex", alignItems: "center"}}>
        <Image resizeMode='contain' style={styles.imageSize} source={require('./../assets/images/register.png')}/>
      </View>

      <View style={styles.bottomContainer}>
        <KeyboardAvoidingView behavior='padding'>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={{fontFamily: 'outfit-black', fontSize: 16, marginTop: 20}}>Register</Text>
          <Text style={{fontFamily: 'outfit-black', fontSize: 10, color: Colors.GRAY}}>Enter your information</Text>
          <View style={{flexDirection: "row", justifyContent: "space-between"}}>
            <InputBox name="Firstname" placeholder="Enter your firstname" image={require('./../assets/images/person.png')}/>
            <InputBox name="Lastname" image={require('./../assets/images/person.png')}/>
          </View>
          <View style={{flexDirection: "row",justifyContent: "space-between"}}>
            <InputBox name="Username" image={require('./../assets/images/username.png')}/>
            <InputBox name="Email" placeholder='email@example.com' image={require('./../assets/images/mail.png')}/>
          </View>
          <View style={{flexDirection: "row",justifyContent: "space-between"}}>
            <InputBox name="Password" image={require('./../assets/images/locks.png')}/>
            <InputBox name="Confirm Password" image={require('./../assets/images/locks.png')}/>
          </View>
          <View style={{flexDirection: "row",justifyContent: "space-between"}}>
            <InputBox name="Password" image={require('./../assets/images/locks.png')}/>
            <InputBox name="Confirm Password" image={require('./../assets/images/locks.png')}/>
          </View>
          <TouchableOpacity>
            <View style={{backgroundColor: Colors.APPCOLOR,
              paddingHorizontal: 60,
              height: 50,
              borderRadius: 10,
              marginVertical: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              // marginTop: 60,
            }}>
              <Text style={{textAlign: "center",
              fontFamily: 'outfit-black'}}>
                Register
              </Text>
            </View>
          </TouchableOpacity>
          </ScrollView>
          </KeyboardAvoidingView>
      </View>
    </KeyboardAvoidingView>
    </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  backButton: {
    height: 35,
    width: 35,
    margin: 15
  }, container: {
    flex: 1,
    backgroundColor: Colors.APPDARKCOLOR,
  }, imageSize: {
    width: 200,
    height: 200,
    borderWidth: 3
  }, bottomContainer: {
    paddingHorizontal: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginTop: 7,
    display: "flex",
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
    justifyContent: "flex-end"
  }
})