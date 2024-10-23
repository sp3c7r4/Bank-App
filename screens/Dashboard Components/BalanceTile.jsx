import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useMemo, useState } from "react";
import { Colors } from "../../constants/Colors";
import BottomSheet from "@gorhom/bottom-sheet";

export function stylizeAmount(int) {
  let splits = int.toFixed(2).split(".");
  let division = Math.floor(String(splits[0]).length / 3);
  let convertedInteger = String(splits[0]);
  let value = "";
  for (let i = 0; i < division; i++) {
    let start = convertedInteger.length - 3 * (i + 1);
    let end = convertedInteger.length - 3 * i;
    value = "," + convertedInteger.slice(start, end) + value;
  }
  value = convertedInteger.slice(0, convertedInteger.length % 3) + value;
  if (value.startsWith(",")) {
    value = value.slice(1);
  }
  // return value
  return value + `.${splits[1]}`;
}

export default function BalanceTile({
  userInfo,
  moneyTransfer,
  moneyDeposit,
  moneyWithdraw,
  cryptoSwap,
  cryptoDeposit,
  cryptoP2P,
}) {
  const [swap, setSwap] = useState(false);

  // const snapPoints = useMemo(() => ["25%", "50%", "70%"], []);
  return (
    <View style={{ flex: 1 }}>
      {swap ? (
        <CryptoTile
          swap={swap}
          setSwap={setSwap}
          userInfo={userInfo}
          cryptoSwap={cryptoSwap}
          cryptoP2P={cryptoP2P}
          cryptoDeposit={cryptoDeposit}
        />
      ) : (
        <BalancesTile
          swap={swap}
          setSwap={setSwap}
          moneyTransfer={moneyTransfer}
          moneyWithdraw={moneyWithdraw}
          moneyDeposit={moneyDeposit}
          userInfo={userInfo}
        />
      )}
    </View>
  );
}

