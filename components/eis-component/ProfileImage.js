import { LinearGradient } from "expo-linear-gradient";
import React, { useContext } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { DimensionContext } from "../dimensionContext";

const ProfileImage = ({ empImage, name, designation }) => {
  const { window } = useContext(DimensionContext);
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.shadow,
          {
            width:
              window.width < 600
                ? 300
                : window.width > 600 && window.width < 1100
                ? window.width / 4
                : window.width > 1100 && window.width < 1200
                ? window.width / 3.7
                : window.width > 1200 && window.width < 1600
                ? window.width / 4
                : window.width / 4.9,
            height:
              window.width < 600
                ? 300
                : window.width > 600 && window.width < 1100
                ? window.width / 3.5
                : window.height / 2.4,
          },
        ]}
      >
        <Image
          style={[
            styles.Image,
            {
              width:
                window.width < 600
                  ? 300
                  : window.width > 600 && window.width < 1100
                  ? window.width / 4
                  : window.width > 1100 && window.width < 1200
                  ? window.width / 3.7
                  : window.width > 1200 && window.width < 1600
                  ? window.width / 4
                  : window.width / 4.9,
              height:
                window.width < 600
                  ? 300
                  : window.width > 600 && window.width < 1100
                  ? window.width / 3.5
                  : window.height / 2.4,
            },
          ]}
          source={{ uri: empImage }}
        ></Image>
        <View style={styles.empText}>
          <LinearGradient
            style={styles.gradientStyle}
            colors={["rgba(0,0,0,0.2)", "rgba(0,0,0,0.8)"]}
          >
            <Text style={styles.eName}>{name}</Text>
            <Text style={styles.eDesignation}>{designation}</Text>
          </LinearGradient>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  Image: {
    alignSelf: "center",

    borderRadius: 20,
  },
  shadow: {
    alignSelf: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: -3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    marginVertical: 10,
    borderRadius: 15,
  },
  eName: {
    fontSize: 22,
    flex: 1,
    color: "white",
    fontWeight: "bold",
    alignSelf: "center",
  },
  eDesignation: {
    fontSize: 22,
    fontStyle: "italic",
    color: "white",
    flex: 1,
  },
  empText: {
    width: "100%",
    bottom: 0,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    position: "absolute",
    overflow: "hidden",
  },
  gradientStyle: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 15,
  },
  container: {
    flex: 1,
  },
});
export default ProfileImage;
