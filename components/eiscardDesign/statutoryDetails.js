import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { fetchEISStatutory } from "../../redux/actions/eis.action";
import CardComponent from "../cardComponent/cardComponent";
import ReportingItemComp from "../eis-component/ReportingItemComp";
import CardData from "./cardData";

const StatutoryDetails = ({ route }) => {
  var s = route.params.data;
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ margin: 15 }}>
        <ReportingItemComp
          closeer={true}
          nameStyle={{ color: "#9d292a", fontSize: 20 }}
          subDetails={s ? s?.statutoryType?.trim() : ""}
          name={s ? s?.memberName?.trim() : ""}
        ></ReportingItemComp>
      </View>
      <CardComponent>
        <View style={styles.cardData}>
          <CardData
            label={"Statutory Type"}
            data={s.statutoryType}
            style={styles.dataContainer}
          />
          <CardData
            label={"Percentage"}
            data={s.percentage}
            style={styles.dataContainer}
          />
        </View>
        <View style={styles.cardData}>
          <CardData
            label={"Member Name"}
            data={s.memberName}
            style={styles.dataContainer}
          />
        </View>
      </CardComponent>
    </ScrollView>
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
  dataContainer: {
    flex: 1,
  },
});

const mapStateToProps = ({ eisStatutory }) => ({
  eisStatutory,
});
export default connect(mapStateToProps, {
  fetchEISStatutory,
})(StatutoryDetails);
