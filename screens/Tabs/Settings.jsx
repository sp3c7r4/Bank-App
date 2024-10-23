import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import CustomSettingsHeader from "../Settings/CustomSettingsHeader";
import { data } from "./Bank";
import { Colors } from "../../constants/Colors";
import EditUserINfo from "../Settings/EditUserINfo";
import IdentificationType from "../Settings/IdentificationType";
import { UserContext } from "../../context/UserContext";

const { height, width } = Dimensions.get("window");
// console.log(width)
export default function Settings() {
  const { currentUser } = useContext(UserContext);
  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <CustomSettingsHeader />
      <View
        style={{
          backgroundColor: "#f0f2f5",
          width: "95%",
          height: height * 0.1,
          marginHorizontal: 12,
          borderRadius: 10,
          padding: 5,
          alignItems: "center",
          flexDirection: "row",
          gap: 87,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 7 }}>
          <Image
            style={{ width: 53, height: 53, borderRadius: 50 }}
            source={{ uri: currentUser?.image_url }}
          />
          <View>
            <Text style={{ fontSize: 20, fontFamily: "outfit-bold" }}>
              {currentUser?.firstname} {currentUser?.lastname}
            </Text>
            <Text
              style={{
                marginTop: -5,
                fontSize: 10,
                fontFamily: "outfit-medium",
              }}
            >
              {currentUser?.firstname} {currentUser?.lastname}
            </Text>
          </View>
        </View>
        <View style={{ flex: 1, gap: 15 }}>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontFamily: "outfit-bold" }}>Active</Text>
            <View
              style={{
                position: "absolute",
                zIndex: 1,
                left: 42,
                top: 2,
                width: 15,
                height: 15,
                backgroundColor: "#E3FFEE",
                borderRadius: 50,
              }}
            ></View>
            <View
              style={{
                position: "absolute",
                zIndex: 2,
                left: 44.5,
                top: 4,
                width: 10,
                height: 10,
                backgroundColor: Colors.APPCOLOR,
                borderRadius: 50,
              }}
            ></View>
          </View>
          <Text
            style={{
              fontFamily: "outfit-medium",
              fontSize: 12,
              color: "#FFD700",
            }}
          >
            {currentUser?.level.toUpperCase()}
          </Text>
        </View>
      </View>
      <EditUserINfo />
      <IdentificationType />
    </View>
  );
}

const styles = StyleSheet.create({});
