import React from "react";
import { Image, View } from "react-native";
import styled from "styled-components/native";
import { Separator } from "../atoms/Separator";

const PlanCardContainer = styled.View<{ $cardWidth?: number }>`
  background-color: #fff;
  border-radius: 20px;
  padding: 24px;
  margin-bottom: 16px;
  position: relative;
  width: ${({ $cardWidth }: any) => ($cardWidth ? `${$cardWidth}px` : "288px")};
  height: 687px;
  shadow-color: #aeacf3;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.35;
  shadow-radius: 32px;
  elevation: 8;
`;

const BadgeContainer = styled.View`
  position: absolute;
  top: 24px;
  left: 24px;
  background-color: #22c55e;
  padding: 6px 12px;
  border-radius: 8px;
  z-index: 1;
`;

const BadgeText = styled.Text`
  color: #fff;
  font-size: 11px;
  font-weight: 700;
`;

const PlanHeader = styled.View<{ hasBadge: boolean }>`
  flex-direction: row;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  margin-top: ${({ hasBadge }: any) => (hasBadge ? "32px" : "0px")};
`;

const PlanIconContainer = styled.View`
  width: 56px;
  height: 56px;
`;

const PlanTitle = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: #03050f;
  flex: 1;
`;

const CostLabel = styled.Text`
  font-size: 11px;
  color: #9ca3af;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
  font-weight: 600;
`;

const CostContainer = styled.View`
  flex-direction: column;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 24px;
`;

const CostBefore = styled.Text`
  font-size: 13px;
  color: #9ca3af;
  text-decoration-line: line-through;
`;

const Cost = styled.Text`
  font-size: 28px;
  font-weight: 700;
  color: #03050f;
`;

const BenefitItem = styled.View`
  flex-direction: row;
  gap: 12px;
  margin-bottom: 16px;
  padding-right: 12px;
`;

const BulletPoint = styled.Text`
  color: #03050f;
  font-size: 16px;
  font-weight: 700;
  margin-top: 2px;
`;

const BenefitText = styled.Text`
  flex: 1;
  font-size: 16px;
  color: #03050f;
  line-height: 30px;
`;

const BenefitTextBold = styled.Text`
  font-weight: 700;
`;

const ContainerBotton = styled.TouchableOpacity`
  position: absolute;
  height: 100px;
  width: 85%;
  bottom: 10;
  display: flex;
  align-items: center;
`;

const SelectButton = styled.TouchableOpacity`
  background-color: #FF1C44;
  padding: 16px 24px;
  border-radius: 999px;
  align-items: center;
  margin-top: 24px;
  width: 224px;
`;

const SelectButtonText = styled.Text`
  color: #fff;
  font-size: 15px;
  font-weight: 700;
`;

interface PlanCardProps {
  name: string;
  icon: string;
  badge?: string;
  cost: number;
  costBefore?: number;
  benefits: string[];
  onSelect: () => void;
  cardWidth?: number;
}

const renderBenefitText = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  
  return (
    <BenefitText>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <BenefitTextBold key={i}>
              {part.slice(2, -2)}
            </BenefitTextBold>
          );
        }
        return part;
      })}
    </BenefitText>
  );
};

const iconMap = {
  homeLight: require('../../../assets/images/homeLight.png'),
  hospitalLight: require('../../../assets/images/hospitalLight.png'),
};

export const PlanCard: React.FC<PlanCardProps> = ({
  name,
  icon,
  badge,
  cost,
  costBefore,
  benefits,
  onSelect,
  cardWidth,
}) => (
  <PlanCardContainer $cardWidth={cardWidth}>
    {badge && (
      <BadgeContainer>
        <BadgeText>{badge}</BadgeText>
      </BadgeContainer>
    )}

    <PlanHeader hasBadge={!!badge}>
      <PlanIconContainer>
        <Image
          source={iconMap[icon as keyof typeof iconMap]}
          style={{
            position: "absolute",
            right: 0,
            top: 0,

          }}
        />
      </PlanIconContainer>
      <PlanTitle>{name}</PlanTitle>
    </PlanHeader>

    <CostLabel>COSTO DEL PLAN</CostLabel>
    <CostContainer>
      {costBefore && <CostBefore>${costBefore} antes</CostBefore>}
      <Cost>${cost} al mes</Cost>
    </CostContainer>
    <Separator />
    <View>
      {benefits.map((benefit, index) => (
        <BenefitItem key={index}>
          <BulletPoint>•</BulletPoint>
          {renderBenefitText(benefit)}
        </BenefitItem>
      ))}
    </View>
      <ContainerBotton>
    <SelectButton onPress={onSelect}>
      <SelectButtonText>Seleccionar plan</SelectButtonText>
    </SelectButton>
    </ContainerBotton>
  </PlanCardContainer>
);