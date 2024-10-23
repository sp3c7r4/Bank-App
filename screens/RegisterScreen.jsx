import React, { useContext, useState } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../constants/Colors";
import { flags } from "../constants/Flags";
import { phonePrefixes } from "../constants/Prefixes";
import InputBox from "../components/InputBox";
import RNPickerSelect from "react-native-picker-select";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import { UserContext } from "../context/UserContext";
import axios from "axios";

export default function RegisterScreen() {
  const { dispatch, isLoading } = useContext(UserContext); // Accessing dispatch from the UserContext
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedPrefix, setselectedPrefix] = useState("");

  const [userDetails, setUserDetails] = useState({
    firstname: "",
    lastname: "",
    username: "",
    phone: "",
    accnumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const navigation = useNavigation();

  function handleUserDetail(field, value) {
    setUserDetails((prev) => ({ ...prev, [field]: value }));
    // Check for password and confirm password match
    if (field === "confirmPassword" || field === "password") {
      if (userDetails.password !== value && field === "confirmPassword") {
        setPasswordError("Passwords do not match");
      } else if (userDetails.password === value || field === "password") {
        setPasswordError("");
      }
    }
  }

  async function handleSubmit() {
    try {
      dispatch({ type: "setLoader", payload: true }); // Show loader when starting the request
      const response = await axios.post(
        `https://api.montrealtriustfinancial.online/auth/register`,
        {
          phone: selectedPrefix + userDetails?.phone,
          email: userDetails?.email,
          password: userDetails?.password,
          firstname: userDetails?.firstname,
          lastname: userDetails?.lastname,
          username: userDetails?.username,
          country: selectedCountry,
        }
      );

      if (response.status >= 200 && response.status < 300) {
        dispatch({ type: "setLoader", payload: false }); // Hide loader after successful request
        dispatch({ type: "login", payload: response.data }); // Log the user in
        navigation.navigate("Login");
      }
    } catch (err) {
      dispatch({ type: "setLoader", payload: false }); // Hide loader in case of error
      console.log(err);
      if (err.response) {
        if (err.response.status === 400) {
          console.log("Bad request. Please check the details and try again.");
        } else {
          console.log("Server error. Please try again later.");
        }
      } else {
        console.log("Network error. Please check your connection.");
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={{ height: "95%" }}>
          <Pressable onPress={() => navigation.goBack()}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 20,
              }}
            >
              <FontAwesome name="less-than" size={15} color="black" />
            </View>
          </Pressable>
          <Text
            style={{
              fontFamily: "outfit-black",
              fontSize: 20,
              textAlign: "center",
            }}
          >
            Create your account!
          </Text>
          <KeyboardAvoidingView behavior="padding">
            <ScrollView showsVerticalScrollIndicator={false}>
              <InputBox
                handleTextChange={(value) =>
                  handleUserDetail("firstname", value)
                }
                placeholder="Firstname"
              />
              <InputBox
                handleTextChange={(value) =>
                  handleUserDetail("lastname", value)
                }
                placeholder="Lastname"
              />
              <InputBox
                handleTextChange={(value) =>
                  handleUserDetail("username", value)
                }
                placeholder="Username"
              />
              <InputBox
                handleTextChange={(value) => handleUserDetail("email", value)}
                placeholder="Email"
                type="email"
              />

              <View
                style={{
                  marginTop: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: Colors.INPUTBOX,
                }}
              >
                <View style={{ width: "39%" }}>
                  <RNPickerSelect
                    placeholder={{ label: "+1" }}
                    onValueChange={(value) => setselectedPrefix(value)}
                    items={phonePrefixes}
                    style={{
                      inputAndroid: {
                        fontFamily: "outfit-bold", // for Android
                        fontSize: 8,
                        borderRadius: 10,
                      },
                    }}
                  />
                </View>
                <InputBox
                  extraStyle={{ width: "70%", backgroundColor: "none" }}
                  handleTextChange={(value) => handleUserDetail("phone", value)}
                  type="number"
                  placeholder="*** *** ***"
                />
              </View>

              <View style={styles.dropDown}>
                <RNPickerSelect
                  placeholder={{ label: "Country:" }}
                  onValueChange={(value) => setSelectedCountry(value)}
                  items={flags}
                  style={{
                    inputIOS: {
                      fontFamily: "outfit-bold",
                      fontSize: 14,
                      borderRadius: 10,
                    },
                    inputAndroid: {
                      fontFamily: "outfit-bold",
                      fontSize: 14,
                      borderRadius: 10,
                    },
                  }}
                />
              </View>

              <InputBox
                handleTextChange={(value) =>
                  handleUserDetail("password", value)
                }
                placeholder="Password"
                type="password"
              />

              <InputBox
                handleTextChange={(value) =>
                  handleUserDetail("confirmPassword", value)
                }
                placeholder="Confirm Password"
                type="password"
              />

              {passwordError ? (
                <Text style={{ color: "red", textAlign: "center" }}>
                  {passwordError}
                </Text>
              ) : null}

              {isLoading ? (
                <View style={{ marginTop: 10 }}>
                  <ActivityIndicator size="large" color={Colors.APPCOLOR} />
                </View>
              ) : (
                <TouchableOpacity
                  onPress={handleSubmit}
                  disabled={passwordError !== ""}
                >
                  <View
                    style={{
                      backgroundColor:
                        passwordError !== "" ? "gray" : Colors.APPCOLOR,
                      paddingHorizontal: 60,
                      height: 50,
                      borderRadius: 10,
                      marginVertical: 20,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        fontFamily: "outfit-black",
                      }}
                    >
                      Register
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  dropDown: {
    marginTop: 10,
    fontFamily: "outfit-bold",
    fontSize: 14,
    height: 50,
    width: "100%",
    backgroundColor: Colors.INPUTBOX,
    borderRadius: 10,
  },
});
