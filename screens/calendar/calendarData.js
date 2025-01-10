import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";

const CalendarData = ({ route }) => {
  const [selectedDate, setSelectedDate] = useState({});
  useEffect(() => {
    if (route && route.params) {
      const date = route.params.data;
      setSelectedDate(date);
    }
  }, [route]);
  return (
    <View style={styles.container}>
      <Text>{selectedDate.dateString}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default connect(null, {})(CalendarData);
