import React from "react";
import { StyleSheet, View } from "react-native";
import CompensationCard from "../../components/compensation/card";

const Reports = ({ navigation, onPress }) => {
  return (
    <View style={styles.Container}>
      <CompensationCard
        header={"Form 16"}
        iconName="arrow"
        onPress={() => navigation.navigate("formSixteen")}
        style={{ borderTopLeftRadius: 15, borderTopRightRadius: 15 }}
      />
      <CompensationCard
        header={"Payslip"}
        iconName="arrow"
        onPress={() => navigation.navigate("paySlip")}
      />
      <CompensationCard
        header={"Reimbursement"}
        iconName="arrow"
        onPress={() =>
          navigation.navigate("reimbursement", { destination: "reimbursment" })
        }
      />
      <CompensationCard
        header={"Ledger"}
        iconName="arrow"
        onPress={() =>
          navigation.navigate("reimbursement", { destination: "ledger" })
        }
        style={{ borderBottomLeftRadius: 15, borderBottomRightRadius: 15 }}
      />
    </View>
  );
};

export default Reports;

const styles = StyleSheet.create({
  Container: {
    marginTop: 5,
  },
});
