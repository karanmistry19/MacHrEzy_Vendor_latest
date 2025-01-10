import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import Icons from "../icons";

export const RoundInputBox = ({
  placeholder,
  secureTextEntry,
  placeholderTextColor,
  onChangeText,
  eyeIcon,
  onPressEye,
  iconName,
  value,
}) => {
  const [focused, setFocused] = useState(false);
  return (
    <View style={styles.screen}>
      {eyeIcon ? (
        <View
          style={{
            flexDirection: "row",
            width: 310,
            height: 45,
            borderRadius: 18,
            fontSize: 14,
            borderColor: "#C1C3C4",
            marginLeft: 7,
          }}
        >
          <TextInput
            style={{
              width: "97%",
              height: "100%",
              borderRadius: 18,
              borderWidth: 1.8,
              borderColor: "#C1C3C4",
              paddingHorizontal: 15,
              alignContent: "center",
              backgroundColor: "#fff",
            }}
            onFocus={() => setFocused(true)}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            placeholderTextColor={
              placeholderTextColor ? placeholderTextColor : "#AFAEBF"
            }
            onChangeText={(e) => {
              onChangeText(e);
            }}
            value={value}
          />
          {focused ? (
            <TouchableOpacity
              style={{
                position: "absolute",
                right: 20,
                top: 12,
              }}
              onPress={onPressEye}
              // style={{ postion: "absolute", right: 20,  }}
            >
              <Icons height={15} width={15} name={iconName}></Icons>
            </TouchableOpacity>
          ) : (
            <></>
          )}

          {/* <TextInput
            onFocus={() => setFocused(true)}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            placeholderTextColor={
              placeholderTextColor ? placeholderTextColor : "#AFAEBF"
            }
            onChangeText={(e) => {
              onChangeText(e);
            }}
          />
          {focused ? (
            <TouchableOpacity
              onPress={onPressEye}
              style={{ postion: "absolute", right: 20, top: 5 }}
            >
              <Icons name={iconName}></Icons>
            </TouchableOpacity>
          ) : (
            <></>
          )} */}
        </View>
      ) : (
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          placeholderTextColor={placeholderTextColor || "#AFAEBF"}
          onChangeText={(e) => {
            onChangeText(e);
          }}
          value={value}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: 300,
    height: 45,
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderWidth: 1.8,
    borderRadius: 18,
    fontSize: 14,
    borderColor: "#C1C3C4",
  },
});
