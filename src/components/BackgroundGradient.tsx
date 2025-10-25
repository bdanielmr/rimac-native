import React from "react";
import { Image, View } from "react-native";
import { useBreakpoint } from "../theme/responsive";

export default function BackgroundGradient() {
  const { isMobile } = useBreakpoint();

  if (isMobile) {
    return (
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "#ffffff",
          overflow: "hidden",
        }}
        pointerEvents="none"
      >
        <Image
          source={require("../../assets/images/right-teal-mobile.png")}
          style={{
            position: "absolute",
            right: 0,
            top: 0,

          }}
        />
        <Image
          source={require("../../assets/images/left-violet-mobile.png")}
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
          }}
        />
      </View>
    );
  }

  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#ffffff",
        overflow: "hidden",
      }}
      pointerEvents="none"
    >
      <Image
        source={require("../../assets/images/left-violet.png")}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
        }}
        resizeMode="contain"
      />

      <Image
        source={require("../../assets/images/right-teal.png")}
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
        }}
        resizeMode="contain"
      />
    </View>
  );
}