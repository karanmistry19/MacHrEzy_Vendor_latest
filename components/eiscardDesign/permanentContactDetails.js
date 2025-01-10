import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CardComponent from "../cardComponent/cardComponent";
import CardData from "./cardData";
const PermanentContactDetails = ({ eisPersonal }) => {
  return (
    <View style={styles.container}>
      <CardComponent>
        <Text style={styles.title}>Permanent Address</Text>
        <CardData label={"Address Line 1"} data={eisPersonal?.perAdd1} />
        <CardData label={"Address Line 2"} data={eisPersonal?.perAdd2} />
        <CardData label={"Address Line 3"} data={eisPersonal?.perAdd3} />
        <CardData label={"City"} data={eisPersonal?.perCity} />
        <CardData label={"Pin"} data={eisPersonal?.perPin} />
        <CardData label={"State"} data={eisPersonal?.perStateDescr} />
        <View style={styles.cardData}>
          <CardData
            label={"Phone No 1"}
            data={eisPersonal?.perTel}
            style={styles.dataContainer}
          />
          <CardData
            label={"Phone No 2"}
            data={eisPersonal?.perTel2}
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
  dataContainer: {
    flex: 1,
  },
  cardData: {
    flex: 1,
    flexDirection: "row",
  },
});

export default PermanentContactDetails;
