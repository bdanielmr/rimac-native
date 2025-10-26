import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";
import { StepIndicator } from "../components/atoms/StepIndicator";
import { Layout } from "../components/Layout";
import { RootStack } from "../navigation/AppNavigator";
import { useBreakpoint } from "../theme/responsive";

const Container = styled.View`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 4% 7% 7%;
`;

const BackButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
`;

const BackText = styled.Text`
  font-size: 14px;
  color: #2563eb;
  font-weight: 600;
`;

const Title = styled.Text`
  font-size: 28px;
  font-weight: 700;
  color: #03050f;
  margin-bottom: 32px;
`;

const SummaryCard = styled.View`
  background-color: #fff;
  border-radius: 20px;
  padding: 32px;
  shadow-color: #aeacf3;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.35;
  shadow-radius: 32px;
  elevation: 8;
  max-width: 928px;
  height: 308px;
`;

const SectionTitle = styled.Text`
  font-size: 11px;
  color: #9ca3af;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
  font-weight: 600;
`;

const UserName = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: #03050f;
  margin-bottom: 24px;
`;

const InfoRow = styled.View`
  margin-top: 16px;
`;

const InfoLabel = styled.Text`
  font-size: 14px;
  font-weight: 700;
  color: #03050f;
  margin-bottom: 4px;
`;

const InfoValue = styled.Text`
  font-size: 14px;
  color: #03050f;
`;

const Divider = styled.View`
  height: 1px;
  background-color: #e5e7eb;
`;

const PlanSection = styled.View`
  margin-top: 20px;
`;

const PlanName = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: #03050f;
  margin-bottom: 8px;
`;

const PlanCost = styled.Text`
  font-size: 14px;
  color: #03050f;
`;

const UserIcon = styled.View`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  background-color: #e0e7ff;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
`;

const STEPS = [
  { number: 1, label: "Planes y coberturas" },
  { number: 2, label: "Resumen" },
];

export default function SummaryFinishScreen({
  route,
  navigation,
}: NativeStackScreenProps<RootStack, "SummaryFinish">) {
  const { quoteId } = route.params;
  const { isMobile } = useBreakpoint();

  const summaryData = {
    userName: "Rocío Miranda Díaz",
    dni: "444888888",
    phone: "5130216147",
    planName: "Plan en Casa y Clínica",
    planCost: "$99 al mes",
  };

  const stepper = (
    <View style={{ alignItems: "center" }}>
      <StepIndicator steps={STEPS} currentStep={2} />
    </View>
  );

  return (
    <Layout stepper={stepper}>
      <Container>
        <BackButton onPress={() => navigation.goBack()}>
          <Text style={{ color: "#2563eb", fontSize: 18 }}>←</Text>
          <BackText>Volver</BackText>
        </BackButton>

        <Title>Resumen del seguro</Title>
        
        <SummaryCard>
          <SectionTitle>PRECIOS CALCULADOS PARA:</SectionTitle>
          
          <View style={{ flexDirection: "row", alignItems: "center", }}>
            <UserIcon>
              <Text style={{ fontSize: 24 }}>👤</Text>
            </UserIcon>
            <UserName style={{ marginBottom: 0, marginLeft: 12 }}>
              {summaryData.userName}
            </UserName>
          </View>
          <Divider />
          <InfoRow>
            <InfoLabel>Responsable de pago</InfoLabel>
            <InfoValue>DNI: {summaryData.dni}</InfoValue>
            <InfoValue>Celular: {summaryData.phone}</InfoValue>
          </InfoRow>

          <PlanSection>
            <InfoLabel>Plan elegido</InfoLabel>
            <PlanName>{summaryData.planName}</PlanName>
            <PlanCost>Costo del Plan: {summaryData.planCost}</PlanCost>
          </PlanSection>
        </SummaryCard>
      </Container>
    </Layout>
  );
}