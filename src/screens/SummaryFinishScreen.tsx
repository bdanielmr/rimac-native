import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { StepIndicator } from "../components/atoms/StepIndicator";
import { Layout } from "../components/Layout";
import { RootStack } from "../navigation/AppNavigator";
import { useAppStore } from "../store/appStore";

const Container = styled.View`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 4% 7% 7%;
`;

const BackText = styled.Text`
  font-size: 18px;
  color: #4338CA;
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
  font-size: 10px;
  color: #141938;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
  font-weight: 700;
`;

const UserName = styled.Text`
  font-size: 20px;
  font-weight: 500;
  color: #03050f;
  margin-bottom: 24px;
`;

const InfoRow = styled.View`
  margin-top: 16px;
`;

const InfoLabel = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: #141938;
  margin-bottom: 4px;
`;

const InfoValue = styled.Text`
  font-size: 14px;
  color: #141938;
  line-height: 25px;
`;

const Divider = styled.View`
  height: 1px;
  background-color: #e5e7eb;
  margin-top: 15px
`;

const PlanSection = styled.View`
  margin-top: 20px;
`;

const PlanName = styled.Text`
  font-size: 14px;
  color: #141938;
  margin-bottom: 8px;
`;

const PlanCost = styled.Text`
  font-size: 14px;
  color: #141938;
`;

const UserIcon = styled.View`
  width: 24px;
  height: 24px;
`;

const CircleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
`;

const CircleButton = styled(TouchableOpacity)<{ disabled?: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 20px;
  border-width: 2px;
  border-color: ${({ disabled }: any) => (disabled ? "#CBD5E1" : "#4338CA")};
  align-items: center;
  justify-content: center;
  padding: 0px 4px 4px 2px;
  opacity: ${({ disabled }: any) => (disabled ? 0.5 : 1)};
`;



const STEPS = [
  { number: 1, label: "Planes y coberturas" },
  { number: 2, label: "Resumen" },
];

export default function SummaryFinishScreen({
  navigation,
}: NativeStackScreenProps<RootStack, "SummaryFinish">) {
  const { selectedPlanInfo } = useAppStore();

  const stepper = (
    <View style={{ alignItems: "center" }}>
      <StepIndicator steps={STEPS} currentStep={2} />
    </View>
  );
  if (!selectedPlanInfo) {
    return (
      <Layout>
        <Text>No hay información de plan seleccionado</Text>
      </Layout>
    );
  }
  return (
    <Layout stepper={stepper}>
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
      <Container>
          <CircleContainer>
            <CircleButton activeOpacity={0.7} onPress={() => navigation.navigate("Plans")}>
              <Text style={{ fontSize: 18, color: "#4338CA" }}>‹</Text>
            </CircleButton>
            <BackText>Volver</BackText>
          </CircleContainer>

        <Title>Resumen del seguro</Title>
        
        <SummaryCard>
          <SectionTitle>PRECIOS CALCULADOS PARA:</SectionTitle>
          
          <View style={{ flexDirection: "row", alignItems: "center", }}>
            <UserIcon>

                <Image
                  source={require("../../assets/images/glfamily.png")}
                  style={{
                    position: "absolute",
                    right: 0,
                    top: 0,
                  }}
                />
            </UserIcon>
            <UserName style={{ marginBottom: 0, marginLeft: 12 }}>
              {selectedPlanInfo.userName} {selectedPlanInfo.userLastName}
            </UserName>
          </View>
          <Divider />
          <InfoRow>
            <InfoLabel>Responsable de pago</InfoLabel>
            <InfoValue>DNI: {selectedPlanInfo.dni}</InfoValue>
            <InfoValue>Celular: {selectedPlanInfo.celular}</InfoValue>
          </InfoRow>

          <PlanSection>
            <InfoLabel>Plan elegido</InfoLabel>
            <PlanName>{selectedPlanInfo.planName}</PlanName>
            <PlanCost>Costo del Plan: ${selectedPlanInfo.planCost}</PlanCost>
          </PlanSection>
        </SummaryCard>
      </Container>
      </ScrollView>
    </Layout>
  );
}