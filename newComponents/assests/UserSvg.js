import * as React from "react";
import { Platform } from "react-native";
import Svg, { Ellipse, Path } from "react-native-svg";
const SvgComponent = (props) => {
  function svgWidthHeight() {
    if (Platform.OS === "android") {
      return "10 10 512 512";
    } else if (Platform.OS === "web") {
      return "-10 -50 650 650";
    }
  }
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={svgWidthHeight()}
      xmlSpace="preserve"
      {...props}
    >
      <Path
        style={{
          fill: "#fff",
        }}
        d="M256 508C117.04 508 4 394.96 4 256S117.04 4 256 4s252 113.04 252 252-113.04 252-252 252z"
      />
      <Path
        style={{
          fill: "#d6d6d6",
        }}
        d="M256 8c136.752 0 248 111.248 248 248S392.752 504 256 504 8 392.752 8 256 119.248 8 256 8m0-8C114.608 0 0 114.608 0 256s114.608 256 256 256 256-114.608 256-256S397.392 0 256 0z"
      />
      <Ellipse
        style={{
          fill: "#0ba4e0",
        }}
        cx={256}
        cy={175.648}
        rx={61.712}
        ry={60.48}
      />
      <Path
        style={{
          fill: "#0ba4e0",
        }}
        d="M362.592 360.624c0-57.696-47.728-104.464-106.592-104.464s-106.592 46.768-106.592 104.464h213.184z"
      />
    </Svg>
  );
};

export default SvgComponent;
