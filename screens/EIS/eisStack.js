import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EisMainScreen from "./eisMainScreen";
import PersonalDetailScreen from "./personalDetailsScreen";
import OfficialDetailScreen from "./officialDetailsScreen";
import FamilyDetailsScreen from "./familyDetails";
import educationDetailScreen from "./eductionScreen";
import ExperienceDetailScreen from "./experienceScreen";
import MediclaimDetailScreen from "../../components/eis-component/mediclaimDetailsScreen";
import StatutoryDetailScreen from "../../components/eiscardDesign/statutoryDetails";
import LanguageScreen from "./languageDetailsScreen";
import AssetsScreen from "./assetsScreen";
import familyScreen from "./familyScreen";
import mediclaimScreen from "./mediclaimScreen.js";
import StatutoryScreen from "./statutoryScreen";
import TransferHistoryScreen from "./transferScreen";

const Stack = createStackNavigator();
const EisStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        options={{ headerShown: false }}
        component={EisMainScreen}
      />
      <Stack.Screen
        name="personalInformation"
        component={PersonalDetailScreen}
        options={{ title: "Personal Information" }}
      />
      <Stack.Screen
        name="officialInformation"
        component={OfficialDetailScreen}
        options={{ title: "Official Information" }}
      />
      <Stack.Screen
        options={{ title: "Family Information" }}
        name="familyInformation"
        component={familyScreen}
      />
      <Stack.Screen
        name="familyDetails"
        component={FamilyDetailsScreen}
        options={{ title: "Family Details" }}
      />
      <Stack.Screen
        name="EducationInformation"
        component={educationDetailScreen}
        options={{ title: "Education Information" }}
      />
      <Stack.Screen
        name="mediclaimDetailsScreen"
        component={MediclaimDetailScreen}
        options={{ title: "Mediclaim Details" }}
      />
      <Stack.Screen
        name="mediclaimScreen"
        component={mediclaimScreen}
        options={{ title: "Mediclaim Information" }}
      />
      <Stack.Screen
        name="ExperienceInformation"
        component={ExperienceDetailScreen}
        options={{ title: "Experience Information" }}
      />
      <Stack.Screen
        name="statutoryDetailsScreen"
        component={StatutoryDetailScreen}
        options={{ title: "Statutory Details" }}
      />
      <Stack.Screen
        name="statutoryScreen"
        component={StatutoryScreen}
        options={{ title: "Statutory Information" }}
      />
      <Stack.Screen
        name="languageInformation"
        component={LanguageScreen}
        options={{ title: "Language Information" }}
      />
      <Stack.Screen
        name="Assets"
        component={AssetsScreen}
        options={{ title: "Asset Information" }}
      />
      <Stack.Screen
        name="TransferHistory"
        component={TransferHistoryScreen}
        options={{ title: "Transfer History" }}
      />
    </Stack.Navigator>
  );
};
export default EisStack;
