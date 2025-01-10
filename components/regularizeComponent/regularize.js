import React from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { connect } from "react-redux";
import Icons from "../icons";
const AttendanceSummary = ({ attendanceSummary, navigation }) => {
  const dimension = useWindowDimensions();
  let regularArray = attendanceSummary?.regularize?.split(",");
  const renderItem = ({ item, index }) => {
    return item.trim() === "" ? (
      <></>
    ) : (
      <View
        key={`${item?.empCode}  ${index}`}
        style={{
          width: "95%",
          borderRadius: 7,
          // borderWidth: 2,
          // height: 40,
          marginTop: 5,
          marginLeft: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          flexWrap: "wrap",
          marginVertical: 10,
          backgroundColor: "#D0D0D0",
          // height: 50,
          padding: 10,
        }}
      >
        <Text
          numberOfLines={1}
          style={{
            color: "#303030",
            alignSelf: "center",
            fontSize: 15,
            fontWeight: "bold",
            minWidth: "100%",
            // maxWidth: 160,
            marginLeft: 5,
            paddingHorizontal: 5,
            marginVertical: 5,
          }}
        >
          {item}
        </Text>
      </View>
    );
  };
  return (
    <View style={{ paddingBottom: 30 }}>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={{
            bottom: 10,
            position: "absolute",
            marginLeft: 10,
            zIndex: 1000,
          }}
          onPress={() => navigation.goBack()}
        >
          <Icons fill="#000" name="back"></Icons>
        </TouchableOpacity>

        <View style={{ flex: 1, alignItems: "center", marginRight: 20 }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "700",
              height: 30,
              marginTop: 10,
              // alignSelf: "center",
            }}
          >
            Regularize Dates
          </Text>
        </View>
      </View>
      <FlatList
        keyExtractor={(item, index) => item.empCode + " " + index}
        pagingEnabled={true}
        data={regularArray}
        renderItem={renderItem}
      ></FlatList>
    </View>
  );
};
const mapStateToProps = ({ attendanceSummary }) => ({
  attendanceSummary,
});
export default connect(mapStateToProps, {})(AttendanceSummary);
