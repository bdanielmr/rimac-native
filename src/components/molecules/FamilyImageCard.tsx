import React from "react";
import { Image, View } from "react-native";

const IMAGE_CARD_STYLE = {
  backgroundColor: "#ffffff",
  overflow: "hidden" as const,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.1,
  shadowRadius: 12,
  elevation: 5,
};

interface FamilyImageCardProps {
  width: number | string;
  height: number | string;
  borderRadius?: number;
}

export const FamilyImageCard: React.FC<FamilyImageCardProps> = ({
  width,
  height,
  borderRadius = 24,
}) => (
  <View style={[IMAGE_CARD_STYLE, { borderRadius, width, height } as any]}>
    <Image
      source={require("../../../assets/images/family.png")}
      resizeMode="cover"
      style={{ width: "100%", height: "100%" }}
    />
  </View>
);