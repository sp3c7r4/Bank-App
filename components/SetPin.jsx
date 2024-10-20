import React, { useContext, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import { Colors } from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../context/UserContext";
import { Modal } from "react-native";
import ConfirmPin from "../components/ConfirmPin"

export default function SetPin() {
  const navigation = useNavigation();
  const { dispatch, pinPage } = useContext(UserContext);
  const [pin, setPin] = useState(["", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [confirmPinPage, setconfirmPinPage] = useState(false);
  const [pinErr, setPinErr] = useState(""); // Error message state
  const inputRefs = useRef([]);

  // Handles pin input and focuses on the next input field
  useEffect(() => {
    setPin(["", "", "", ""]);
    setPinErr("");
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);
  const handlePinChange = (index, value) => {
    let pinCopy = [...pin];
    pinCopy[index] = value;
    setPin(pinCopy);

    // Move to the next input field automatically
    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }

    // When all inputs are filled, dispatch pin and navigate to ConfirmPin
    if (pinCopy.every((digit) => digit !== "")) {
      const pinStr = pinCopy.join("");
      dispatch({ type: "setPin", payload: pinStr });
      setconfirmPinPage(true);
    }
  };

  return (
    <Modal visible={pinPage} animationType="slide">
      <View style={styles.modalContainer}>
        <Pressable onPress={() => dispatch({ type: "setPinPage", payload: false })}>
          <View style={styles.closeButton}>
            <FontAwesome name="less-than" size={15} color="black" />
          </View>
        </Pressable>

        <View style={styles.contentContainer}>
          <View style={{ height: 100 }}>
            <View style={styles.textContainer}>
              <Text style={styles.verificationTitle}>Set your pin.</Text>
            </View>

            <View style={styles.pinContainer}>
              {pin.map((value, index) => (
                <View key={index} style={styles.box}>
                  <TextInput
                    ref={(ref) => (inputRefs.current[index] = ref)}
                    value={value}
                    maxLength={1}
                    keyboardType="numeric"
                    secureTextEntry={true}
                    onChangeText={(text) => handlePinChange(index, text)}
                    style={styles.input}
                  />
                </View>
              ))}
            </View>

            {pinErr ? (
              <Text style={styles.errorText}>{pinErr}</Text>
            ) : (
              <View style={{ height: 20 }}></View>
            )}
          </View>
        </View>
      </View>
      <ConfirmPin visible={confirmPinPage} setVisible={setconfirmPinPage} />
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
