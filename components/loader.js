import React, { useContext, useEffect } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  Platform,
  StatusBar,
  Image,
} from "react-native";
import { connect } from "react-redux";
DimensionContext;
import { doneLoading } from "../redux/actions/loading.action";
import { DimensionContext } from "./dimensionContext";
const Loader = ({ loadingReqs, doneLoading }) => {
  useEffect(() => {
    loadingReqs.forEach((l) => {
      setTimeout(() => {
        doneLoading(l);
      }, 6000);
    });
  }, [loadingReqs]);
  const { window, screen } = useContext(DimensionContext);
  return loadingReqs.length > 0 ? (
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
        backgroundColor: "#00000080",
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        zIndex: 10,
      }}
    >
      {/* <Image
        style={{
          height: 25,
          width: 25,
          position: "absolute",
          bottom: "50%",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
        source={require("../assets/mlogo.png")}
      ></Image> */}
      <ActivityIndicator size="large" color="#3D0610" />
      <Text style={{ color: "#ffffff", marginTop: 10 }}>Loading...</Text>
    </View>
  ) : (
    <></>
  );
};

const mapStateToProps = ({ loadingReqs }) => ({ loadingReqs });

export default connect(mapStateToProps, { doneLoading })(Loader);
