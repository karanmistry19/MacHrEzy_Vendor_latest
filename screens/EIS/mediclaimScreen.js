import React, { useContext, useEffect } from "react";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import CardComponent from "../../components/cardComponent/cardComponent";
import { DimensionContext } from "../../components/dimensionContext";
import ReportingItemComp from "../../components/eis-component/ReportingItemComp";
import CardData from "../../components/eiscardDesign/cardData";
import { fetchEISMediclaim } from "../../redux/actions/eis.action";

const MediclaimScreen = ({ navigation, fetchEISMediclaim, eisMediclaim }) => {
  const { window } = useContext(DimensionContext);
  useEffect(() => {
    fetchEISMediclaim();
  }, []);
  return eisMediclaim.length > 0 ? (
    <ScrollView
      nestedScrollEnabled={true}
      showsVerticalScrollIndicator={false}
      style={styles.reportingItemContainer}
    >
      {eisMediclaim.map((e, i) => {
        return (
          <TouchableOpacity
            disabled={window.width > 600 ? true : false}
            onPress={() => {
              navigation.navigate("mediclaimDetailsScreen", { data: e });
            }}
          >
            <ReportingItemComp
              closeer={window.width < 600 ? false : true}
              navigation={navigation}
              name={e.memberName}
              subDetails={e.relation}
            ></ReportingItemComp>
            {window.width > 600 ? (
              <CardComponent
                cardStyle={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-around",
                }}
              >
                <CardData
                  label={"Gender"}
                  data={
                    e.gender === "M"
                      ? "Male"
                      : e.gender === "F"
                      ? "Female"
                      : "-"
                  }
                  style={styles.dataContainer}
                />
                <CardData
                  label={"Date Of Birth"}
                  data={e.dateBirth}
                  style={styles.dataContainer}
                />

                <CardData
                  label={"Relation"}
                  data={e.relation}
                  style={styles.dataContainer}
                />
                <CardData
                  label={"Mediclaim Status"}
                  data={e.mediclaimStatus}
                  style={styles.dataContainer}
                />
              </CardComponent>
            ) : (
              <></>
            )}
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  ) : (
    <></>
  );
};
const styles = StyleSheet.create({
  reportingItemContainer: {
    flex: 1,
    // shadowColor: "#696969",
    // shadowOpacity: 0.8,
    // elevation: 6,
    // shadowRadius: 5,
    // shadowOffset: { width: 1, height: 1 },
    margin: 10,
    // borderRadius: 25,
  },
  dataContainer: {
    flex: 1,
  },
});
const mapStateToProps = ({ eisMediclaim }) => ({ eisMediclaim });
export default connect(mapStateToProps, { fetchEISMediclaim })(MediclaimScreen);
