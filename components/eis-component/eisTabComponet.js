import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Eistab from "./eisTab";

const eisInfo = [
  {
    backgroundColor: "#AEACDE",
    iconName: "personalInfo",
    header: `  Personal 
Information`,
    navigationTo: "personalInformation",
  },
  {
    backgroundColor: "#ADCCAE",
    iconName: "official",
    header: "Official",
    navigationTo: "officialInformation",
  },
  {
    backgroundColor: "#C8B2C1",
    iconName: "family",
    header: "Family",
    navigationTo: "familyInformation",
  },
  {
    backgroundColor: "#D8B6B6",
    iconName: "mediclaim",
    header: "Mediclaim",
    navigationTo: "mediclaimScreen",
  },
  {
    backgroundColor: "#EBB1B1",
    iconName: "statutory",
    header: "Statutory",
    navigationTo: "statutoryScreen",
  },
  {
    backgroundColor: "#F6D5A9",
    iconName: "educational",
    header: "Educational",
    navigationTo: "EducationInformation",
  },
  {
    backgroundColor: "#AFADDF",
    iconName: "language",
    header: "Language",
    navigationTo: "languageInformation",
  },
  {
    backgroundColor: "#ADCCAE",
    iconName: "experience",
    header: "Experience",
    navigationTo: "ExperienceInformation",
  },
  // {
  //   backgroundColor: "#D8B6B6",
  //   iconName: "letter",
  //   header: "My Letter",
  //   navigationTo: "My Letter",
  // },
  {
    backgroundColor: "#C8B2C1",
    iconName: "transfer",
    header: `Transfer History`,
    navigationTo: "TransferHistory",
  },
  {
    backgroundColor: "#ADCCAE",
    iconName: "assets",
    header: "Assets",
    navigationTo: "Assets",
  },
];

export default function EisTabComponent({ navigation, isTab }) {
  return (
    <View style={styles.container}>
      {eisInfo.map((e, i) => (
        <Pressable
          key={e.navigationTo + " " + i}
          style={{
            marginLeft: 5,
            minHeight: 90,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            navigation.navigate(e.navigationTo);
          }}
        >
          <Eistab
            key={i}
            backgroundColor={e.backgroundColor}
            iconName={e.iconName}
            header={e.header}
            isTab={isTab}
          />
        </Pressable>
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
});
