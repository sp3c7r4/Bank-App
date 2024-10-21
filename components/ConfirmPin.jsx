import React, { useContext, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import { Colors } from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { Modal } from "react-native";

export default function ConfirmPin({visible, setVisible}) {
  const navigation = useNavigation();
  const { currentUser, userPin } = useContext(UserContext);
  const [pin, setPin] = useState(["", "", "", ""]);
  const [pinErr, setPinErr] = useState("");
  const inputRefs = useRef([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setPin(["", "", "", ""]);
    setPinErr("");
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  async function handlePinChange(index, value) {
    // (PIN handling code as before)

    if (pinCopy.every((digit) => digit !== "")) {
      const pinStr = pinCopy.join("");
      if (pinStr !== userPin) {
        setPin(["", "", "", ""]);
        inputRefs.current[0]?.focus();
         setTimeout(() => {
          setPinErr("Pin does not match");
        }, 3000);
         return;
      }
      setIsLoading(true); // Set loading state
      try {
        const response = await axios.post(
          `https://api.montrealtriustfinancial.online/auth/setpin`,
          {
            email: currentUser.email,
            pin: Number(pinStr),
          }
        );
        if (
          response.status === 200 ||
          response.status === 201 ||
          response.status === "success"
        ) {
          console.log(response);
          navigation.navigate("Bank");
        }
      } catch (err) {
        setTimeout(() => {
          setPinErr("Something went wrong!");
        }, 3000);
      } finally {
        setIsLoading(false); // Reset loading state after completion
      }
    }
  }

  return (
    <Modal visible={visible} animationType="slide">
        <View style={styles.modalContainer}>
      <Pressable onPress={() =>setVisible(false)}>
        <View style={styles.closeButton}>
          <FontAwesome name="less-than" size={15} color="black" />
        </View>
      </Pressable>

      <View style={styles.contentContainer}>
        <View style={{ height: 100 }}>
          <View style={styles.textContainer}>
            <Text style={styles.verificationTitle}>Confirm Pin</Text>
          </View>

          <View style={styles.pinContainer}>
            {pin.map((value, index) => (
              <View key={index} style={styles.box}>
                <TextInput
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  value={value}
                  maxLength={1}
                  secureTextEntry={true}
                  keyboardType="numeric"
                  onChangeText={(text) => handlePinChange(index, text)}
                  style={styles.input}
                  editable={!isLoading} // Disable when loading
                />
              </View>
            ))}
          </View>

          {isLoading && (
            <ActivityIndicator size="small" color={Colors.APPCOLOR} />
          )}

          {pinErr ? (
            <Text style={styles.errorText}>{pinErr}</Text>
          ) : (
            <View style={{ height: 20 }} />
          )}
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
  textContainer: {},
  verificationTitle: {
    textAlign: "center",
    fontSize: 20,
    fontFamily: "outfit-bold",
  },
  pinContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 20,
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
    textAlign: "center",
  },
});
