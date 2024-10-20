import {
  View,
  Text,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useRef, useState } from "react";
import { Colors } from "../constants/Colors";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../context/UserContext";
import axios from "axios";

export default function Otp() {
  const navigation = useNavigation();
  const { dispatch, otpPage, currentUser } = useContext(UserContext);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [otpErr, setOtpErr] = useState(""); // Error message state
  const inputRefs = useRef([]);
  // Handles OTP input and focuses on the next input field
  const handleOTPChange = (index, value) => {
    let otpCopy = [...otp];
    otpCopy[index] = value;
    setOtp(otpCopy);

    // Move to the next input field automatically
    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Gather OTP and handle submission
  const handleSubmit = async function () {
    const otpCode = otp.join(""); // Combine all boxes into one OTP string
    setOtpErr(""); // Reset any previous errors

    // Check if the OTP is a valid 4-digit number
    if (!/^\d{4}$/.test(otpCode)) {
      setOtpErr("Please enter a valid 4-digit OTP");
      return;
    }

    try {
      setIsLoading(true); // Set loading state
      dispatch({ type: "setLoader", payload: true });

      const res = await axios.post(
        `https://api.montrealtriustfinancial.online/auth/otp-verify`,
        {
          otp: Number(otpCode),
          email: currentUser?.email,
        }
      );

      if (res.data.status === "Verified") {
        dispatch({ type: "setLoader", payload: false });
        const updatedUser = { ...currentUser, verified: "true" };

        // Navigate to SetPin screen if pin is not set, otherwise proceed to the bank page
        if (updatedUser?.pin.toLowerCase() === "false") {
          return navigation.navigate("SetPin");
        }

        dispatch({ type: "login", payload: updatedUser });
        return navigation.navigate("Bank");
      } else {
        setTimeout(() => {
          setOtpErr("OTP verification failed. Please try again.");
        }, 3000);
        
      }
    } catch (err) {
      setOtpErr("An error occurred during OTP verification. Please try again.");
    } finally {
      setIsLoading(false); // Reset loading state
      dispatch({ type: "setLoader", payload: false });
    }
  };

  return (
    <Modal visible={otpPage} animationType="slide">
      <View style={styles.modalContainer}>
        <Pressable onPress={() => dispatch({ type: "setOtpPage", payload: false })}>
          <View style={styles.closeButton}>
            <FontAwesome name="less-than" size={15} color="black" />
          </View>
        </Pressable>

        <View style={styles.contentContainer}>
          <View style={{height: 100}}>
            <View style={styles.textContainer}>
              <Text style={styles.verificationTitle}>Verification code</Text>
              <Text style={styles.verificationInfo}>
                We have sent the code verification to {currentUser?.email}.{" "}
                <Pressable>
                  <Text style={styles.changeEmailText}>Change your email?</Text>
                </Pressable>
              </Text>
            </View>

            <View style={styles.otpContainer}>
              {otp.map((value, index) => (
                <View key={index} style={styles.box}>
                  <TextInput
                    ref={(ref) => (inputRefs.current[index] = ref)}
                    value={value}
                    maxLength={1}
                    keyboardType="numeric"
                    onChangeText={(text) => handleOTPChange(index, text)}
                    style={styles.input}
                  />
                </View>
              ))}
            </View>

            {otpErr ? <Text style={styles.errorText}>{otpErr}</Text> : <View style={{height: 20,}}></View>}
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.resendButton}
              // Add functionality to resend OTP here
            >
              <Text style={styles.resendButtonText}>Resend</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSubmit}
              style={styles.submitButton}
              disabled={isLoading} // Disable button while loading
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.submitButtonText}>Submit</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    padding: 10,
    backgroundColor: "white",
    flex: 1,
  },
  closeButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
  },
  contentContainer: {
    padding: 10,
    borderRadius: 8,
    width: "100%",
    flex: 1,
    justifyContent: "space-between",
  },
  textContainer: {
    // height: 50,
  },
  verificationTitle: {
    fontSize: 20,
    fontFamily: "outfit-bold",
  },
  verificationInfo: {
    opacity: 0.7,
    fontSize: 16,
  },
  changeEmailText: {
    color: Colors.APPCOLOR,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 20
  },
  box: {
    padding: 10,
    backgroundColor: "#eee",
    borderRadius: 10,
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    textAlign: "center",
    fontSize: 18,
  },
  errorText: {
    color: "red",
    marginTop: 10,
    textAlign: "center"
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  resendButton: {
    padding: 13,
    borderRadius: 8,
    borderWidth: 1,
    width: "40%",
    borderColor: Colors.APPCOLOR,
  },
  resendButtonText: {
    textAlign: "center",
    fontSize: 15,
    fontFamily: "outfit-bold",
    color: Colors.APPCOLOR,
  },
  submitButton: {
    padding: 13,
    borderRadius: 8,
    backgroundColor: Colors.APPCOLOR,
    width: "40%",
    alignItems: "center",
  },
  submitButtonText: {
    textAlign: "center",
    fontSize: 15,
    fontFamily: "outfit-bold",
    color: "white",
  },
});
