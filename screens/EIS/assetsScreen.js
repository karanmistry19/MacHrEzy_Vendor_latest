import React, { useContext, useEffect } from "react";
import { Image, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";
import CardComponent from "../../components/cardComponent/cardComponent";
import { DimensionContext } from "../../components/dimensionContext";
import CardData from "../../components/eiscardDesign/cardData";
import { fetchEISAssets } from "../../redux/actions/eis.action";

const AssetsScreen = ({ navigation, eisAssets, fetchEISAssets }) => {
  const { window } = useContext(DimensionContext);
  useEffect(() => {
    fetchEISAssets();
  }, []);
  return eisAssets.length > 0 ? (
    <ScrollView
      nestedScrollEnabled={true}
      showsVerticalScrollIndicator={false}
      style={{ flex: 1 }}
    >
      {eisAssets.map((e, i) => {
        return (
          <CardComponent key={`${e.induction} + ${i}`}>
            <View
              style={{
                borderBottomColor: "grey",
                borderBottomWidth: 1,
                width: "100%",
                fontWeight: "bold",
              }}
            >
              <Text style={{ fontSize: 15, color: "#9B2B2C", paddingTop: 1 }}>
                Induction
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  color: "#9B2B2C",
                  paddingTop: 1,
                  marginBottom: 10,
                }}
              >
                {e.induction}
              </Text>
            </View>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <CardData
                style={{ flex: 1 }}
                label={"Induction"}
                data={e.induction}
              ></CardData>
            </View>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <CardData
                style={{ flex: 1 }}
                label={"Date Formality"}
                data={e.dateFormality}
              ></CardData>
              <CardData
                style={{ flex: 1 }}
                label={"Remarks"}
                data={e.remarks}
              ></CardData>
            </View>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <CardData
                style={{ flex: 1 }}
                label={"Status"}
                data={e.status}
              ></CardData>
              <CardData
                style={{ flex: 1 }}
                label={"Status Date"}
                data={e.statusDate}
              ></CardData>
            </View>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <CardData
                style={{ flex: 1 }}
                label={"Total Amount"}
                data={e.totAmt}
              ></CardData>
              <CardData
                style={{ flex: 1 }}
                label={"Adj Amount"}
                data={e.adjAmt}
              ></CardData>
            </View>
          </CardComponent>
        );
      })}
    </ScrollView>
  ) : (
    <Image
      source={require("../../assets/sorry.png")}
      style={{
        height: window.width < 600 ? 200 : 320,
        width: "100%",
        alignSelf: "center",
      }}
    ></Image>
  );
};
const mapStateToProps = ({ eisAssets, user }) => ({ eisAssets, user });
export default connect(mapStateToProps, { fetchEISAssets })(AssetsScreen);
