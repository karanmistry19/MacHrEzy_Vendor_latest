import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CardComponent from "../cardComponent/cardComponent";
import CardData from "./cardData";
const MedicalDetails = ({ eisPersonal }) => {
  return (
    <View style={styles.container}>
      <CardComponent>
        <Text style={styles.title}>Medical Details</Text>
        <CardData label={"Blood Group"} data={eisPersonal?.bloodGrp} />
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

export default MedicalDetails;
