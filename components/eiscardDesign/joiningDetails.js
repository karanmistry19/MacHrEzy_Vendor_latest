import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CardComponent from "../cardComponent/cardComponent";
import { formatDateNew } from "../utils";
import CardData from "./cardData";

const JoiningDetails = ({ eisPersonal }) => {
  return (
    <View style={styles.container}>
      <CardComponent>
        <Text style={styles.title}>Joining Details</Text>
        <View style={styles.cardData}>
          <CardData
            label={"Date of Joining"}
            data={eisPersonal.dateJoin}
            style={styles.dataContainer}
          />
          <CardData
            label={"Training(In Month)"}
            data={eisPersonal.trainingPrd}
            style={styles.dataContainer}
          />
        </View>
        <CardData
          label={"Probation Date"}
          data={formatDateNew(
            eisPersonal.probationDate,
            "YYYY-MM-DDTHH:mm:ss.sssZ",
            "DD/MM/YYYY"
          )}
        />
        <CardData
          label={"Probation(In Month)"}
          data={eisPersonal.probationPrd}
        />
        <CardData
          label={"Confirmation Date"}
          data={formatDateNew(
            eisPersonal.dateConf,
            "YYYY-MM-DDTHH:mm:ss.sssZ",
            "DD/MM/YYYY"
          )}
        />

        <CardData
          label={"Confirmed"}
          data={
            eisPersonal.confirmed === "Y"
              ? "Yes"
              : eisPersonal.confirmed === "N"
              ? "No"
              : "-"
          }
          style={styles.dataContainer}
        />
        <CardData
          label={"Probation"}
          data={
            eisPersonal.probation === "Y"
              ? "Yes"
              : eisPersonal.probation === "N"
              ? "No"
              : "-"
          }
        />
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

export default JoiningDetails;
