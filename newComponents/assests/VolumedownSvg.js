import * as React from "react";
import Svg, { Path } from "react-native-svg";

function VolumedownSvg(w, h, color) {
  return (
    <Svg
      fill={color}
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      xmlSpace="preserve"
      width={w}
      height={h}
    >
      <Path d="M6.5 8.5l6 7 6-7h-12z" />
    </Svg>
  );
}

export default VolumedownSvg;
