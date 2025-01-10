import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const Tab = ({
  displayContent,
  selectedTab,
  onTabChange,
  style,
  textStyle,
}) => {
  return (
    <View style={[styles.row, style]}>
      {displayContent.map((value) => (
        <TouchableOpacity
          key={value}
          onPress={() => {
            onTabChange(value);
          }}
          style={[
            selectedTab === value ? styles.selectedTabDesign : styles.tab,
            {
              width: 100 / displayContent?.length + "%",
              justifyContent: "center",
              borderWidth: 0.5,
              borderRightColor: "#7A7A7A",
            },
          ]}
        >
          <Text
            style={[
              styles.tabLabel,
              selectedTab === value && styles.selectedLabel,
              textStyle,
            ]}
          >
            {value}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    backgroundColor: "#D0D0D0",
    borderRadius: 5,
  },
  tab: {
    borderRadius: 5,
    textAlign: "center",
    paddingVertical: 7,
    paddingHorizontal: 7,
    // width: "50%",
  },
  selectedTabDesign: {
    elevation: 8,
    backgroundColor: "#9B2B2C",
    borderRadius: 5,
    textAlign: "center",
    paddingVertical: 7,
    paddingHorizontal: 7,
    // width: "50%",
    shadowColor: "#696969",
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 3 },
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#9B2B2C",
    alignSelf: "center",
  },
  selectedLabel: {
    color: "#D0D0D0",
  },
});
