import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/login/login";

const LoginStack = createStackNavigator();

const LoginStackScreen = () => {
  return (
    <LoginStack.Navigator initialRouteName="login">
      <LoginStack.Screen
        component={Login}
        options={{ headerShown: false }}
        name="login"
      ></LoginStack.Screen>
    </LoginStack.Navigator>
  );
};

export default LoginStackScreen;
