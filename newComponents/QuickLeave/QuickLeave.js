import React, { useState } from "react";
import { Platform, StyleSheet, Text, TextInput, View } from "react-native";
import DropDownQuickLeave from "../dropdown/DropDownQuickLeave";
const QuickLeave = (heading) => {
  function textWidth() {
    return 60;
  }
  function DataVisibleInAndroid() {
    if (Platform.OS == "android") {
      return { width: "100%" };
    }
  }
  const [applyZIndex, setapplyZIndex] = useState("");
  const [open, setOpen] = useState(false);
  const [Remarks, setRemarks] = useState("");
  const LeaveType = [
    { label: "Leave", value: "Leave" },
    { label: "OD", value: "OD" },
    { label: "Tour", value: "Tour" },
  ];
  const Dates = [
    { label: "23-03-2023", value: "23-03-2023" },
    { label: "24-03-2023", value: "24-03-2023" },
  ];
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "",
        width: "100%",
      }}
    >
      <View
        style={{
          backgroundColor: "",
          zIndex: applyZIndex === "Leave" ? 20 : -20,
          width: "80%",
        }}
      >
        <Text
          style={{
            color: "#9F232B",
            marginBottom: 20,
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          Quick Apply Leave Application
        </Text>
      </View>
      <View
        style={{
          backgroundColor: "",
          zIndex: applyZIndex === "Leave" ? 20 : -20,
          width: "80%",
        }}
      >
        <Text style={styles.textColor}>Leave Type</Text>
        <DropDownQuickLeave
          tag="Leave"
          setapplyZIndex={setapplyZIndex}
          applyZIndex={applyZIndex}
          open={open}
          setOpen={setOpen}
          Data={LeaveType}
          placeholder={"Select Leave type"}
        />
      </View>
      <View
        style={[
          {
            backgroundColor: "",
            zIndex: applyZIndex === "Remarks" ? 20 : -20,
            width: "80%",
          },
        ]}
      >
        <Text style={styles.textColor}>Remarks</Text>
        <View style={{ borderColor: "#666666", borderWidth: 1 }}>
          <TextInput
            style={[{ outlineStyle: "none", fontWeight: "600", padding: 8 }]}
            underlineColorAndroid="transparent"
            placeholder="Enter Remarks"
            placeholderTextColor="grey"
            numberOfLines={3}
            onChangeText={(x) => setRemarks(x)}
            multiline={true}
            value={Remarks}
            editable={true}
          />
        </View>
      </View>
      <View
        style={[
          {
            backgroundColor: "",
            zIndex: applyZIndex === "Date" ? 20 : -20,
            width: "80%",
          },
        ]}
      >
        <Text style={styles.textColor}>Dates</Text>
        <DropDownQuickLeave
          tag="Date"
          placeholder={"Select Date"}
          applyZIndex={applyZIndex}
          open={open}
          setOpen={setOpen}
          setapplyZIndex={setapplyZIndex}
          Data={Dates}
        />
      </View>
      <View
        style={[
          {
            backgroundColor: "",
            zIndex: applyZIndex === "Remarks" ? 20 : -20,
            width: "80%",
            flexDirection: "row",
            justifyContent: "space-around",
            height: 80,
          },
        ]}
      >
        <View style={{ backgroundColor: "#9F232B", padding: 10, height: 40 }}>
          <Text style={{ color: "white", fontWeight: 600 }}>Cancel</Text>
        </View>
        <View style={{ backgroundColor: "#9F232B", padding: 10, height: 40 }}>
          <Text style={{ color: "white", fontWeight: 600 }}>Submit</Text>
        </View>
      </View>
    </View>
  );
};

export default QuickLeave;

const styles = StyleSheet.create({
  textColor: {
    color: "#666666",
    fontWeight: "500",
  },
  remarksContainer: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "#666666",
    color: "red",
  },
});
