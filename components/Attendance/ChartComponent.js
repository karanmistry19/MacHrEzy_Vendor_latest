import React, { useState } from "react";
import { View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { ModularCard } from "../modularCard";

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "Ma", "Ju"],
  datasets: [
    {
      data: [0, 5, 8, 0, 9, 3],
      color: (opacity = 1) => `rgba(0, 0, 0, 1)`, // set line color to dark black
      strokeWidth: 3, // increase line width for better visibility
    },
  ],
};

const chartConfig = {
  backgroundGradientFromOpacity: 0,
  backgroundGradientToOpacity: 0,
  decimalPlaces: 0, // remove decimal places from labels
  color: (opacity = 1) => `rgba(0, 0, 0, 1)`, // set line color to dark black
  labelColor: (opacity = 1) => `rgba(0, 0, 0, 1)`, // set label color to dark black
  formatYLabel: (value) => `${value}k`,
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    fill: "#ff0000",
    stroke: "#ff0000",
  },
  style: {
    fontSize: 16,
    fontFamily: "Roboto",
    fontWeight: "bold",
  },
  propsForLabels: {
    fontSize: 16,
    fontFamily: "Roboto",
    fontWeight: "500",
  },
  fromZero: true,
};

const ChartComponent = () => {
  const [chartWidth, setChartWidth] = useState(0);

  const handleLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    setChartWidth(width - 20);
  };

  return (
    <ModularCard
      style={{
        flex: 1,
        width: "100%",
        maxHeight: 400,
        marginTop: 10,
      }}
      cardContent={
        <View onLayout={handleLayout}>
          <LineChart
            data={data}
            width={chartWidth}
            height={220}
            chartConfig={chartConfig}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
            withVerticalLines={false} // remove vertical grid lines
            // withHorizontalLines={false} // remove horizontal grid lines
            bezier // enable smooth line chart
            fromZero // start y-axis labels from 0
            formatYLabel={(value) => `${value}`} // format y-axis labels
          />
        </View>
      }
    />
  );
};

export default ChartComponent;
