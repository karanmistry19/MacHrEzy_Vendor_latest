import React, { useContext, useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import CardComponent from "../../components/cardComponent/cardComponent";
import { DimensionContext } from "../../components/dimensionContext";
import ReportingItemComp from "../../components/eis-component/ReportingItemComp";
import CardData from "../../components/eiscardDesign/cardData";
import { fetchEISFamily } from "../../redux/actions/eis.action";

const FamilyScreen = ({ navigation, user, eisFamily, fetchEISFamily }) => {
  useEffect(() => {
    fetchEISFamily();
  }, []);
  const { window } = useContext(DimensionContext);
  return eisFamily.length > 0 ? (
    <ScrollView
      nestedScrollEnabled={true}
      showsVerticalScrollIndicator={false}
      style={styles.reportingItemContainer}
    >
      {eisFamily.map((e, i) => {
        return (
          <TouchableOpacity
            key={`${e.memberName}  " - " ${i}`}
            disabled={window.width > 600 ? true : false}
            onPress={() => {
              navigation.navigate("familyDetails", { data: e });
            }}
          >
            <ReportingItemComp
              closeer={window.width > 600 ? true : false}
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
                  style={{ width: "30%" }}
                  label={"Member Name"}
                  data={e.memberName}
                ></CardData>
                <CardData
                  style={{ width: "30%" }}
                  label={"Birth Date"}
                  data={e.dateBirth}
                ></CardData>

                <CardData
                  style={{ width: "30%" }}
                  label={"Gender"}
                  data={e.sex === "M" ? "Male" : e.sex === "F" ? "Female" : "-"}
                ></CardData>
                <CardData
                  style={{ width: "30%" }}
                  label={"Relation"}
                  data={e.relation}
                ></CardData>

                <CardData
                  style={{ width: "30%" }}
                  label={"Occupation"}
                  data={e.occupation}
                ></CardData>
                <CardData
                  style={{ width: "30%" }}
                  label={"Dependant"}
                  data={e.dependent}
                ></CardData>
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
    margin: 10,
  },
});
const mapStateToProps = ({ eisFamily, user }) => ({ eisFamily, user });
export default connect(mapStateToProps, { fetchEISFamily })(FamilyScreen);
