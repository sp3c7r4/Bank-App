import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Image,
  TextInput,
} from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";

export default function CustomSettingsHeader({ userInfo }) {
  return (
    <View>
      <View style={styles.customHeader}>
        <StatusBar
          barStyle={"dark-content"}
          hidden={false}
          backgroundColor={"#fff"}
        />
        <View>
          <Text style={{ fontFamily: "outfit-bold", fontSize: 20 }}>
            Settings
          </Text>
          <View
            style={{
              height: 40,
              backgroundColor: "#f0f2f5",
              width: "100%",
              borderRadius: 10,
              alignItems: "center",
              marginTop: 10,
              flexDirection: "row",
            }}
          >
            <View style={{ marginLeft: 10, opacity: 0.7 }}>
              <Image
                style={{ width: 22, height: 22 }}
                source={require("./../../assets/images/search.png")}
              />
            </View>
            <View style={{ marginLeft: 10 }}>
              <TextInput
                selectionColor="#BDFFD3"
                style={{ fontFamily: "outfit", width: 250 }}
                placeholder="search"
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  customHeader: {
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    paddingTop: StatusBar.currentHeight + 10,
    marginBottom: 5,
    paddingBottom: 10,
    gap: 10,
    justifyContent: "space-between",
  },
});
