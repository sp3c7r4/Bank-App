import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import axios from "axios"; // Make sure axios is imported
import LoginInputBox from "../components/LoginInputBox";
import { UserContext } from "../context/UserContext";
import { Colors } from "../constants/Colors";
import Otp from "../components/Otp";
import SetPin from "../components/SetPin";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const { dispatch, isLoading } = useContext(UserContext);
  const navigation = useNavigation();

  async function handleSubmit() {
    try {
      dispatch({ type: "setLoader", payload: true });
      const loginResponse = await axios.post(
        `https://api.montrealtriustfinancial.online/auth/token`,
        { email, password }
      );
      const { data } = loginResponse;

      if (data) {
        dispatch({ type: "login", payload: data });

        if (data?.verified.toLowerCase() === "false") {
          dispatch({ type: "setOtpPage", payload: true });
          dispatch({ type: "setLoader", payload: false });
        } else if (
          data?.pin.toLowerCase() === "false" &&
          data?.verified.toLowerCase() === "true"
        ) {
          dispatch({ type: "setPinPage", payload: true });
        } else {
          await AsyncStorage.setItem("userData", JSON.stringify(data));
          dispatch({ type: "setLoader", payload: false });
          return navigation.navigate("Tab");
        }
      } else {
        setTimeout(() => {
          setLoginError("Incorrect login or password.");
        }, 4000);
        dispatch({ type: "setLoader", payload: false });
      }
    } catch (error) {
      setTimeout(() => {
        setLoginError("Something went wrong. Please try again.");
      }, 4000);
      dispatch({ type: "setLoader", payload: false });
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={() => navigation.goBack()}>
        <Image
          style={styles.backButton}
          source={require("./../assets/images/backbutton.png")}
        />
      </Pressable>

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View style={{ height: "95%" }}>
          <View style={{ display: "flex", alignItems: "center", flex: 1 }}>
            <Image
              resizeMode="contain"
              style={styles.imageSize}
              source={require("./../assets/images/login.png")}
            />
          </View>

          <View style={styles.bottomContainer}>
            <ScrollView>
            <Text style={styles.title}>Login to your account</Text>

            <View style={styles.inputContainer}>
              <LoginInputBox
                value={email}
                handleTextChange={setEmail}
                placeholder="Email"
                image={require("./../assets/images/mail.png")}
              />
              <LoginInputBox
                value={password}
                handleTextChange={setPassword}
                placeholder="Password"
                image={require("./../assets/images/person.png")}
                type="password"
              />
            </View>

            {loginError ? <Text style={styles.errorText}>{loginError}</Text> : null}

            {isLoading ? (
              <View style={{marginTop: 10}}>
              <ActivityIndicator size="large" color={Colors.APPCOLOR} />
              </View>
            ) : (
              <TouchableOpacity onPress={handleSubmit}>
                <View style={styles.loginButton}>
                  <Text style={styles.loginButtonText}>Login</Text>
                </View>
              </TouchableOpacity>
            )}
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
      <Otp email={email} />
      <SetPin />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backButton: {
    height: 35,
    width: 35,
    margin: 15,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.APPDARKCOLOR,
    paddingHorizontal: 5,
  },
  imageSize: {
    width: 250,
    height: 250,
  },
  bottomContainer: {
    paddingHorizontal: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginTop: 20,
    flex: 1.5,
    backgroundColor: "#fff",
    width: "100%",
  },
  loginButton: {
    backgroundColor: Colors.APPCOLOR,
    paddingHorizontal: 60,
    height: 50,
    borderRadius: 10,
    marginVertical: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  loginButtonText: {
    textAlign: "center",
    fontFamily: "outfit-black",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginVertical: 10,
  },
  title: {
    fontFamily: "outfit-black",
    textAlign: "center",
    fontSize: 20,
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
});
