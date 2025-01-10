import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Svg, { Circle, Line } from "react-native-svg";

const AnalogClock = ({ customTime }) => {
  const [time, setTime] = useState(customTime || new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      if (customTime) {
        setTime(customTime);
      } else {
        setTime(new Date());
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [customTime]);

  const hour = time.getHours();
  const minute = time.getMinutes();
  const second = time.getSeconds();

  const hourAngle = hour * 30 + minute / 2;
  const minuteAngle = minute * 6;
  const secondAngle = second * 6;

  const hourX = 100 + 40 * Math.sin((hourAngle * Math.PI) / 180);
  const hourY = 100 - 40 * Math.cos((hourAngle * Math.PI) / 180);
  const minuteX = 100 + 60 * Math.sin((minuteAngle * Math.PI) / 180);
  const minuteY = 100 - 60 * Math.cos((minuteAngle * Math.PI) / 180);
  const secondX = 100 + 70 * Math.sin((secondAngle * Math.PI) / 180);
  const secondY = 100 - 70 * Math.cos((secondAngle * Math.PI) / 180);

  const lines = [];
  for (let i = 0; i < 60; i++) {
    const angle = i * 6;
    const x1 = 100 + 80 * Math.sin((angle * Math.PI) / 180);
    const y1 = 100 - 80 * Math.cos((angle * Math.PI) / 180);
    const x2 = 100 + 90 * Math.sin((angle * Math.PI) / 180);
    const y2 = 100 - 90 * Math.cos((angle * Math.PI) / 180);
    const strokeWidth = i % 5 === 0 ? 2 : 1;
    const stroke = i % 5 === 0 ? "#000" : "#aaa";
    lines.push(
      <Line
        key={i}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />,
    );
  }

  return (
    <View style={styles.container}>
      <Svg
        width="200"
        height="200"
        shadowColor="#000"
        shadowOffset={{ width: 0, height: 0 }}
        shadowOpacity={0.3}
        shadowRadius={10}
      >
        <Circle cx="100" cy="100" r="90" fill="#FFFFFF" />
        <Line
          x1="100"
          y1="100"
          x2={hourX}
          y2={hourY}
          stroke="#000"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <Line
          x1="100"
          y1="100"
          x2={minuteX}
          y2={minuteY}
          stroke="#000"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <Circle cx="100" cy="100" r="4" fill="#F3F3F3" />

        {lines}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 200,
    // borderRadius: 600,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AnalogClock;
