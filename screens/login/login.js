import React, { useState } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  Linking,
  Platform,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { connect } from "react-redux";
import Button from "../../components/buttons/button";
import { RoundInputBox } from "../../components/inputBoxes/roundInputBox";
import { login } from "../../redux/actions/login.action";
const Login = ({ login }) => {
  const [empCode, setEmpCode] = useState("");
  const [password, setPassword] = useState("");
  const [hidePass, setHidePass] = useState(true);
  const { width, height } = useWindowDimensions();
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        // borderWidth: 2,
        // borderColor: "black",
      }}
    >
      {width >= 550 ? (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            // borderWidth: 2,
            // borderColor: "black",
          }}
        >
          <View style={styles.container1}>
            <ImageBackground
              source={require("../../assets/loginImage.jpeg")}
              style={styles.loginImage}
            ></ImageBackground>
          </View>
          <View style={styles.container2}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={require("../../assets/logo.png")}
                resizeMethod={"scale"}
                resizeMode={"contain"}
              />
            </View>
            <View style={styles.boxContainer}>
              <RoundInputBox
                placeholder={"Employee Code"}
                placeholderTextColor={"#43325D"}
                onChangeText={(e) => setEmpCode(e)}
              ></RoundInputBox>
            </View>
            <View style={styles.boxContainer}>
              <RoundInputBox
                iconName={hidePass ? "eyeSlash" : "eye"}
                onPressEye={() => setHidePass(!hidePass)}
                eyeIcon={true}
                placeholder={"Password"}
                secureTextEntry={hidePass ? true : false}
                placeholderTextColor={"#43325D"}
                onChangeText={(e) => setPassword(e)}
              ></RoundInputBox>
            </View>

            <View
              style={{
                marginTop: 25,
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <View style={{ marginRight: 5 }}>
                <Button
                  textStyle={{ marginHorizontal: 15, marginVertical: 3 }}
                  title={"Register"}
                  onPress={() =>
                    Linking.openURL(
                      "http://apps.macleods.in:8443/MacWeb/Mobile/Account/HRMSRegs.aspx"
                    )
                  }
                ></Button>
              </View>
              <View style={{ marginLeft: 5 }}>
                <Button
                  textStyle={{ marginHorizontal: 15, marginVertical: 3 }}
                  title={"Login"}
                  onPress={() => {
                    let obj = {
                      empCode: empCode,
                      password: password,
                    };
                    login(obj);
                  }}
                ></Button>
              </View>
            </View>
          </View>
          <Text style={styles.copyRight}>
            {"\u00A9"}Macleods Pharmaceutical Ltd.
          </Text>
        </View>
      ) : (
        <View style={styles.mobContainer1}>
          <ImageBackground
            source={require("../../assets/loginImage.jpeg")}
            style={styles.mobLoginImage}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.copyRight}>
                {"\u00A9"}Macleods Pharmaceutical Ltd.
              </Text>
            </View>
          </ImageBackground>

          <View style={styles.mobContainer2}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.mobImage}
                source={require("../../assets/logo.png")}
                resizeMethod={"scale"}
                resizeMode={"contain"}
              />
            </View>
            <View style={styles.mobBoxContainer}>
              <RoundInputBox
                placeholder={"Employee Code"}
                placeholderTextColor={"#43325D"}
                onChangeText={(e) => setEmpCode(e)}
                value={empCode}
              ></RoundInputBox>
            </View>
            <View style={styles.mobBoxContainer}>
              <RoundInputBox
                iconName={hidePass ? "eyeSlash" : "eye"}
                onPressEye={() => setHidePass(!hidePass)}
                eyeIcon={true}
                placeholder={"Password"}
                secureTextEntry={hidePass ? true : false}
                placeholderTextColor={"#43325D"}
                onChangeText={(e) => setPassword(e)}
                value={password}
              ></RoundInputBox>
            </View>

            <View
              style={{
                marginVertical: 15,
                marginHorizontal: 35,
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              {/* <View style={{ marginRight: 5 }}> */}
              <Button
                textStyle={{ marginHorizontal: 25, marginVertical: 3 }}
                title={"Register"}
                onPress={() =>
                  Linking.openURL(
                    "http://apps.macleods.in:8443/MacWeb/Mobile/Account/HRMSRegs.aspx"
                  )
                }
              ></Button>
              {/* </View> */}
              {/* <View style={{ marginLeft: 5 }}> */}
              <Button
                textStyle={{ marginHorizontal: 25, marginVertical: 3 }}
                title={"Login"}
                onPress={() => {
                  let obj = {
                    empCode: empCode,
                    password: password,
                  };
                  login(obj);
                }}
              ></Button>
              {/* </View> */}
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    flexDirection: "column",
  },
  container2: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  boxContainer: {
    padding: 5,
    minHeight: Platform.OS === "android" || Platform.OS === "ios" ? 70 : null,
    maxHeight: Platform.OS === "android" || Platform.OS === "ios" ? 70 : null,
  },
  image: {
    height: 135,
    width: 200,
  },
  loginImage: {
    height: "100%",
  },
  imageContainer: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  mobContainer1: {
    flex: 1,
    flexDirection: "column",
  },
  mobContainer2: {
    // flex: 1,
    // flexDirection: "column",
    backgroundColor: "rgba(0,0,0,0.5)",
    // alignItems: "center",
    // justifyContent: "center",
    alignSelf: "center",
    position: "absolute",
    bottom: "20%",
    height: Dimensions.get("window").height / 2,
    width: Dimensions.get("window").width - 30,
    borderRadius: 5,
    // opacity: 0.6,
  },
  mobBoxContainer: {
    padding: 5,
    minHeight: Platform.OS === "android" || Platform.OS === "ios" ? 70 : null,
    maxHeight: Platform.OS === "android" || Platform.OS === "ios" ? 70 : null,
  },
  mobImage: {
    height: 135,
    width: 200,
  },
  mobLoginImage: {
    height: "100%",
    // resizeMode: "cover",
    // opacity: 0.1,
  },
  mobImageContainer: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // opacity: 0.5,
  },
  copyRight: {
    color: "black",
    fontSize: 12,
    position: "absolute",
    bottom: 1,
    alignSelf: "center",
  },
});

const mapStateToProps = ({ user }) => ({
  user,
});
export default connect(mapStateToProps, {
  login,
})(Login);
