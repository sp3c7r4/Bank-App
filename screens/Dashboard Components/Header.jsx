import { View, Text, StatusBar, Image, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";

export default function Header({ userInfo }) {
  // const {currentUser} = useContext(UserContext);
  // console.log(currentUser)
  // console.log(userInfo?.image_url)
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={"dark-content"}
        hidden={false}
        backgroundColor={"#f8f8fb"}
      />
      <View style={{ flexDirection: "row" }}>
        <Image
          source={{ uri: userInfo?.image_url }}
          style={styles.profilePic}
        />
        <View style={{ flexDirection: "column", marginTop: -8 }}>
          <Text
            style={{ fontFamily: "outfit", paddingTop: 10, paddingLeft: 5 }}
          >
            Hello,
          </Text>
          <Text
            style={{ fontFamily: "outfit-bold", paddingLeft: 5, marginTop: -5 }}
          >
            {userInfo?.firstname}
          </Text>
        </View>
      </View>
      <View style={{ flexDirection: "row" }}>
        <View>
          <Image
            style={{ width: 30, height: 30, marginRight: 20 }}
            source={require("./../../assets/images/notification_test.png")}
          />
          <View
            style={{
              backgroundColor: "#FFB3C5",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 20,
              width: 20,
              height: 20,
              position: "absolute",
              right: 10,
              top: -3,
            }}
          >
            <Text
              style={{
                fontFamily: "outfit-bold",
                fontSize: 13,
                color: "#FF152C",
              }}
            >
              1
            </Text>
          </View>
        </View>
        <View>
          <Image
            style={{ width: 30, height: 30, marginRight: 20 }}
            source={require("./../../assets/images/help.gif")}
          />
          <View
            style={{
              backgroundColor: "#6EFFA2",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 20,
              width: 30,
              position: "absolute",
              right: 5,
            }}
          >
            <Text style={{ fontFamily: "outfit", fontSize: 10, color: "#fff" }}>
              Help
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    backgroundColor: "transparent",
    paddingTop: StatusBar.currentHeight - 10,
    // paddingTop: 20,
    paddingBottom: 10,
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
});
