import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Image,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { Colors } from "../../constants/Colors";
import { UserContext } from "../../context/UserContext";
import RNPickerSelect from "react-native-picker-select";
import { CryptoContext } from "../../context/CryptoContext";
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";
import useRefetchUser from "../../hooks/useRefetchUser";

export default function CryptoButtonTile({ buttonSwapMode }) {
  const [toggle, setToggle] = useState("swap");
  const { currentUser } = useContext(UserContext);
  const { dispatch, allCryptoCurrencies } = useContext(CryptoContext);
  const [cryptovalue, setCryptoValue] = useState("0");
  const [usdvalue, setUsdValue] = useState("");
  const [selectedCrypto, setSelectedCrypto] = useState("");
  const [toCrypto, setToCrypto] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { refetchUser } = useRefetchUser(setIsLoading);

  // console.log(buttonSwapMode)
  useEffect(function () {
    dispatch({ type: "setCryptoInView", payload: true });
  }, []);
  useEffect(() => {
    if (selectedCrypto) {
      const equUsd = allCryptoCurrencies.find(
        (crp) => crp?.symbol === selectedCrypto
      );
      if (selectedCrypto && equUsd?.priceUsd && !isNaN(usdvalue)) {
        setCryptoValue(+usdvalue / +equUsd?.priceUsd);
        console.log(usdvalue, cryptovalue);
      } else {
        setCryptoValue("");
      }
    }
  }, [usdvalue, selectedCrypto, allCryptoCurrencies]);
  useEffect(() => {
    if (buttonSwapMode !== undefined) {
      setToggle(buttonSwapMode);
    }
  }, [buttonSwapMode]);

  const switchToggle = (mode) => {
    mode === "swap" ? setToggle("swap") : setToggle("P2P");
    // console.log(toggle)
  };
  // console.log(toggle)
  const cryptoCurrencies = [
    {
      label: "BTC",
      value: "BTC",
    },
    {
      label: "BNB",
      value: "BNB",
    },
    {
      label: "ETH",
      value: "ETH",
    },
    {
      label: "USDT",
      value: "USDT",
    },
  ];
  const handleUSDValue = (valueRecieved) => {
    const value = parseFloat(valueRecieved);
    if (!isNaN(value)) {
      setUsdValue(value.toString());
      if (value > currentUser.balance) {
        // setError("Insufficient balance");
      } else {
        // setError("");
      }
    } else {
      setUsdValue("");
    }
  };
  const handleSubmit = async () => {
    // setIsLoadingCrypto(true);
    console.log(selectedCrypto)
    if (!selectedCrypto) {
      // setIsLoadingCrypto(false);
      // toast.error("Please select a cryptocurrency.");
      return;
    }
  
    const handleTransactionSuccess = () => {
      // setIsLoadingCrypto(false);
      // toast.success("Transaction Successful");
      // setCryptoPage(false);
      refetchUser();
      // localStorage.removeItem("transactions");
      // localStorage.removeItem("transactions_timestamp");
    };
  
    const handleTransactionError = (message) => {
      // setIsLoadingCrypto(false);
      // toast.error(message || "Error making transaction");
      // setCryptoPage(false);
      refetchUser();
    };
  
    const transactionType = toCrypto ? "buy" : "sell";
    const value = toCrypto ? +usdvalue : +cryptovalue;
  
    try {
      console.log("submitting")
      const response = await axios.post(
        `https://api.montrealtriustfinancial.online/currency/crypto/${transactionType}`,
        {
          email: currentUser.email,
          amount: value,
          asset: selectedCrypto,
        }
      );
  
      if (response.data.status === "success") {
        console.log("success")
        handleTransactionSuccess();
      } else {
        handleTransactionError(response.data.message || "Transaction failed");
      }
    } catch (err) {
      console.log(err)
      // Handle network or server-side errors
      if (err.response) {
        // Server responded with a status other than 200
        const serverMessage = err.response.data?.message || "Transaction failed.";
        handleTransactionError(serverMessage);
      } else if (err.request) {
        // Request was made but no response was received
        handleTransactionError("No response from server. Please try again.");
      } else {
        // Something else went wrong during request setup
        handleTransactionError(err.message || "Unexpected error occurred.");
      }
    }
  };
  return (
    <View>
      {/*Toggle*/}
      <View style={{ alignItems: "center" }}>
        <View style={[styles.switchBar]}>
          <Pressable onPress={() => switchToggle("swap")}>
            <View
              style={[
                toggle === "swap"
                  ? { backgroundColor: "#fff" }
                  : { backgroundColor: "transparent" },
                styles.toggleBox,
              ]}
            >
              <Text style={{ fontFamily: "outfit-bold", color: "black" }}>
                Swap
              </Text>
            </View>
          </Pressable>
          <Pressable onPress={() => switchToggle("P2P")}>
            <View
              style={[
                toggle === "P2P"
                  ? { backgroundColor: "#fff" }
                  : { backgroundColor: "transparent" },
                styles.toggleBox,
              ]}
            >
              <Text style={{ fontFamily: "outfit-bold", color: "black" }}>
                P2P
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
      {/*End P2P Button */}
      {/*End Toggle*/}

      {/*Swap Screen*/}
      <View style={{ padding: 20 }}>
        {toggle === "swap" ? (
          <>
            <View style={{}}>
              <View
                style={{
                  backgroundColor: "#f8f8fb",
                  padding: 10,
                  borderRadius: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    opacity: 0.5,
                  }}
                >
                  <Text>Send</Text>
                  <Text>Balance: ${currentUser?.balance.toFixed(2)}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginVertical: 20,
                    borderRadius: 10,
                  }}
                >
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: 30,
                      flexBasis: "15%",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "outfit-bold",
                        // color: "#f8f8fb",
                        fontSize: 20,
                      }}
                    >
                      USD
                    </Text>
                  </View>
                  <View
                    style={{
                      // width: "100%",
                      flexBasis: "75%",
                      height: 50,
                      borderRadius: 10,
                      // position: "absolute",
                      zIndex: 1,
                      backgroundColor: "#f8f8fb",
                      justifyContent: "center",
                      // paddingLeft: 120,
                    }}
                  >
                    <TextInput
                      placeholder="0.00"
                      keyboardType="numeric"
                      value={usdvalue}
                      onChangeText={(value) => handleUSDValue(value)}
                      style={{
                        fontFamily: "outfit-bold",
                        textAlign: "right",
                        color: "#000",
                        opacity: 0.5,
                        fontSize: 20,
                        width: "100%",
                        // backgroundColor: "red"
                      }}
                    />
                  </View>
                </View>
              </View>
              <View style={{ alignItems: "flex-end", marginVertical: 10 }}>
                <Image
                  style={{ width: 45, height: 45 }}
                  resizeMode="contain"
                  source={require("./../../assets/images/swap_crypto_black.png")}
                />
              </View>
              <View
                style={{
                  backgroundColor: "#f8f8fb",
                  padding: 10,
                  borderRadius: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    marginVertical: 20,
                    borderRadius: 10,
                  }}
                >
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: 30,
                      flexBasis: "50%",
                    }}
                  >
                    <RNPickerSelect
                      placeholder={{ label: "Select a crypto currency" }}
                      onValueChange={(value) => setSelectedCrypto(value)}
                      items={cryptoCurrencies}
                      style={{
                        inputAndroid: {
                          fontFamily: "outfit-bold", // for Android
                          fontSize: 8,
                          borderRadius: 10,
                        },
                      }}
                    />
                  </View>

                  <View
                    style={{
                      flexBasis: "40%",
                      height: 50,
                      borderRadius: 10,
                      backgroundColor: "#f8f8fb",
                      justifyContent: "center",
                    }}
                  >
                    <TextInput
                      placeholder="0.00"
                      value={Number(cryptovalue)?.toFixed(4)}
                      style={{
                        fontFamily: "outfit-bold",
                        textAlign: "right",
                        color: "#000",
                        opacity: 0.5,
                        fontSize: 13,
                        width: "100%",
                      }}
                    />
                  </View>
                </View>
              </View>
              <TouchableOpacity
                onPress={handleSubmit}
                style={{
                  marginTop: 10,
                  padding: 15,
                  backgroundColor: Colors.APPCOLOR,
                  borderRadius: 10,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "white",
                    fontFamily: "outfit-medium",
                  }}
                >
                  {toCrypto ? "Buy" : "Sell"}
                </Text>
              </TouchableOpacity>
            </View>
            {/* End of swap Screen*/}
          </>
        ) : (
          <View style={{ marginHorizontal: "5%", marginTop: 10 }}>
            <Text
              style={{
                textAlign: "center",
                fontFamily: "outfit-bold",
                fontSize: 10,
              }}
            >
              Customer Care Contact Information
              <Text>
                {
                  "Contact custtomer care support. Please choose one of the following options to get in touch: \n"
                }
              </Text>
              <Text style={{ color: Colors.APPCOLOR }}> Email Support:</Text>
              {" support@yourbank.com \nWe strive to respond within 24 hours."}
              <Text>{`Zangi Cha Support:
Prefer instant assistance? Chat with us on Zangi!
Simply open the Zangi app and search for our customer care contact:
YourBank Support
We’re available from 8 AM to 8 PM (local time) for real-time assistance.

Thank you for choosing us, and we look forward to helping you!`}</Text>
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  switchBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    borderRadius: 12,
    width: "90%",
    height: 50,
    backgroundColor: "#f8f8fb",
  },
  toggleBox: {
    alignItems: "center",
    justifyContent: "center",
    height: "70%",
    paddingHorizontal: 59.5,
    borderRadius: 8,
    // width: "50%"
  },
});
