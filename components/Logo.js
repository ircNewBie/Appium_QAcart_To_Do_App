import React from "react";
import { Image } from "react-native";

const Logo = () => {
  return (
    <Image
      style={{ width: 200, height: 200 }}
      source={require("../assets/logo.png")}
    />
  );
};

export default Logo;
