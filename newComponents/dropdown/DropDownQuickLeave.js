import React, { useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { connect } from "react-redux";
import {
  fetchAttendanceSummary,
  fetchTeamAttendanceSummary,
  fetchTeamAttendanceSummaryDetails,
} from "../../redux/actions/attendance.action";
import { addError } from "../../redux/actions/toast.action";

function mobileBackGround(width) {
  if (Platform.OS == "android") {
    return {
      backgroundColor: "#C7BEF0",
      borderRadius: 20,
      width: width * 1.1,
      height: width / 3,
      border: "none",
    };
  }
}
function mobileDropDowntext() {
  if (Platform.OS == "android") {
    return {
      fontSize: 16,
    };
  }
}
function WebBackGround() {
  if (Platform.OS == "web") {
    return styles.DropdownButtonContainer;
  }
}
function TextSize() {
  if (Platform.OS == "android") {
    return { fontSize: 12 };
  }
  return { fontSize: 10 };
}
function DropDown({
  data,
  width = 100,
  height = 400,
  addError,
  fetchAttendanceSummary,
  fetchTeamAttendanceSummary,
  fetchTeamAttendanceSummaryDetails,
  placeholder,
  setapplyZIndex,
  tag,
  applyZIndex,
  open,
  setOpen,
  Data,
}) {
  const [value, setValue] = useState(Data[0]);
  const [items, setItems] = useState(Data); //data
  function onPress() {
    if (tag === applyZIndex) {
      setapplyZIndex(() => "");
      return;
    }
    setapplyZIndex(() => tag);
  }

  function setValueCloseDropDown(val) {
    setapplyZIndex(() => "");
    setValue(val);
  }

  return (
    <View
      style={{
        width: "100%",
        zIndex: applyZIndex === tag ? 20 : -20,
        position: "relative",
      }}
    >
      {/*style={[WebBackGround(),{width:width,height:height,alignItems:"center", justifyContent:"center"}]} */}
      <DropDownPicker
        style={[styles.container, { width: "100%", height: 40 }]} //mobileBackGround(width)
        open={applyZIndex === tag}
        onPress={onPress}
        value={value}
        items={items}
        showArrowIcon={true}
        placeholder={placeholder}
        showTickIcon={false}
        listItemLabelStyle={styles.dropdownContainerLabel}
        selectedItemLabelStyle={styles.selectedLabel}
        dropDownContainerStyle={[
          styles.Dropdowncontainer,
          {
            backgroundColor: "#FFFFFF",
            borderColor: "#D2C9F9",
            borderWidth: 2,
          },
        ]}
        listParentLabelStyle={{
          color: "black",
          fontWeight: "600",
          ...mobileDropDowntext(),
        }}
        textStyle={styles.dropDownlabel}
        // ArrowDownIconComponent={()=>customComp()}//****************ArrowUpIconComponent need to be added after finding svg icons.. here icons are images. not able to change color
        setOpen={setOpen}
        setValue={(val) => setValueCloseDropDown(val)}
        setItems={setItems}
      />
    </View>
  );
}
const mapStateToProps = ({ user }) => ({
  user,
});
export default connect(mapStateToProps, {
  fetchAttendanceSummary,
  fetchTeamAttendanceSummary,
  addError,
  fetchTeamAttendanceSummaryDetails,
})(DropDown);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderColor: "#666666",
    alignItems: "center",
    borderWidth: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
    borderRadius: 2,
    marginTop: 3,
    marginBottom: 10,
  },
  dropdownContainerLabel: {
    fontSize: 12,
    paddingBottom: 5,
  },
  selectedLabel: {
    fontWeight: "bold",
  },
  Dropdowncontainer: {
    marginTop: 40,
    backgroundColor: "white",
    paddingTop: 5,
    paddingLeft: 10,
    color: "#C7BEF0",
  },
  DropdownButtonContainer: {
    backgroundColor: "#C7BEF0",
    borderRadius: 20,
    paddingHorizontal: 10,
    color: "white",
  },
  dropDownlabel: {
    color: "#666666",
    fontSize: 14,
    fontWeight: "500",
  },
});
