import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import {
  fetchEISOfficial,
  fetchEISOfficialSecond,
} from "../../redux/actions/eis.action";
import CardComponent from "../cardComponent/cardComponent";
import CardData from "./cardData";
const OfficialInformation = ({
  eisPersonal,
  fetchEISOfficial,
  fetchEISOfficialSecond,
}) => {
  useEffect(() => {
    fetchEISOfficial();
    fetchEISOfficialSecond();
  }, []);
  return (
    <View style={styles.container}>
      <CardComponent>
        <Text style={styles.title}>Official Information</Text>
        <CardData label={"Employee Code"} data={eisPersonal.empCode} />
        <CardData label={"Location"} data={eisPersonal.siteName} />
        <CardData label={"Department"} data={eisPersonal.deptName} />
        <CardData label={"Section"} data={eisPersonal.section} />
        <CardData label={"Employee Type"} data={eisPersonal.employementType} />
        <CardData label={"Designation"} data={eisPersonal.designation} />
        <CardData label={"Email Id"} data={eisPersonal.emailIdPer} />
        <CardData label={"Mobile No"} data={eisPersonal.mobileNoOff} />
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

export default connect(null, { fetchEISOfficial, fetchEISOfficialSecond })(
  OfficialInformation
);
