import { View, Text, TextInput, StyleSheet, Image } from "react-native";
import React from "react";
import { Colors } from "../constants/Colors";

export default function InputBox({
  name,
  placeholder,
  image,
  handleTextChange,
  value,
  type,
  extraStyle
}) {
  return (
    <View style={[styles.container, extraStyle]}>
      <View style={styles.inputContainer}>
        <TextInput
          keyboardType={type === "number" ? "number-pad" : "default"}
          autoCapitalize={
            type === "password" || type === "email" ? false : true
          }
          value={value}
          onChangeText={handleTextChange}
          style={styles.textInput}
          placeholder={placeholder || name}
          secureTextEntry={type === "password" ? true : false}
          placeholderTextColor={Colors.PLACEHOLDERTEXT} // Optional: Define a placeholder text color in your Colors
        />
        {/* <View style={styles.iconContainer}>
          <Image
            style={styles.icon}
            resizeMode="contain"
            source={image}
            accessible={true}
            accessibilityLabel={name}
          />
        </View> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    fontFamily: "outfit-bold",
    fontSize: 14,
    height: 50,
    width: "100%",
    backgroundColor: Colors.INPUTBOX,
    // borderWidth: 2,
    // borderColor: Colors.BOXOUTLINE,
    // borderTopLeftRadius: 10,
    // borderBottomLeftRadius: 10,
    borderRadius: 10,
    paddingVertical: 5,
    paddingLeft: 10,
  },
  iconContainer: {
    width: 50,
    height: 50,
    backgroundColor: Colors.APPCOLOR,
    justifyContent: "center",
    alignItems: "center",
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    marginLeft: -5,
  },
  icon: {
    width: 22,
    height: 22,
  },
});
