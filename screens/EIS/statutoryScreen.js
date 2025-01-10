import React, { useContext, useEffect } from "react";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import CardComponent from "../../components/cardComponent/cardComponent";
import { DimensionContext } from "../../components/dimensionContext";
import ReportingItemComp from "../../components/eis-component/ReportingItemComp";
import CardData from "../../components/eiscardDesign/cardData";
import { fetchEISStatutory } from "../../redux/actions/eis.action";

const StatutoryScreen = ({ navigation, fetchEISStatutory, eisStatutory }) => {
  useEffect(() => {
    fetchEISStatutory();
  }, []);
  const { window } = useContext(DimensionContext);
  return eisStatutory.length > 0 ? (
    <ScrollView
      nestedScrollEnabled={true}
      showsVerticalScrollIndicator={false}
      style={styles.reportingItemContainer}
    >
      {eisStatutory.map((e, i) => {
        return (
          <TouchableOpacity
            key={`${e.memberName} + ${i}`}
            disabled={window.width > 600 ? true : false}
            onPress={() => {
              navigation.navigate("statutoryDetailsScreen", { data: e });
            }}
          >
            <ReportingItemComp
              closeer={window.width < 600 ? false : true}
              navigation={navigation}
              name={e.memberName}
              subDetails={e.statutoryType}
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
                  label={"Member Name"}
                  data={e.memberName}
                  style={styles.dataContainer}
                />

                <CardData
                  label={"Statutory Type"}
                  data={e.statutoryType}
                  style={styles.dataContainer}
                />
                <CardData
                  label={"Percentage"}
                  data={e.percentage}
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
const mapStateToProps = ({ eisStatutory }) => ({ eisStatutory });
export default connect(mapStateToProps, { fetchEISStatutory })(StatutoryScreen);