const BalancesTile = ({
  swap,
  setSwap,
  userInfo,
  moneyDeposit,
  moneyTransfer,
  moneyWithdraw,
}) => {
  return (
    <View style={styles.container}>
      {/* <View style={{ alignItems: "center" }}>
        <Image
          source={require("./../../assets/images/money_bag.png")}
          style={{ width: 40, height: 40 }}
        />
        <Text style={{ fontFamily: "outfit-bold" }}>Asset</Text>
      </View> */}
      <View style={{ position: "absolute", right: 5, top: 5 }}>
        {/* <View style={{ position: "absolute", right: 25, top: 20 }}> */}
        <TouchableOpacity
          onPress={() => setSwap(!swap)}
          style={styles.swapButton}
        >
          <View
            style={{ backgroundColor: "white", borderRadius: 100, padding: 5 }}
          >
            <Image
              source={require("./../../assets/images/swap.png")}
              resizeMode="contain"
              style={{ width: 25, height: 25 }}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          // backgroundColor: Colors.APPCOLOR,
          height: 90,
          // alignItems: "center",
          // justifyContent: "center",
        }}
      >
        <Text
          style={{ color: "#fff", fontFamily: "outfit-medium", fontSize: 15 }}
        >
          Available Balance
        </Text>
        <Text
          style={{ color: "#fff", fontFamily: "outfit-black", fontSize: 30 }}
        >
          ${stylizeAmount(userInfo?.balance)}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "flex-end",
          }}
        >
          <Text
            style={{ color: "#fff", fontFamily: "outfit-medium", fontSize: 15 }}
          >
            ID: {userInfo?.accnumber}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginTop: 5,
        }}
      >
        {/* Balance Transfer */}
        <TouchableOpacity onPress={moneyTransfer}>
          <View
            style={{
              backgroundColor: "white",
              padding: 7,
              borderRadius: 20,
              width: 85,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "outfit-medium",
                color: Colors.APPCOLOR,
                fontWeight: 700,
              }}
            >
              Transfer
            </Text>
          </View>
        </TouchableOpacity>
        {/* Balance Deposit */}
        <TouchableOpacity onPress={moneyDeposit}>
          <View
            style={{
              backgroundColor: Colors.APPDARKCOLOR,
              padding: 7,
              borderRadius: 20,
              width: 85,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontFamily: "outfit-medium", color: "#fff" }}>
              Deposit
            </Text>
          </View>
        </TouchableOpacity>
        {/* Balance Withdraw */}
        <TouchableOpacity onPress={moneyWithdraw}>
          <View
            style={{
              backgroundColor: "white",
              padding: 7,
              borderRadius: 20,
              width: 85,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{ fontFamily: "outfit-medium", color: Colors.APPCOLOR }}
            >
              Withdraw
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

function CpSelector({ coin, displayCp, setDisplayCp }) {
  return (
    <TouchableOpacity
      style={[
        displayCp === coin
          ? { color: "white", backgroundColor: Colors.APPDARKCOLOR }
          : { color: Colors.APPDARKCOLOR },
        {
          paddingTop: 15,
          paddingBottom: 5,
          paddingHorizontal: 20,
          fontSize: 12,
          borderTopRightRadius: 100,
          borderTopLeftRadius: 100,
        },
      ]}
      onPress={() => setDisplayCp(coin)}
    >
      <Text
        style={[
          displayCp === coin
            ? { color: "white" }
            : { color: Colors.APPDARKCOLOR },
          { fontSize: 12, fontFamily: "outfit-medium" },
        ]}
      >
        {coin.toUpperCase()}
      </Text>
    </TouchableOpacity>
  );
}
const CryptoTile = ({
  setSwap,
  swap,
  userInfo,
  cryptoSwap,
  cryptoDeposit,
  cryptoP2P,
}) => {
  const [displayCp, setDisplayCp] = useState("btc");
  const cryproArray = ["btc", "eth", "bnb", "usdt"];
  return (
    <View style={[styles.container2, { justifyContent: "space-between" }]}>
      {/* <View style={{ alignItems: "center" }}>
        <Image
          source={require("./../../assets/images/crypto_bag.png")}
          style={{ width: 40, height: 40 }}
        />
        <Text style={{ fontFamily: "outfit-bold" }}>Crypto</Text>
      </View> */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          // paddingHorizontal: 15,
        }}
      >
        {cryproArray.map((item) => (
          <CpSelector
            key={item}
            coin={item}
            displayCp={displayCp}
            setDisplayCp={setDisplayCp}
          />
        ))}
        {/* <TouchableOpacity
          style={[
            displayCp === "eth"
              ? { color: "white", backgroundColor: Colors.APPDARKCOLOR }
              : { color: Colors.APPDARKCOLOR },
            { padding: 10, fontSize: 12 },
          ]}
          onPress={() => setDisplayCp("eth")}
        >
          <Text
            style={[
              displayCp === "eth"
                ? { color: "white" }
                : { color: Colors.APPDARKCOLOR },
              { fontSize: 12 },
            ]}
          >
            ETH
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            displayCp === "bnb"
              ? { color: "white" }
              : { color: Colors.APPDARKCOLOR },
            { fontSize: 12 },
          ]}
          onPress={() => setDisplayCp("bnb")}
        >
          <Text
            style={[
              displayCp === "bnb"
                ? { color: "white" }
                : { color: Colors.APPDARKCOLOR },
              { fontSize: 12 },
            ]}
          >
            BNB
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            displayCp === "usdt"
              ? { color: "white" }
              : { color: Colors.APPDARKCOLOR },
            { fontSize: 12 },
          ]}
          onPress={() => setDisplayCp("usdt")}
        >
          <Text
            style={[
              displayCp === "usdt"
                ? { color: "white", backgroundColor: Colors.APPDARKCOLOR }
                : { color: Colors.APPDARKCOLOR },
              { padding: 10, fontSize: 12 },
            ]}
          >
            USDT
          </Text>
        </TouchableOpacity> */}
      </View>
      <View
        style={{
          backgroundColor: Colors.APPDARKCOLOR,
          // backgroundColor: "green",
          width: "100%",
          borderRadius: 10,
          borderTopLeftRadius: displayCp === "btc" ? 0: 10,
          borderTopRightRadius: displayCp === "usdt" ? 0: 10,
          position: "relative",
          flex: 1,
          paddingHorizontal: 15,
        }}
      >
        <View style={{ position: "absolute", right: 5, top: 5 }}>
          <TouchableOpacity
            onPress={() => setSwap(!swap)}
            style={styles.swapButton}
          >
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 100,
                padding: 5,
              }}
            >
              <Image
                source={require("./../../assets/images/swap.png")}
                resizeMode="contain"
                style={{ width: 25, height: 25 }}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: "transparent",
            // height: 90,
            // alignItems: "center",
          }}
        >
          <View style={{ gap: 10 }}>
            <View>
              {/* <Text style={{ color: "black", fontFamily: "outfit-black" }}>
              BTC
            </Text> */}

              <View
                style={{
                  // flexDirection: "row",
                  paddingVertical: 10,
                }}
              >
                <Text
                  style={{
                    fontFamily: "outfit-medium",
                    fontSize: 20,
                    color: Colors.APPCOLOR,
                  }}
                >
                  {displayCp.toUpperCase()}
                </Text>
                <Text
                  style={{
                    fontFamily: "outfit-black",
                    fontSize: 25,
                    color: "white",
                  }}
                >
                  {displayCp === "btc" &&
                    (userInfo?.cryptos[0]?.btc_balance
                      ? userInfo?.cryptos[0]?.btc_balance.toFixed(6)
                      : "0.00")}
                  {displayCp === "eth" &&
                    (userInfo?.cryptos[0]?.eth_balance
                      ? userInfo?.cryptos[0]?.eth_balance.toFixed(6)
                      : "0.00")}
                  {displayCp === "bnb" &&
                    (userInfo?.cryptos[0]?.bnb_balance
                      ? userInfo?.cryptos[0]?.bnb_balance.toFixed(6)
                      : "0.00")}
                  {displayCp === "bnb" &&
                    (userInfo?.cryptos[0]?.usdt_balance
                      ? userInfo?.cryptos[0]?.usdt_balance.toFixed(6)
                      : "0.00")}
                </Text>
              </View>
            </View>
          </View>
          {/* <Text
          style={{
            color: "#000",
            fontFamily: "outfit-black",
            fontSize: 30,
            marginTop: 10,
          }}
        >
          ${stylizeAmount(userInfo?.balance)}
        </Text> */}
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginTop: 5,
          }}
        >
          {/*Crypto Transfer*/}
          <TouchableOpacity onPress={cryptoSwap}>
            <View
              style={{
                backgroundColor: "white",
                padding: 7,
                borderRadius: 20,
                width: 85,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "outfit-medium",
                  color: Colors.APPCOLOR,
                  fontWeight: 700,
                }}
              >
                Swap
              </Text>
            </View>
          </TouchableOpacity>
          {/*Crypto Deposit*/}
          <TouchableOpacity onPress={cryptoDeposit}>
            <View
              style={{
                backgroundColor: Colors.APPCOLOR,
                padding: 7,
                borderRadius: 20,
                width: 85,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontFamily: "outfit-medium", color: "#fff" }}>
                Deposit
              </Text>
            </View>
          </TouchableOpacity>
          {/*Crypto Withdraw*/}
          <TouchableOpacity onPress={cryptoP2P}>
            <View
              style={{
                backgroundColor: "white",
                padding: 7,
                borderRadius: 20,
                width: 85,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "outfit-medium",
                  color: Colors.APPCOLOR,
                  fontWeight: 700,
                }}
              >
                P2P
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    backgroundColor: Colors.APPCOLOR,
    // backgroundColor: "green",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    position: "relative",
    flex: 0.9,
  },
  container2: {
    marginTop: 15,
    // backgroundColor: "green",
    width: "100%",
    borderRadius: 10,
    position: "relative",
    flex: 1,
  },
});
