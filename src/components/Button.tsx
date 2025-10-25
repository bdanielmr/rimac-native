import React from "react";
import styled from "styled-components/native";

const StyledButton = styled.TouchableOpacity<{ disabled?: boolean }>`
  background: ${({ disabled } : any) => (disabled ? "#c5cad6" : "#03050f")};
  padding: 20px;
  border-radius: 40px;
  align-items: center;
  justify-content: center;
  width: 195px;
  heigt: 64px;
  margin-bottom: 16px;
`;

const ButtonText = styled.Text<{ disabled?: boolean }>`
  color: #ffffff;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.4px;
`;

interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

export function Button({ title, onPress, disabled }: ButtonProps) {
  return (
    <StyledButton onPress={onPress} disabled={disabled} activeOpacity={0.8}>
      <ButtonText disabled={disabled}>{title}</ButtonText>
    </StyledButton>
  );
}