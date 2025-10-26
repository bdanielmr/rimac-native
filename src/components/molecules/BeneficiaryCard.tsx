import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { useBreakpoint } from "../../theme/responsive";

const Card = styled(TouchableOpacity)<{ selected: boolean; isMobile: boolean }>`
  background-color: #fff;
  border-radius: 24px;
  border-width: ${(props: any) => (props.selected ? "3px" : "0px")};
  border-color: ${(props: any) => (props.selected ? "#000" : "transparent")};
  padding: 32px 24px;
  position: relative;
  width: ${(props: any) => (props.isMobile ? "336px" : "256px")};
  height: ${(props: any) => (props.isMobile ? "160px" : "212px")};
  align-items: flex-start;
  
  shadow-color: #AEACF3;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.35;
  shadow-radius: 32px;
  elevation: 8;
`;

const RadioButton = styled.View<{ selected: boolean }>`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 24px;
  height: 24px;
  border-radius: 12px;
  border-width: 2px;
  border-color: ${(props: any) => (props.selected ? "#22c55e" : "#D1D5DB")};
  background-color: ${(props: any) => (props.selected ? "#22c55e" : "transparent")};
  align-items: center;
  justify-content: center;
`;

const CheckMark = styled.Text`
  color: #fff;
  font-size: 14px;
  font-weight: 700;
`;

const ContentWrapper = styled.View<{ isMobile: boolean }>`
  flex-direction: ${(props: any) => (props.isMobile ? "row" : "column")};
  align-items: ${(props: any) => (props.isMobile ? "center" : "flex-start")};
  width: 100%;
`;

const IconContainer = styled.View<{ isMobile: boolean }>`
  width: 48px;
  height: 48px;
  margin-bottom: ${(props: any) => (props.isMobile ? "0px" : "20px")};
  margin-right: ${(props: any) => (props.isMobile ? "12px" : "0px")};
`;

const TextContent = styled.View<{ isMobile: boolean }>`
  flex: ${(props: any) => (props.isMobile ? "1" : "0")};
`;

const CardTitle = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: #03050f;
  margin-bottom: 12px;
`;

const CardDescription = styled.Text`
  font-size: 14px;
  color: #03050f;
  line-height: 22px;
`;

interface BeneficiaryCardProps {
  icon: any;
  title: string;
  description: string;
  selected: boolean;
  onPress: () => void;
}

export const BeneficiaryCard: React.FC<BeneficiaryCardProps> = ({
  icon,
  title,
  description,
  selected,
  onPress,
}) => {
  const { isMobile } = useBreakpoint();

  return (
    <Card selected={selected} onPress={onPress} isMobile={isMobile}>
      <RadioButton selected={selected}>
        {selected && <CheckMark>✓</CheckMark>}
      </RadioButton>

      <ContentWrapper isMobile={isMobile}>
        <IconContainer isMobile={isMobile}>
          {icon}
        </IconContainer>

        <TextContent isMobile={isMobile}>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </TextContent>
      </ContentWrapper>
    </Card>
  );
};