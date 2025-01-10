import { Picker } from "@react-native-picker/picker";
import React, { useContext, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { DimensionContext } from "../dimensionContext";
import ModalContainer1 from "../modalContainer/model2";
// import DatePicker from 'react-date-picker'
import Button from "../buttons/button";
import DatePickerExample from "./DatePickerExample";

const QuickLeave = ({ leave, setLeave }) => {
  const [selectedLanguage, setSelectedLanguage] = useState();
  const { window } = useContext(DimensionContext);
  const onCloseAcceptModal = () => {
    setLeave(false);
  };
  return (
    <ModalContainer1
      showModal={leave}
      modalStyle={{
        minWidth: window.width - 20,
        maxWidth: window.width,
        //   height: window.height * 0.4,
      }}
      modalContentStyle={
        {
          // width:window.width-20
        }
      }
      modalContent={
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ padding: 20 }}>
            <View style={{ marginBottom: 20 }}>
              <Text style={styles.label}>Leave Type</Text>
              <Picker
                selectedValue={selectedLanguage}
                style={{
                  width: "100%",
                  borderWidth: 1,
                  height: 40,
                  borderRadius: 10,
                  borderColor: "#CCCCCC",
                  padding: 10, // to remove the border
                  fontFamily: "Roboto", // to change the font family
                }}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedLanguage(itemValue)
                }
              >
                <Picker.Item label="Select Leave" value="" />
                <Picker.Item label="On-Duty" value="on_duty" />
                <Picker.Item label="Tour" value="tour" />
              </Picker>
            </View>
            <View style={{ marginBottom: 20 }}>
              <Text style={styles.label}>Remark</Text>
              <TextInput
                placeholder="Enter Reason Here "
                style={{
                  width: "100%",
                  borderWidth: 1,
                  height: 40,
                  borderRadius: 10,
                  borderColor: "#CCCCCC",
                  padding: 10, // to remove the border
                  fontFamily: "Roboto",
                }}
              />
            </View>
            <View style={{ marginBottom: 20 }}>
              <Text style={styles.label}>Form</Text>
              {window.width > 600 ? (
                <TextInput
                  placeholder="Enter To Form here "
                  style={{
                    width: "100%",
                    borderWidth: 1,
                    height: 40,
                    borderRadius: 10,
                    borderColor: "#CCCCCC",
                    padding: 10, // to remove the border
                    fontFamily: "Roboto",
                  }}
                />
              ) : (
                <DatePickerExample />
              )}
            </View>

            <View style={{ marginBottom: 20 }}>
              <Text style={styles.label}>To</Text>
              {window.width > 600 ? (
                <TextInput
                  placeholder="Enter To date here "
                  style={{
                    width: "100%",
                    borderWidth: 1,
                    height: 40,
                    borderRadius: 10,
                    borderColor: "#CCCCCC",
                    padding: 10, // to remove the border
                    fontFamily: "Roboto",
                  }}
                />
              ) : (
                <DatePickerExample />
              )}
            </View>
            <View style={{ flexDirection: "row" }}>
              <Button
                style={{
                  backgroundColor: "white",
                  borderWidth: 1,
                  borderColor: "#9F232B",
                }}
                textStyle={{ color: "#9F232B" }}
                title={"Cancel"}
              />
              <Button style={{ marginLeft: "auto" }} title={"Submit"} />
            </View>
          </View>
        </ScrollView>
      }
      title="Quick Leave Application Form"
      onClose={() => onCloseAcceptModal()}
    />
  );
};

export default QuickLeave;
const styles = StyleSheet.create({
  label: {
    color: "#666666",
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Roboto",
  },
});
