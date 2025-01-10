import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { ScrollView, View } from "react-native";
import TableViewForAttendance from "../../screens/attendance/TableViewForAttendance";
import Button from "../buttons/button";
import { DimensionContext } from "../dimensionContext";
import ApprovalFlowAttendance from "./ApprovalFlowAttendance";
import ChartComponent from "./ChartComponent";
import NotificationAttendance from "./NotificationAttendance";
import TeamMatesAttendance from "./TeamMatesAttendance";

const MobileViewAttendance = ({ handleApplyleave }) => {
  const { window } = useContext(DimensionContext);
  const navigation = useNavigation();
  return (
    // / navigation.navigate("checkindetails")
    <ScrollView>
      <View style={{ margin: 20 }}>
        <Button
          onPress={() => handleApplyleave()}
          style={{
            width: 200,

            marginLeft: "auto",
          }}
          title="Apply Leave"
          color="rgb(155, 43, 44)"
        />
        <TeamMatesAttendance />

        <NotificationAttendance />
        <View>
          <TableViewForAttendance />
        </View>
        <ChartComponent />
        <ApprovalFlowAttendance />
      </View>
    </ScrollView>
  );
};

export default MobileViewAttendance;
