import moment from "moment";
import React from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { connect } from "react-redux";
import Icons from "../icons";
const HolidayList = ({ holidays, navigation }) => {
  const dimension = useWindowDimensions();
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
            Holiday List
          </Text>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 30 }}
        scrollEnabled={true}
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
      >
        {holidays.map((holiday, index) => (
          <View
            key={holiday.holiCode}
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
            }}
          >
            <Text
              numberOfLines={1}
              style={{
                color: "#303030",
                alignSelf: "center",
                fontSize: 15,
                fontWeight: "600",
                minWidth: "100%",
                // maxWidth: 160,
                marginLeft: 5,
                paddingHorizontal: 5,
                marginVertical: 5,
              }}
            >
              {holiday.holiName}
            </Text>
            <Text
              style={{
                color: "#303030",
                alignSelf: "center",
                marginTop: 2,
                fontSize: 15,
                fontWeight: "600",
                marginRight: 20,
                backgroundColor: "#FFBA00",
                paddingHorizontal: 5,
                marginLeft: 5,
                marginVertical: 5,
                borderRadius: 2,
              }}
            >
              {moment(new Date(holiday.dateOfHoliday)).format(
                "dddd, MMM Do, YYYY"
              )}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
const mapStateToProps = ({ holidays }) => ({
  holidays,
});
export default connect(mapStateToProps, {})(HolidayList);
