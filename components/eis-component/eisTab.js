import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { DimensionContext } from "../dimensionContext";
import Icon from "../icons";

export default function Eistab({
  backgroundColor,
  iconName,
  header,
  personalInfo,
  border,
  selectedTab,
  value,
  isTab,
}) {
  const { window } = useContext(DimensionContext);
  return (
    <View style={styles.container}>
      {isTab ? (
        <View style={styles.wrapper}>
          <View
            style={[
              styles.circle,
              selectedTab === value.value
                ? styles.borderCicle
                : styles.selectedCir,
              {
                backgroundColor: backgroundColor || "#fff",
                borderRadius: 50,
              },
            ]}
          >
            <Icon
              fill={selectedTab === value.value ? "#ffba00" : "#000"}
              name={iconName}
            ></Icon>
          </View>
          <Text
            allowFontScaling={true}
            adjustsFontSizeToFit={true}
            style={styles.text}
          >
            {header}
          </Text>
        </View>
      ) : (
        <View style={styles.wrapper}>
          <View
            style={[
              [
                styles.circle,
                {
                  height: window.width < 600 ? 60 : window.width / 33,

                  width: window.width < 600 ? 60 : window.width / 33,
                },
              ],

              { backgroundColor: backgroundColor },
            ]}
          >
            <Icon
              height={window.width < 600 ? 20 : window.width / 50}
              width={window.width < 600 ? 20 : window.width / 50}
              name={iconName}
            ></Icon>
          </View>
          <View>
            <Text
              allowFontScaling={true}
              adjustsFontSizeToFit={true}
              style={[
                styles.text,
                { fontSize: window.width < 1000 ? 12 : window.width * 0.009 },
              ]}
            >
              {header}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    minHeight: 100,
    // justifyContent: "center",
    alignItems: "center",
    width: 80,
  },
  container: {
    flex: 1,
    margin: 5,
    // marginBottom: 10,
    justifyContent: "center",
  },
  circle: {
    margin: 5,
    backgroundColor: "#fff",
    shadowColor: "#696969",
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 5,
    shadowOffset: { width: 1, height: 1 },
    height: 36,
    width: 36,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    // alignSelf: "center",
    marginTop: 3,
  },

  borderCicle: {
    borderColor: "#ffba00",
    borderWidth: 1,
  },
});
