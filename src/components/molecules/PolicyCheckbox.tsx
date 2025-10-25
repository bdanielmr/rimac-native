import React from "react";
import { Linking } from "react-native";
import styled from "styled-components/native";
import { Checkbox } from "../Checkbox";

const LinkText = styled.Text`
  color: #2563eb;
  text-decoration-line: underline;
`;

const CheckboxText = styled.Text`
  font-size: 12px;
  color: #03050f;
  line-height: 20px;
`;

interface PolicyCheckboxProps {
  value: boolean;
  onChange: (v: boolean) => void;
  text: string;
  linkText: string;
  linkUrl: string;
}

export const PolicyCheckbox: React.FC<PolicyCheckboxProps> = ({
  value,
  onChange,
  text,
  linkText,
  linkUrl,
}) => (
  <Checkbox
    value={value}
    onChange={onChange}
    label={
      <CheckboxText>
        {text}{" "}
        <LinkText onPress={() => Linking.openURL(linkUrl)}>
          {linkText}
        </LinkText>
      </CheckboxText>
    }
  />
);