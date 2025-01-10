import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import CompensationScreen from "./compensationScreen";
import FormSixteenScreen from "./formSixteenScreen";
import ItDeclarationDetails from "./itDeclarationDetails";
import ItDeclarationScreen from "./itDeclarationScreen";
import PaySlipScreen from "./paySlipScreen";
import ReimbursementScreen from "./reimbursementScreen";
const Stack = createStackNavigator();
const CompensationStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        options={{ headerShown: false }}
        component={CompensationScreen}
      />

      <Stack.Screen
        name="formSixteen"
        options={{ headerShown: false }}
        component={FormSixteenScreen}
      />
      <Stack.Screen
        name="paySlip"
        options={{ headerShown: false }}
        component={PaySlipScreen}
      />
      <Stack.Screen
        name="reimbursement"
        options={{ headerShown: false }}
        component={ReimbursementScreen}
      />

      <Stack.Screen
        name="itDeclaration"
        options={{ headerShown: false }}
        component={ItDeclarationScreen}
      />
      <Stack.Screen
        name="itDeclarationDetails"
        options={{ headerShown: false }}
        component={ItDeclarationDetails}
      />
    </Stack.Navigator>
  );
};
export default CompensationStack;
