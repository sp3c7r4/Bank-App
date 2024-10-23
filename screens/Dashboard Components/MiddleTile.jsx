import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";

export default function MiddleTile() {
  return (
    <View style={styles.container}>
      <View style={{ gap: 2 }}>
        <Text
          style={{
            fontSize: 12,
            color: Colors.APPCOLOR,
            fontFamily: "outfit-black",
          }}
        >
          Upgrade to
          <Text style={{ fontSize: 12, color: "#fff" }}> Premium </Text> /
          <Text style={{ fontSize: 12, color: "#fff" }}> Vip</Text>
        </Text>
        <Text
          style={{ fontSize: 10, color: "#fff", fontFamily: "outfit-medium" }}
        >
          Direct Deposit - $10,000
        </Text>
        <Text
          style={{ fontSize: 10, color: "#fff", fontFamily: "outfit-medium" }}
        >
          Get Started with us{" "}
          <Text style={{ fontFamily: "outfit-bold" }}>Today!</Text>
        </Text>
      </View>
      <View>
        <Image
          source={require("./../../assets/images/rocket.png")}
          style={{ width: 60, height: 60 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 15,
    backgroundColor: Colors.APPDARKCOLOR,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 65,
    flex: 1,
  },
});
