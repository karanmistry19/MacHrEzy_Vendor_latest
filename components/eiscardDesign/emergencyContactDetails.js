import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CardComponent from "../cardComponent/cardComponent";
import CardData from "./cardData";
const EmergencyContactDetails = ({ eisPersonal }) => {
  return (
    <View style={styles.container}>
      <CardComponent>
        <Text style={styles.title}>Emergency Contact Details</Text>
        <CardData label={"Emergency Name"} data={eisPersonal?.contactPers} />
        <CardData label={"Address Line 1"} data={eisPersonal?.contactAdd1} />
        <CardData label={"Address Line 2"} data={eisPersonal?.contactAdd2} />
        <CardData label={"Address Line 3"} data={eisPersonal?.contactAdd3} />
        <CardData label={"City"} data={eisPersonal?.contactCity} />
        <CardData label={"Pin"} data={eisPersonal?.perPin} />
        <CardData label={"State"} data={eisPersonal?.contactStateDescr} />
        <CardData label={"Emergency No."} data={eisPersonal?.contactTel} />
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
});

export default EmergencyContactDetails;
