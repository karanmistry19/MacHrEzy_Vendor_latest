import React, { useState } from "react";
import { DatePickerAndroid, Text, View } from "react-native";
import Button from "../buttons/button";

const DatePickerExample = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const showDatePicker = async () => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: new Date(),
        mode: "default",
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
        const date = new Date(year, month, day);
        setSelectedDate(date);
        // Do something with the selected date
      }
    } catch ({ code, message }) {
      console.warn("Cannot open date picker", message);
    }
  };

  return (
    <View>
      <Button onPress={showDatePicker} title={"Select Date"} />

      {selectedDate && (
        <Text style={{ marginTop: 10 }}>
          Selected Date: {selectedDate.toDateString()}
        </Text>
      )}
    </View>
  );
};

export default DatePickerExample;
