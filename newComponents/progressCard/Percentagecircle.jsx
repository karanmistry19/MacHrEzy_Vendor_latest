import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
const propStyle = (percent, base_degrees) => {
  let rotateBy = base_degrees + percent * 3.6;
  return {
    transform: [{ rotateZ: `${rotateBy}deg` }],
  };
};

const WidthHeightCircle = (W, H, BW) => {
  return {
    width: W,
    height: H,
    borderWidth: BW,
  };
};
function BorderRadius(W) {
  return (70 / 120) * W;
}

function OffsetBorderRadius(W) {
  return BorderRadius(W) * 1.2; //0.86
}
function firstProgressBorderColor(percent) {
  if (percent == 0) {
    return {
      borderRightColor: "#D2C9F9",
      borderTopColor: "#D2C9F9",
    };
  }
  return {
    borderRightColor: "#9F232B",
    borderTopColor: "#9F232B",
  };
}
const renderThirdLayer = (percent, W, H, BW) => {
  if (percent > 50) {
    return (
      <View
        style={[
          styles(W).secondProgressLayer,
          propStyle(percent - 50, 45),
          WidthHeightCircle(W, H, BW),
        ]}
      ></View>
    );
  } else {
    return (
      <View
        style={[
          styles(Platform.OS === "android" ? W * 0.7 : W).offsetLayer,
          WidthHeightCircle(W, H, BW),
        ]}
      ></View>
    );
  }
};
const Percentagecircle = ({ percent = 20, W = 120, H = 120, BW = 10 }) => {
  let firstProgressLayerStyle;
  if (percent > 100) {
    percent = 100;
  }
  if (percent > 50) {
    firstProgressLayerStyle = propStyle(50, -135);
  } else {
    firstProgressLayerStyle = propStyle(percent, -135);
  }
  function ShadowProp() {
    return {
      shadowColor: "#101e73",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.21,
      shadowRadius: 3.05,
      elevation: 3,
    };
  }
  return (
    <View style={[styles(W).container, WidthHeightCircle(W, H, BW)]}>
      <View
        style={[
          styles(W).firstProgressLayer,
          firstProgressLayerStyle,
          WidthHeightCircle(W, H, BW),
          firstProgressBorderColor(percent),
        ]}
      ></View>
      <View
        style={[
          {
            borderWidth: 0,
            padding: Platform.OS === "android" ? 5 : 5,
            borderRadius: 100,
            height: W * (W < 567 ? 0.5 : 0.4),
            width: W * (W < 567 ? 0.5 : 0.4),
            backgroundColor: "#FFFFFF",
            alignItems: "center",
            justifyContent: "center",
          },
          ShadowProp(),
        ]}
      >
        <Text
          style={[
            styles(W).percentText,
            { fontSize: Platform.OS === "android" ? W * 0.12 : W * 0.15 },
          ]}
        >
          {percent}%
        </Text>
      </View>
      {renderThirdLayer(percent, W, H, BW)}
    </View>
  );
};

const styles = (W) =>
  StyleSheet.create({
    container: {
      position: "relative",
      borderRadius: BorderRadius(W),
      borderColor: "#D2C9F9",
      justifyContent: "center",
      alignItems: "center",
    },
    firstProgressLayer: {
      borderRadius: BorderRadius(W) * 0.85,
      position: "absolute",
      borderLeftColor: "transparent",
      borderBottomColor: "transparent",
      borderRightColor: "#9F232B",
      borderTopColor: "#9F232B",
      transform: [{ rotateZ: "45deg" }],
    },
    secondProgressLayer: {
      position: "absolute",
      borderRadius: BorderRadius(W) * 0.85,
      borderLeftColor: "transparent",
      borderBottomColor: "transparent",
      borderRightColor: "#9F232B",
      borderTopColor: "#9F232B",
      transform: [{ rotateZ: "45deg" }],
    },
    offsetLayer: {
      position: "absolute",
      borderRadius: OffsetBorderRadius(W),
      borderLeftColor: "transparent",
      borderBottomColor: "transparent",
      borderRightColor: "#D2C9F9",
      borderTopColor: "#D2C9F9",
      transform: [{ rotateZ: "-135deg" }],
    },
    percentText: {
      fontWeight: "bold",
      color: "#9F232B",
    },
  });

export default Percentagecircle;
