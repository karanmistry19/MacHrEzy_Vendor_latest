import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Platform,
  SafeAreaView,
  StatusBar as RNStatusBar,
  StyleSheet,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { DimensionContext } from "./components/dimensionContext";
import Loader from "./components/loader";
import Toast from "./components/toast";
import { Firebase } from "./config/firebase/firebase";
import EntryStack from "./navigation/entryStack";
import { persister, store } from "./redux/store";
const window = Dimensions.get("window");
const screen = Dimensions.get("screen");
const MainStack = createStackNavigator();

export default function App() {
  const [dimensions, setDimensions] = useState({ window, screen });
  const [width, setWidth] = useState(dimensions.window.width);
  const onChange = ({ window, screen }) => {
    setDimensions({ window, screen });
    setWidth(window.width);
  };

  useEffect(() => {
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  });

  let windowHeight = dimensions.window.height;
  let deviceHeight = dimensions.screen.height;
  let bottomNavBarHeight = deviceHeight - windowHeight;
  const statusbarHeight =
    Platform.OS === "android" ? RNStatusBar.currentHeight : 0;
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persister}>
        <DimensionContext.Provider value={dimensions}>
          <KeyboardAwareScrollView
            enableOnAndroid={false}
            nestedScrollEnabled={true}
            bounces={false}
          >
            <SafeAreaView
              key={"safeAreaView"}
              style={{
                // marginTop: Platform.OS === "android" ? statusbarHeight : 0,
                paddingTop: Platform.OS === "android" ? statusbarHeight : 0,
                flex: 1,
                minHeight:
                  windowHeight +
                  (bottomNavBarHeight > 25 ? statusbarHeight : 0),
                maxHeight:
                  windowHeight +
                  (bottomNavBarHeight > 25 ? statusbarHeight : 0),
                // minHeight: windowHeight + statusbarHeight - bottomNavBarHeight,
                // (bottomNavBarHeight > 25 ? statusbarHeight : 0),
                // maxHeight: windowHeight + statusbarHeight - bottomNavBarHeight,
                // (bottomNavBarHeight > 25 ? statusbarHeight : 0),
              }}
            >
              <NavigationContainer linking={{ enabled: true }}>
                <MainStack.Navigator>
                  <MainStack.Screen
                    component={EntryStack}
                    options={{ headerShown: false }}
                    name="main"
                  ></MainStack.Screen>
                </MainStack.Navigator>
              </NavigationContainer>
              <StatusBar style="auto" hidden={false} />
              <Loader></Loader>
              <Firebase></Firebase>
            </SafeAreaView>
            <Toast></Toast>
          </KeyboardAwareScrollView>
        </DimensionContext.Provider>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});

{
  /* <View style={styles.container}>
<DimensionContext.Provider value={dimensions}>
   <Login></Login>
  <Dashboard></Dashboard>
</DimensionContext.Provider>
</View> */
}
