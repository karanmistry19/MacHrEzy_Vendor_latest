import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CardComponent from "../cardComponent/cardComponent";
import CardData from "./cardData";
const OtherDetails = ({ eisPersonal }) => {
  return (
    <View style={styles.container}>
      <CardComponent>
        <Text style={styles.title}>Other Details</Text>
        <CardData label={"Credit Card_No"} data={eisPersonal.creditCardNo} />
        <CardData label={"PF UN No"} data={eisPersonal.pfUnNo} />
        <CardData label={"Aadhar No"} data={eisPersonal.aadharNo} />
        <CardData label={"Driving Licence No"} data={eisPersonal.drivLicNo} />
        <CardData
          label={"Election Card No"}
          data={eisPersonal.electionCardNo}
        />
        <CardData label={"PAN No"} data={eisPersonal.itNo} />
        <View style={styles.cardData}>
          <CardData
            label={"Passport No"}
            data={eisPersonal.passportNo}
            style={styles.dataContainer}
          />
          <CardData
            label={"Place Of Issue"}
            data={eisPersonal.passportIssPlace}
            style={styles.dataContainer}
          />
        </View>
        <View style={styles.cardData}>
          <CardData
            label={"Date Of Issue"}
            data={eisPersonal.passportIssDate}
            style={styles.dataContainer}
          />
          <CardData
            label={"Expiry Date"}
            data={eisPersonal.passportExpDate}
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
  cardData: {
    flex: 1,
    flexDirection: "row",
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
});
export default OtherDetails;
