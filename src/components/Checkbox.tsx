import React from "react";
import styled from "styled-components/native";

const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

const CheckboxBox = styled.View<{ checked: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 6px;
  border: 2px solid ${({ checked } : any) => (checked ? "#03050f" : "#5e6488")};
  background: ${({ checked } : any) => (checked ? "#03050f" : "transparent")};
  align-items: center;
  justify-content: center;
`;

const CheckMark = styled.Text`
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
`;

const LabelText = styled.Text`
  flex: 1;
  font-size: 14px;
  color: #03050f;
  line-height: 20px;
`;

interface CheckboxProps {
  value: boolean;
  onChange: (value: boolean) => void;
  label: React.ReactNode;
}

export function Checkbox({ value, onChange, label }: CheckboxProps) {
  return (
    <Container onPress={() => onChange(!value)} activeOpacity={0.7}>
      <CheckboxBox checked={value}>
        {value && <CheckMark>✓</CheckMark>}
      </CheckboxBox>
      <LabelText>{label}</LabelText>
    </Container>
  );
}