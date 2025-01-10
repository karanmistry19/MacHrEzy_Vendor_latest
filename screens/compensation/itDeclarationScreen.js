import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { connect } from "react-redux";
import Compensation from "../../components/compensationComponent/compensation";
import Icon from "../../components/icons";
import PopUp from "../../components/popUp/popUp";
import {
  fetchItDeclaration,
  removeItDeclaration,
  setSelectedDeclaration,
} from "../../redux/actions/itDeclaration.action";

const ItDeclarationScreen = ({
  navigation,
  accountingPeriods,
  fetchItDeclaration,
  itDeclaration,
  removeItDeclaration,
  route,
  setSelectedDeclaration,
}) => {
  const [selectedYear, setSelectedYear] = useState();
  let routeData = route.params;

  useEffect(() => {
    if (selectedYear?.code || routeData?.screen === "it-details") {
      fetchItDeclaration({ code: selectedYear?.code });
    }
  }, [selectedYear, routeData]);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        removeItDeclaration();
        routeData = null;
      };
    }, [])
  );

  useEffect(() => {
    if (
      accountingPeriods &&
      accountingPeriods.length > 0 &&
      routeData?.screen === "it"
    ) {
      setSelectedYear({ ...accountingPeriods[accountingPeriods.length - 1] });
    }
  }, [accountingPeriods, routeData]);

  const renderItem = ({ item, index }) => (
    <Compensation
      nameStyle={{ color: "#9B2B2C" }}
      subDetailsStyle={{ color: "#9A9A9A" }}
      lineStyle={false}
      circle={false}
      name={item.adCode}
      subDetails={item.descr}
      amount={item.amount}
      subDetailsNoOfLine={1}
      containerStyle={{ backgroundColor: "#FFF", margin: 5, borderRadius: 5 }}
      onPress={() => {
        setSelectedDeclaration({
          ...item,
          period: selectedYear.code.trim(),
        });
        navigation.navigate("itDeclarationDetails");
      }}
    ></Compensation>
  );

  const renderSeparator = () => (
    <View
      style={{
        backgroundColor: "gray",
        height: 0.5,
        marginLeft: 5,
        marginRight: 5,
      }}
    ></View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center", margin: 10 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="back"></Icon>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 17,
            fontWeight: "bold",
            padding: 5,
          }}
        >
          Old Tax Regime
        </Text>
      </View>

      <View style={styles.popHeight}>
        {/* <Text style={styles.text}>Assessment Year for Old Tax Regime</Text> */}
        <PopUp
          renderData={accountingPeriods}
          placeholder="Search Assessment Year"
          iconStyle={{ color: "#BBBBBB", marginTop: 15 }}
          placeholderContainerStyle={{
            color: "gray",
            marginHorizontal: 3,
          }}
          placeholderStyle={{
            fontSize: 16,
            alignSelf: "center",
          }}
          selectionValue={selectedYear}
          readOnly={false}
          selectedItemStyle={{
            fontSize: 16,
            margin: 8,
            justifyContent: "center",
            alignItems: "center",
          }}
          style={styles.popupView}
          onSelection={(item) => {
            setSelectedYear({ ...item });
          }}
          displayField="descr"
          id="code"
        />
      </View>
      {itDeclaration.length ? (
        <FlatList
          data={itDeclaration}
          ItemSeparatorComponent={renderSeparator}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
          nestedScrollEnabled={true}
          keyExtractor={(item, index) => item.code + " " + index}
        ></FlatList>
      ) : (
        <></>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
  },
  popHeight: {
    height: 60,
    margin: 5,
  },
  popupView: {
    minHeight: 40,
    maxHeight: 40,
    borderRadius: 5,
    // marginTop: 10,
    // padding: 7,
    backgroundColor: "white",
    borderColor: "#ffffff",
    width: "100%",
    shadowColor: "#696969",
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 5,
    shadowOffset: { width: 1, height: 1 },
    justifyContent: "center",
    // marginVertical: 2,
  },
  text: {
    fontSize: 10,
    // margin: 5,
  },
});

const mapStateToProps = ({ accountingPeriods, itDeclaration }) => ({
  accountingPeriods,
  itDeclaration,
});
export default connect(mapStateToProps, {
  fetchItDeclaration,
  removeItDeclaration,
  setSelectedDeclaration,
})(ItDeclarationScreen);
