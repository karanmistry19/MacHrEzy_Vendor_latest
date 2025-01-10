import React from "react";
import { Text, View } from "react-native";
const ReportNotifyCard = ({ title, desc }) => {
  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={{ fontWeight: "bold", color: "#3B3E43" }}>{title}</Text>
      <Text style={{ fontWeight: "400", color: "black", paddingTop: 10 }}>
        {desc}
      </Text>
    </View>
  );
};

export default ReportNotifyCard;
