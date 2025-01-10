import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CardComponent from "../cardComponent/cardComponent";
import CardData from "./cardData";

const PersonalInformation = ({ eisPersonal }) => {
  return (
    <View style={styles.container}>
      <CardComponent>
        <Text style={styles.title}>Personal Information</Text>
        <CardData label={"Employee Code"} data={eisPersonal?.empCode} />
        <CardData label={"Employee Name"} data={eisPersonal?.empName} />

        <CardData label={"Email Id"} data={eisPersonal?.emailIdPer} />
        <View style={styles.cardData}>
          <CardData
            label={"Gender"}
            data={eisPersonal?.genderDescr}
            style={styles.dataContainer}
          />
          <CardData
            label={"Religion"}
            data={eisPersonal?.religion}
            style={styles.dataContainer}
          />
        </View>

        <View style={styles.cardData}>
          <CardData
            label={"Marital Status"}
            data={eisPersonal?.mStatusDescr}
            style={styles.dataContainer}
          />
          <CardData
            label={"Marital Date"}
            data={eisPersonal?.mStatusDate}
            style={styles.dataContainer}
          />
        </View>
        <View style={styles.cardData}>
          <CardData
            label={"Date of Birth"}
            data={eisPersonal?.birthDate}
            style={styles.dataContainer}
          />
          <CardData
            label={"Mobile Number"}
            data={eisPersonal?.mobileNo}
            style={styles.dataContainer}
          />
        </View>
      </CardComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    color: "#9B2B2C",
    paddingBottom: 10,
    fontWeight: "bold",
  },
  cardData: {
    flex: 1,
    flexDirection: "row",
  },
  dataContainer: {
    flex: 1,
  },
});

export default PersonalInformation;
