import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import Avatar from "./avatar";
import Icon from "./icons";

export const EISCard = ({
  description,
  iconName,
  imageUrl,
  fill,
  fullWidth,
  navigateTo,
  navigation,
}) => {
  const { width } = useWindowDimensions();

  return (
    <Pressable
      style={[
        styles.card,
        {
          width: width * (fullWidth ? 1 : 0.5) - 20,
          padding: 10,
          height: width * 0.5 - (fullWidth ? 70 : 80),
        },
      ]}
      onPress={() => navigation.navigate(navigateTo)}
    >
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          width: "100%",
        }}
      >
        <View style={{ justifyContent: "space-evenly", marginLeft: 5 }}>
          <Icon fill={fill} name={iconName}></Icon>
          <Text style={styles.descriptionStyling}>{description}</Text>
        </View>
        {imageUrl ? (
          <View
            style={{
              justifyContent: "center",
            }}
          >
            <Avatar
              source={{
                uri: imageUrl,
              }}
              style={{
                marginRight: 5,
                borderRadius: 55,
                height: width * 0.25,
                width: width * 0.25,
              }}
            />
          </View>
        ) : (
          <></>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  displayCards: {
    minHeight: 102,
    minWidth: 141,
    borderRadius: 15,
    borderColor: "#707070",
    // shadowColor: "#EAEAEA",
    shadowColor: "#696969",
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 5,
    shadowOffset: { width: 3, height: 3 },
    paddingHorizontal: 10,
    paddingVertical: 12,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    color: "black",
    fontWeight: "bold",
    fontSize: 15,
  },
  descriptionStyling: {
    marginVertical: 5,
    fontSize: 20,
    fontWeight: "bold",
    alignItems: "flex-end",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  card: {
    minHeight: 120,
    minWidth: 141,
    borderRadius: 15,
    borderColor: "#707070",
    shadowColor: "#696969",
    backgroundColor: "#FFF",
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 5,
    shadowOffset: { width: 3, height: 3 },
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
});
