import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import CardComponent from "../cardComponent/cardComponent";
import CardData from "./cardData";
const PresentContactDetails = ({ eisPersonal }) => {
  return (
    <View style={styles.container}>
      <CardComponent>
        <Text style={styles.title}>Present Contact Deatils</Text>
        <CardData label={"Address Line 1"} data={eisPersonal?.curAdd1} />
        <CardData label={"Address Line 2"} data={eisPersonal?.curAdd2} />
        <CardData label={"Address Line 3"} data={eisPersonal?.curAdd3} />
        <CardData label={"City"} data={eisPersonal?.curCity} />
        <CardData label={"Pin"} data={eisPersonal?.curPin} />
        <CardData label={"State"} data={eisPersonal?.curStateDescr} />
        <View style={styles.cardData}>
          <CardData
            label={"Phone No 1"}
            data={eisPersonal?.curTel1}
            style={styles.dataContainer}
          />
          <CardData
            label={"Phone No 2"}
            data={eisPersonal?.curTel2}
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
    flexDirection: "row",
  },
});

export default connect(null, {})(PresentContactDetails);
