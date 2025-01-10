import React from "react";
import { ScrollView, View } from "react-native";
import CardComponent from "../../components/cardComponent/cardComponent";
import ReportingItemComp from "../../components/eis-component/ReportingItemComp";
import CardData from "../../components/eiscardDesign/cardData";
const FamilyDetailsScreen = ({ route }) => {
  var relatives = route.params?.data;
  //   const [selectedItem, setselectedItem] = useState("")
  return (
    <ScrollView nestedScrollEnabled={true}>
      <View>
        <CardComponent>
          <ReportingItemComp
            closeer={true}
            nameStyle={{ color: "#9d292a", fontSize: 20 }}
            subDetails={relatives ? relatives?.relation?.trim() : ""}
            name={relatives ? relatives?.memberName?.trim() : ""}
          ></ReportingItemComp>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <CardData
              style={{ flex: 1 }}
              label={"Member Name"}
              data={relatives.memberName}
            ></CardData>
            <CardData
              style={{ flex: 1 }}
              label={"Birth Date"}
              data={relatives.dateBirth}
            ></CardData>
          </View>

          <View style={{ flex: 1, flexDirection: "row" }}>
            <CardData
              style={{ flex: 1 }}
              label={"Gender"}
              data={
                relatives.sex === "M"
                  ? "Male"
                  : relatives.sex === "F"
                  ? "Female"
                  : "-"
              }
            ></CardData>

            <CardData
              style={{ flex: 1 }}
              label={"Relation"}
              data={relatives.relation}
            ></CardData>
          </View>

          <View style={{ flex: 1, flexDirection: "row" }}>
            <CardData
              style={{ flex: 1 }}
              label={"Occupation"}
              data={relatives.occupation}
            ></CardData>
            <CardData
              style={{ flex: 1 }}
              label={"Dependant"}
              data={relatives.dependent}
            ></CardData>
          </View>
        </CardComponent>
      </View>
    </ScrollView>
  );
};

export default FamilyDetailsScreen;
