import moment from "moment";
import React, { useContext, useState } from "react";
import { ScrollView, View } from "react-native";
import { connect } from "react-redux";
import CameraOpenCard from "../../components/CheckIn/CameraOpenCard";
import CheckInCard from "../../components/CheckIn/CheckInCard";
import GoogleMapView from "../../components/CheckIn/GoogleMapView";
import { DimensionContext } from "../../components/dimensionContext";
import { CheckInMark, CheckOutMark } from "../../redux/actions/checkin.action";
const CheckIn = ({ user, CheckInMark, CheckOutMark }) => {
  const { window } = useContext(DimensionContext);
  const [checkinData, setCheckInData] = useState();

  const onCheckIn = async () => {
    let data = {
      empCode: user.empCode,
      deptCode: user.deptCode,
      toDate: moment().format("YYYY-MM-DD HH:mm"),
      eventDate: moment().format("YYYY-MM-DD"),
      lat: "0",
      lnn: "0",
      radius: "0",
      approvalAuthority: "HR",
    };

    // CheckInMark(data)
    CheckOutMark(data);
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          flexDirection: window.width > 600 ? "row" : "column",
          margin: 10,
        }}
      >
        <View
          style={{
            marginLeft: window.width > 600 ? 20 : 0,
            flex: 1,
            flexDirection: window.width > 600 ? "row" : "column",
          }}
        >
          <CheckInCard
            time={new Date(2023, 3, 6, 5, 30)}
            active
            title={"CHEK IN TIME"}
            buttonText={"Mark As Check-in"}
            onPress={onCheckIn}
          />
          <View style={window.width > 600 ? { flex: 1, marginLeft: 20 } : {}}>
            <CheckInCard
              time={new Date()}
              buttonText={"Mark As Check-out"}
              title={"CHEK OUT TIME"}
            />
          </View>
        </View>
        <View style={window.width > 600 ? { marginLeft: 20, width: 600 } : {}}>
          <CameraOpenCard />
        </View>
        <GoogleMapView />
      </View>
    </ScrollView>
  );
};

const mapStateToProps = ({ user }) => ({
  user,
});
export default connect(mapStateToProps, {
  CheckInMark,
  CheckOutMark,
})(CheckIn);
