import React from "react";
import {
  ImageBackground,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import Icon from "./icons";

const Card = ({
  info,
  description,
  iconName,
  imageSource,
  infoStyle,
  fill,
  renderInfo,
  widthChange,
  descriptionJsx,
  fixHeight,
}) => {
  const { width, height } = useWindowDimensions();

  return imageSource ? (
    <TouchableOpacity
      onPress={() => Linking.openURL("https://www.macleodspharma.com/")}
      style={{
        height: 195,
      }}
    >
      <ImageBackground
        resizeMode={"cover"}
        resizeMethod={"scale"}
        style={[
          styles.backImageContainer,
          {
            // minWidth: width > 700 ? 120 : width / 2 - 40,
            // maxWidth: width / 3,
            width:
              width < 1130 && width > 700
                ? (width - 180) / 2
                : width > 700
                  ? width * 0.2 - 45
                  : (width - 50) / 2 - 5,
            padding: 10,
            height: "100%",
          },
        ]}
        imageStyle={{ borderRadius: 15 }}
        // borderRadius={15}
        source={require("../assets/Rectangle.png")}
      />
    </TouchableOpacity>
  ) : (
    <View
      style={[
        styles.imageContainer,
        {
          minWidth:
            width < 1130 && width > 700
              ? (width - (widthChange ? 70 : 180)) / (widthChange ? 1 : 2)
              : width > 700
                ? 120
                : (width - 50) / 1.01 - 40,
          width:
            width < 1130 && width > 700
              ? (width - (widthChange ? 70 : 120)) / (widthChange ? 1 : 2)
              : width > 700
                ? width * (widthChange ? 0.57 : 0.3) - (widthChange ? 15 : 45)
                : width - 35,
          padding: 10,
          minHeight: fixHeight ? 150 : 195,
          maxHeight: fixHeight ? 150 : 210,
        },
      ]}
    >
      {!renderInfo ? (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text adjustsFontSizeToFit={true} style={infoStyle}>
            {info}
          </Text>
          <Icon fill={fill} name={iconName}></Icon>
        </View>
      ) : (
        renderInfo
      )}

      {descriptionJsx ? (
        descriptionJsx
      ) : (
        <Text
          numberOfLines={1}
          allowFontScaling={true}
          style={styles.descriptionStyling}
          adjustsFontSizeToFit={true}
        >
          {description}
        </Text>
      )}
    </View>
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
    fontSize: 18,
  },
  image: {
    height: "100%",
    width: "100%",
  },
  imageContainer: {
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
    justifyContent: "space-between",
  },
  backImageContainer: {
    minHeight: Platform.OS === "android" ? 140 : 120,
    minWidth: 141,
    borderRadius: 15,
    borderColor: "#707070",
    shadowColor: "#696969",
    backgroundColor: "#FFF",
    shadowOpacity: 1,
    elevation: 15,
    shadowRadius: 5,
    shadowOffset: { width: 7, height: 7 },
    justifyContent: "space-between",
  },
});

export default Card;
