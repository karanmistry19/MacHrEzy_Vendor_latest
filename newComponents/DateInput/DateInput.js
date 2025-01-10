import moment from "moment";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import FilterComponent from "../../components/filter/filter";

const DateInput = (props) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <View style={props.style}>
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputContainerFocused,
        ]}
      >
        <Text style={styles.label}>
          {props.label}
          {props?.required && <Text style={{ color: "red" }}> *</Text>}
        </Text>
        <View>
          <FilterComponent
            containerStyle={{ backgroundColor: "white" }}
            type="date"
            // minDate={moment(new Date()).subtract(1, "day")}
            dateStyle={{ color: "#383336" }}
            onFilterChange={(e) => {
              props?.onChangeText(e.value);
            }}
            minDate={props?.minDate ? props?.minDate : ""}
            filterConfig={{
              value: props?.value,
            }}
            disabled={props?.disabled}
            maxDate={moment().endOf("year")}
          ></FilterComponent>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    borderColor: "#bdbdbd",
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  inputContainerFocused: {
    borderColor: "black",
  },
  input: {
    fontSize: 16,
    color: "black",
    borderWidth: 0,
  },
  label: {
    position: "absolute",
    top: -12,
    left: 10,
    fontSize: 18,
    paddingLeft: 10,
    paddingRight: 10,
    fontFamily: "Roboto",
    color: "#000000",
    fontWeight: "500",
    backgroundColor: "#fff",
    paddingHorizontal: 5,
  },
});

export default DateInput;
