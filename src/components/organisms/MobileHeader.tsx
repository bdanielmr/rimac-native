import React from "react";
import { View } from "react-native";
import { Badge } from "../atoms/Badge";
import { Separator } from "../atoms/Separator";
import { MobileTitle } from "../atoms/Typography";
import { FamilyImageCard } from "../molecules/FamilyImageCard";

export const MobileHeader: React.FC = () => (
  <View style={{ width: "100%" }}>
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        marginBottom: 24,
      }}
    >
      <View style={{ flex: 1, paddingRight: 8, justifyContent: "center" }}>
        <Badge>Seguro Salud Flexible</Badge>
        <MobileTitle>Creado para ti y tu familia</MobileTitle>
      </View>

      <View
        style={{
          width: 200,
          height: 193,
          flexShrink: 1,
          maxWidth: "40%",
        }}
      >
        <FamilyImageCard width="100%" height="100%" borderRadius={20} />
      </View>
    </View>
    <Separator />
  </View>
);