import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import axios from "axios"; // Make sure axios is imported
import LoginInputBox from "../components/LoginInputBox";
import { UserContext } from "../context/UserContext";
import { Colors } from "../constants/Colors";

const apiUrl = process.env.REACT_APP_API_URL;

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const { dispatch } = useContext(UserContext);
  const navigation = useNavigation();

  async function handleSubmit() {
    // console.log(apiUrl)
    try {
      dispatch({ type: "setLoader", payload: true });
      const loginResponse = await axios.post(`https://api.montrealtriustfinancial.online/auth/token`, {
        email,
        password,
      });
      const { data } = loginResponse;

      if (data) {
        console.log(data)
        dispatch({ type: "login", payload: data });

        if (data?.verified.toLowerCase() === "false") {
          dispatch({ type: "setLoader", payload: false });
        }
        if (data?.pin.toLowerCase() === "false" && data?.verified.toLowerCase() === "true") {
          return navigation.navigate("SetPin");
        }
        if (data?.pin.toLowerCase() === "true" && data?.verified.toLowerCase() === "true") {
          dispatch({ type: "setLoader", payload: false });
          return navigation.navigate("Bank");
        }
      } else {
        setLoginError("Incorrect login or password.");
        dispatch({ type: "setLoader", payload: false });
      }
    } catch (error) {
      console.log(error)
      setLoginError("Something went wrong. Please try again.");
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

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={{ height: "95%" }}>
          <View style={{ display: "flex", alignItems: "center", flex: 1 }}>
            <Image
              resizeMode="contain"
              style={styles.imageSize}
              source={require("./../assets/images/login.png")}
            />
          </View>

          <View style={styles.bottomContainer}>
            <Text
              style={{
                fontFamily: "outfit-black",
                textAlign: "center",
                fontSize: 20,
                marginTop: 20,
              }}
            >
              Login to your account
            </Text>

            <View style={{ flexDirection: "column", justifyContent: "space-between" }}>
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
              />
            </View>

            {loginError ? <Text style={styles.errorText}>{loginError}</Text> : null}

            <TouchableOpacity onPress={handleSubmit}>
              <View style={styles.loginButton}>
                <Text style={styles.loginButtonText}>Login</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backButton: {
    height: 35,
    width: 35,
    margin: 15
  },
  container: {
    flex: 1,
    backgroundColor: Colors.APPDARKCOLOR,
    paddingHorizontal: 5
  },
  imageSize: {
    width: 250,
    height: 250
  },
  bottomContainer: {
    paddingHorizontal: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginTop: 20,
    flex: 1.5,
    backgroundColor: "#fff",
    width: "100%"
  },
  loginButton: {
    backgroundColor: Colors.APPCOLOR,
    paddingHorizontal: 60,
    height: 50,
    borderRadius: 10,
    marginVertical: 30,
    marginBottom: 65,
    alignItems: "center",
    justifyContent: "center"
  },
  loginButtonText: {
    textAlign: "center",
    fontFamily: "outfit-black"
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginVertical: 10
  }
});
