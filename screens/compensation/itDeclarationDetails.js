import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  BackHandler,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { connect } from "react-redux";
import Button from "../../components/buttons/button";
import CardComponent from "../../components/cardComponent/cardComponent";
import InputTextWithLevel from "../../components/compensationComponent/inputTextWithLevel";
import CardData from "../../components/eiscardDesign/cardData";
import Icon from "../../components/icons";
import {
  removeSelectedDeclaration,
  saveItDeclaration,
} from "../../redux/actions/itDeclaration.action";

const ItDeclarationDetails = ({
  itDeclaration,
  saveItDeclaration,
  selectedITDeclaration,
  removeSelectedDeclaration,
}) => {
  const navigation = useNavigation();
  const [info, setInfo] = useState({});
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        // removeSelectedDeclaration();
      };
    }, [])
  );

  useEffect(() => {
    setInfo({
      period: selectedITDeclaration.period || "",
      status: selectedITDeclaration.status || "",
      adCode: selectedITDeclaration.adCode || "",
      amount: selectedITDeclaration.amount,
      remark: selectedITDeclaration.remark || "",
      tranId: selectedITDeclaration.tranId || "",
      acctPrd: selectedITDeclaration.period || "",
      descr: selectedITDeclaration.descr || "",
    });
  }, [selectedITDeclaration]);

  const addDataToInfo = (data) => {
    setInfo({ ...info, ...data });
  };
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, []);
  function handleBackButtonClick() {
    navigation.navigate("itDeclaration", { screen: "it-details" });
    return true;
  }

  const onSave = () => {
    saveItDeclaration(info, () =>
      navigation.navigate("itDeclaration", { screen: "it-details" })
    );
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center", margin: 10 }}>
        <TouchableOpacity onPress={() => handleBackButtonClick()}>
          <Icon name="back"></Icon>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 17,
            fontWeight: "bold",
            padding: 5,
          }}
        >
          IT Declaration Details
        </Text>
      </View>
      <CardComponent>
        <View>
          <Text style={styles.title}>{`${info.adCode}-${info.descr}`}</Text>
        </View>

        <CardData label={"Account Period"} data={info.period}></CardData>
        <CardData label={"Transaction Id"} data={info.tranId}></CardData>
        <CardData label={"Status"} data={info.status}></CardData>
        <InputTextWithLevel
          value={info.remark}
          label={"Remark"}
          onChangeText={(text) => addDataToInfo({ remark: text })}
        ></InputTextWithLevel>
        <InputTextWithLevel
          label={"Amount (in.Rs)"}
          value={info.amount?.toString()}
          onChangeText={(num) => addDataToInfo({ amount: num })}
        ></InputTextWithLevel>
        <View style={styles.buttonContainer}>
          <Button
            style={{ backgroundColor: "#FF9300" }}
            title={"Save"}
            textStyle={{
              marginHorizontal: 25,
              marginVertical: 10,
              fontSize: 16,
            }}
            onPress={onSave}
          ></Button>
          <Button
            title={"Cancel"}
            textStyle={{
              marginHorizontal: 25,
              marginVertical: 10,
              fontSize: 16,
            }}
            onPress={() => handleBackButtonClick()}
          ></Button>
        </View>
      </CardComponent>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  title: {
    fontSize: 16,
    color: "#9B2B2C",
    paddingBottom: 10,
    fontWeight: "bold",
  },
  buttonContainer: {
    flex: 1,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  buttonSave: {
    backgroundColor: "#FF9300",
    // width: "40%",
    // height: 10,
  },
  buttonDelete: {
    // width: "40%",
    height: 60,
  },
});

const mapStateToProps = ({ itDeclaration, selectedITDeclaration }) => ({
  itDeclaration,
  selectedITDeclaration,
});
export default connect(mapStateToProps, {
  saveItDeclaration,
  removeSelectedDeclaration,
})(ItDeclarationDetails);
