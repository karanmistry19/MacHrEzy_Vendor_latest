import React, { useContext } from "react";
import {
  ActivityIndicator,
  Platform,
  StatusBar,
  Text,
  View,
} from "react-native";
import { DimensionContext } from "../dimensionContext";
DimensionContext;
const PageLoader = ({ loading, showLoadingText = true }) => {
  const { window } = useContext(DimensionContext);
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height:
          Platform.OS === "web"
            ? "100%"
            : window.height + StatusBar.currentHeight || 24,
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        zIndex: 10,
      }}
    >
      <ActivityIndicator size="large" color="#3D0610" />
      {Boolean(showLoadingText) && (
        <Text style={{ color: "#000000", marginTop: 10 }}>Loading...</Text>
      )}
    </View>
  );
};

export default PageLoader;
