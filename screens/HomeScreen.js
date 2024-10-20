import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import ButtonGreen from "./../components/ButtonGreen.jsx";
import ButtonOutline from "../components/ButtonOutline.jsx";
// import { StatusBar } from 'expo-status-bar'
import { Colors } from "../constants/Colors.js";

export default function HomeScreen({ navigation }) {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            resizeMode="contain"
            style={styles.getStarted}
            source={require("./../assets/images/Get Started.png")}
          />
        </View>
        <View
          style={{
            marginHorizontal: "10%",
            marginTop: 50,
            flex: 1,
            justifyContent: "flex-end",
          }}
        >
          <Image
            resizeMode="contain"
            style={{
              width: 150,
              height: 50,
              // borderWidth: 3,
              // borderColor: "#fff"
            }}
            source={require("./../assets/images/Logo.png")}
          />
          <Text
            style={{
              color: "#fff",
              fontFamily: "outfit-bold",
              fontSize: 20,
              marginVertical: 10,
            }}
          >
            Find your financial freedom with our banking app
          </Text>
          <Text
            style={{ color: "#fff", fontFamily: "outfit-medium", fontSize: 10 }}
          >
            where managing your money becomes effortless, insights are just a
            tap away, and your goals are within reach
          </Text>
        </View>
        <View style={[styles.buttonLayout, { marginBottom: 40 }]}>
          <TouchableOpacity onPress={() => navigation.navigate("Tab")}>
            <ButtonGreen text="Login" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <ButtonOutline text="Register" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.BOXOUTLINE} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.APPDARKCOLOR,
    // justifyContent: "flex-end"
  },
  getStarted: {
    height: 250,
    width: 250,
  },
  imageContainer: {
    marginTop: 50,
    display: "flex",
    alignItems: "center",
  },
  buttonLayout: {
    flex: 1,
    justifyContent: "flex-end",
  },
});
