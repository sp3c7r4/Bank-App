import { View, Text, Pressable, Image, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { useNavigation } from '@react-navigation/native'
import { Colors } from '../constants/Colors'
import React, {useState} from 'react'
import LoginInputBox from '../components/LoginInputBox'


export default function LoginScreen() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigation = useNavigation()
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
        <Image resizeMode='contain' style={styles.imageSize} source={require('./../assets/images/login.png')}/>
      </View>

      <View style={styles.bottomContainer}>
        <KeyboardAvoidingView behavior='padding'>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={{fontFamily: 'outfit-black', fontSize: 16, marginTop: 20}}>Login</Text>
          <Text style={{fontFamily: 'outfit-black', fontSize: 10, color: Colors.GRAY}}>Enter your information</Text>
          <View style={{flexDirection: "column", justifyContent: "space-between"}}>
            <LoginInputBox name="Email" placeholder="Enter your email" image={require('./../assets/images/mail.png')}/>
            <LoginInputBox name="Password" image={require('./../assets/images/person.png')}/>
          </View>
          <TouchableOpacity>
            <View style={{backgroundColor: Colors.APPCOLOR,
              paddingHorizontal: 60,
              height: 50,
              borderRadius: 10,
              marginVertical: 30,
              marginBottom: 65,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              // marginTop: 60,
            }}>
              <Text style={{textAlign: "center",
              fontFamily: 'outfit-black'}}>
                Login
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
    marginTop: 20,
    display: "flex",
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
    // justifyContent: "flex-end"
  }
})