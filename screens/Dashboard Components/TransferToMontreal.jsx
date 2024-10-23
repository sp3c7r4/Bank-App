import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { Colors } from "../../constants/Colors";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { UserContext } from "../../context/UserContext";
import useRefetchUser from "../../hooks/useRefetchUser";

export default function TransferToMontreal({ navigation }) {
  const { height, width } = Dimensions.get("window");
  const {currentUser} = useContext(UserContext)
  const bottomSheetRef = useRef(null);
  const [amount, setAmount] = useState("");
  const [pin, setPinState] = useState([]);
  const [recipientAccount, setRecipientAccount] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const {refetchUser} = useRefetchUser(setIsLoading)
  // const pin = []
  
  useEffect(function(){
    async function submitPin() {
      if (pin.length !== 4) {
        return
      }
      console.log("checking...")
      const pinForTrans = pin.join("")

      try {
        setIsLoading(true)
        const transactionSetResponse = await axios.post(
          `https://api.montrealtriustfinancial.online/currency/money/send`,
          {
            email: currentUser?.email,
            accountNumber: Number(recipientAccount),
            amount: Number(amount),
            pin: Number(pinForTrans)
          }
        );
        console.log(transactionSetResponse);
        
        if (transactionSetResponse.status >= 200 && transactionSetResponse.status < 300) {
          if(transactionSetResponse.data.message.toLowerCase() === "transaction successful"){
            // setconfirmPinForAmount(false);
            // setReceiptPage(true);
            setIsLoading(false)
            refetchUser();
          }else{
            setIsLoading(false)
            // setconfirmPinForAmount(false);
            // setFailedReceiptPage(true)
          }
          // localStorage.removeItem("transactions");
          // localStorage.removeItem("transactions_timestamp");
          return;
        }
      } catch (err) {
        console.log(err)
      }
    }
    submitPin()
  }, [pin])
  async function setPin(input){
    if (pin.length !== 4) {
      const newPin = [...pin, input];
      setPinState(newPin);
    }
    
  };
  const stylizeAmounts = (intake) => {
    let input = intake.replace(/,/g, ""); // Remove all commas
    let value = parseFloat(input).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    setAmount(value);
  };
  const removePin = () => {
    setPinState((prevPin) => {
      const newPin = [...prevPin];
      newPin.pop();
      return newPin;
    });
  };
  const snapPoints = ["57%"];
  function handlePresentModal() {
    bottomSheetRef.current?.present();
  }
  function closePresentModal() {
    bottomSheetRef.current?.close();
    setPinState([]);
  }
  return (
    <View style={{ backgroundColor: "#f8f8fb", flex: 1, paddingHorizontal: 20 }}>
      <View>
        <View>
          <Pressable
            onPress={() => navigation.navigate("Tab", { screen: "Home" })}
          >
            <Image
              style={{ width: 30, height: 30, marginTop: 20 }}
              source={require("./../../assets/images/back_button_green.png")}
            />
          </Pressable>
        </View>
        <View
          style={{
            backgroundColor: "white",
            marginTop: 20,
            width: "100%",
            borderRadius: 12,
            paddingHorizontal: 15,
            paddingVertical: 20,
          }}
        >
          <View>
            <Text style={{ fontFamily: "outfit-bold" }}>Recipient Account</Text>
            <View
              style={{
                backgroundColor: "#fff",
                borderRadius: 8,
                padding: 5,
                paddingLeft: 15,
                marginTop: 5,
              }}
            >
              <TextInput onChangeText={setRecipientAccount} placeholder="eg. 12345678" />
            </View>
            {/*<Text style={{fontFamily: "outfit-medium", alignSelf: "flex-end", color: Colors.APPCOLOR, fontSize: 12, marginVertical: 3}}>HABEEB OKE</Text> */}
          </View>
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 8,
              paddingHorizontal: 15,
              paddingTop: 15,
              marginTop: 5,
              height: height * 0.2,
            }}
          >
            <View
              style={{ gap: 8, flexDirection: "row", alignItems: "center" }}
            >
              <Text style={{ fontFamily: "outfit-bold" }}>Amount</Text>
              <View
                style={{
                  backgroundColor: "#E3FFEE",
                  borderRadius: 4,
                  height: 16,
                }}
              >
                <Text
                  style={{
                    color: Colors.APPCOLOR,
                    marginHorizontal: 5,
                    marginVertical: 3,
                    fontSize: 8,
                    fontFamily: "outfit",
                  }}
                >
                  No transaction fees
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <View
                style={{
                  backgroundColor: "#f0f2f5",
                  borderRadius: 8,
                  padding: 5,
                  marginTop: 5,
                  width: 30,
                  height: 40,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    color: "#111",
                    fontFamily: "outfit-medium",
                  }}
                >
                  $
                </Text>
              </View>
              <View
                style={{
                  padding: 5,
                  paddingLeft: 0,
                  marginTop: 5,
                  height: 40,
                  width: "80%",
                  flex: 1,
                  borderBottomColor: Colors.APPCOLOR,
                  borderBottomWidth: 1,
                }}
              >
                <TextInput
                  inputMode="numeric"
                  placeholder="$0.00 - 1,000,000"
                  value={amount}
                  onChangeText={(text) => setAmount(text)}
                />
              </View>
            </View>
            <View
              style={{
                marginTop: 12.5,
                marginBotom: 0,
                paddingBottom: 0,
                flexDirection: "row",
                gap: 5,
              }}
            >
              {["$500", "$1000", "$1500", "$2000"].map((amount, index) => (
                <View
                  key={index}
                  style={{
                    backgroundColor: Colors.APPCOLOR,
                    borderWidth: 1.5,
                    borderRadius: 10,
                    paddingHorizontal: 11,
                    height: 30,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontFamily: "outfit-medium", fontSize: 12 }}>
                    {amount}
                  </Text>
                </View>
              ))}
            </View>
          </View>
          <TouchableOpacity onPress={() => handlePresentModal()}>
            <View
              style={{
                backgroundColor: Colors.APPCOLOR,
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 10,
                paddingVertical: 10,
                borderRadius: 8,
              }}
            >
              <Text style={{ fontFamily: "outfit-medium" }}>Confirm</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <BottomSheetModalProvider>
        <View>
          <BottomSheetModal
            ref={bottomSheetRef}
            handleIndicatorStyle={{ display: "none" }}
            index={0}
            enablePanDownToClose={true}
            snapPoints={snapPoints}
            backdropComponent={({ style }) => <View style={styles.backdrop} />}
            backgroundStyle={styles.bottomSheetBackground}
          >
            {/*Header*/}
            <View>
              <View>
                <Text
                  style={{
                    textAlign: "center",
                    fontFamily: "outfit-medium",
                    marginTop: 5,
                  }}
                >
                  Enter Payment PIN
                </Text>
              </View>
              <View>
                <Pressable onPress={() => closePresentModal()}>
                  <Image
                    style={{
                      width: 20,
                      height: 20,
                      alignSelf: "flex-end",
                      position: "absolute",
                      bottom: 2,
                      right: 10,
                    }}
                    source={require("./../../assets/images/close_button_green_1.png")}
                  />
                </Pressable>
              </View>
            </View>
            {/*End Header*/}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginHorizontal: 50,
                marginTop: 15,
              }}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: "#f0f2f5",
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 10,
                }}
              >
                <Text
                  style={{
                    fontFamily: "outfit-bold",
                    fontSize: 15,
                    color: "#000",
                  }}
                >
                  {pin[0]}
                </Text>
              </View>
              <View
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: "#f0f2f5",
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 10,
                }}
              >
                <Text style={{ fontFamily: "outfit-bold", fontSize: 17 }}>
                  {pin[1]}
                </Text>
              </View>
              <View
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: "#f0f2f5",
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 10,
                }}
              >
                <Text style={{ fontFamily: "outfit-bold", fontSize: 17 }}>
                  {pin[2]}
                </Text>
              </View>
              <View
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: "#f0f2f5",
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 10,
                }}
              >
                <Text style={{ fontFamily: "outfit-bold", fontSize: 17 }}>
                  {pin[3]}
                </Text>
              </View>
            </View>

            <View
              style={{
                backgroundColor: "white",
                width: "100%",
                flex: 1,
                marginTop: 20,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  marginVertical: 5,
                  fontFamily: "outfit",
                  fontStyle: "italic",
                }}
              >
                Secured by Montreal encrypt
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  margin: 5,
                }}
              >
                <TouchableOpacity onPress={() => setPin("1")}>
                  <View
                    style={{
                      backgroundColor: "#f8f8fb",
                      borderRadius: 10,
                      padding: 10,
                      alignItems: "center",
                      justifyContent: "center",
                      width: width * 0.3,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "outfit-bold",
                        fontSize: 20,
                        color: Colors.APPDARKCOLOR,
                      }}
                    >
                      1
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setPin("2")}>
                  <View
                    style={{
                      backgroundColor: "#f8f8fb",
                      borderRadius: 10,
                      padding: 10,
                      alignItems: "center",
                      justifyContent: "center",
                      width: width * 0.3,
                    }}
                  >
                    <Text style={{ fontFamily: "outfit-bold", fontSize: 20 }}>
                      2
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setPin("3")}>
                  <View
                    style={{
                      backgroundColor: "#f8f8fb",
                      borderRadius: 10,
                      padding: 10,
                      alignItems: "center",
                      justifyContent: "center",
                      width: width * 0.3,
                    }}
                  >
                    <Text style={{ fontFamily: "outfit-bold", fontSize: 20 }}>
                      3
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  margin: 5,
                }}
              >
                <TouchableOpacity onPress={() => setPin("4")}>
                  <View
                    style={{
                      backgroundColor: "#f8f8fb",
                      borderRadius: 10,
                      padding: 10,
                      alignItems: "center",
                      justifyContent: "center",
                      width: width * 0.3,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "outfit-bold",
                        fontSize: 20,
                        color: Colors.APPDARKCOLOR,
                      }}
                    >
                      4
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setPin("5")}>
                  <View
                    style={{
                      backgroundColor: "#f8f8fb",
                      borderRadius: 10,
                      padding: 10,
                      alignItems: "center",
                      justifyContent: "center",
                      width: width * 0.3,
                    }}
                  >
                    <Text style={{ fontFamily: "outfit-bold", fontSize: 20 }}>
                      5
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setPin("6")}>
                  <View
                    style={{
                      backgroundColor: "#f8f8fb",
                      borderRadius: 10,
                      padding: 10,
                      alignItems: "center",
                      justifyContent: "center",
                      width: width * 0.3,
                    }}
                  >
                    <Text style={{ fontFamily: "outfit-bold", fontSize: 20 }}>
                      6
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  margin: 5,
                }}
              >
                <TouchableOpacity onPress={() => setPin("7")}>
                  <View
                    style={{
                      backgroundColor: "#f8f8fb",
                      borderRadius: 10,
                      padding: 10,
                      alignItems: "center",
                      justifyContent: "center",
                      width: width * 0.3,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "outfit-bold",
                        fontSize: 20,
                        color: Colors.APPDARKCOLOR,
                      }}
                    >
                      7
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setPin("8")}>
                  <View
                    style={{
                      backgroundColor: "#f8f8fb",
                      borderRadius: 10,
                      padding: 10,
                      alignItems: "center",
                      justifyContent: "center",
                      width: width * 0.3,
                    }}
                  >
                    <Text style={{ fontFamily: "outfit-bold", fontSize: 20 }}>
                      8
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setPin("9")}>
                  <View
                    style={{
                      backgroundColor: "#f8f8fb",
                      borderRadius: 10,
                      padding: 10,
                      alignItems: "center",
                      justifyContent: "center",
                      width: width * 0.3,
                    }}
                  >
                    <Text style={{ fontFamily: "outfit-bold", fontSize: 20 }}>
                      9
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  margin: 5,
                }}
              >
                <TouchableOpacity onPress={() => setPin("0")}>
                  <View
                    style={{
                      backgroundColor: "#f8f8fb",
                      borderRadius: 10,
                      padding: 10,
                      alignItems: "center",
                      justifyContent: "center",
                      width: width * 0.63,
                    }}
                  >
                    <Text style={{ fontFamily: "outfit-bold", fontSize: 20 }}>
                      0
                    </Text>
                  </View>
                </TouchableOpacity>
               
                <Pressable onPress={() => removePin()}>
                  <View
                    style={{
                      backgroundColor: "#f8f8fb",
                      borderRadius: 10,
                      padding: 10,
                      alignItems: "center",
                      justifyContent: "center",
                      width: width * 0.3,
                    }}
                  >
                    <Image
                      style={{ width: 30, height: 30 }}
                      resizeMode="contain"
                      source={require("./../../assets/images/back_space_1.png")}
                    />
                  </View>
                </Pressable>
              </View>
            </View>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Faint gray/black background
  },
  bottomSheetBackground: {
    backgroundColor: "#fff",
  },
});
