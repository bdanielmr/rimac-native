import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import styled from "styled-components/native";

const BadgeContainer = styled.View`
  align-self: flex-start;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 8px;
`;

const BadgeGradient = styled(LinearGradient)`
  padding: 6px 10px;
  border-radius: 4px;
`;

const BadgeText = styled.Text`
  color: #03050F;
  font-weight: 700;
  font-size: 12px;
`;

interface BadgeProps {
  children: React.ReactNode;
  testID?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, testID }) => (
  <BadgeContainer testID={testID}>
    <BadgeGradient
      colors={["#00F4E2", "#00FF7F"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <BadgeText>{children}</BadgeText>
    </BadgeGradient>
  </BadgeContainer>
);