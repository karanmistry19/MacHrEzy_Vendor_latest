import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CardComponent from "../cardComponent/cardComponent";
import CardData from "./cardData";
const BankDetails = ({ eisPersonal }) => {
  return (
    <View style={styles.container}>
      <CardComponent>
        <Text style={styles.title}>Bank Details</Text>
        <CardData label={"Bank Ifsc Code"} data={eisPersonal.bankIfsc} />
        <CardData label={"Account Number"} data={eisPersonal.bankAcct} />
        <CardData label={"Bank Name"} data={eisPersonal.bankName} />
        <CardData label={"Payment Mode"} data={eisPersonal.paymentMode} />
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
export default BankDetails;
