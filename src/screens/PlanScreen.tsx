import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Image, ScrollView, TouchableOpacity, useWindowDimensions } from "react-native";
import styled from "styled-components/native";
import { StepIndicator } from "../components/atoms/StepIndicator";
import { Layout } from "../components/Layout";
import { BeneficiaryCard } from "../components/molecules/BeneficiaryCard";
import { PlanCarousel } from "../components/molecules/PlanCarousel";
import { usePlanSelection } from "../hooks/usePlanSelection";
import { RootStack } from "../navigation/AppNavigator";

const Container = styled.View`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 0px;
`;

const BackContainer = styled.View`
  padding: 0px 24px;
  margin-bottom: 24px;
`;

const BackText = styled.Text`
  font-size: 18px;
  color: #4338CA;
`;

const TitleContainer = styled.View`
  padding: 0px 24px;
  margin-bottom: 32px;
`;

const Title = styled.Text`
  font-size: 28px;
  font-weight: 700;
  color: #03050f;
  text-align: center;
  margin-bottom: 12px;
`;

const Subtitle = styled.Text`
  font-size: 14px;
  color: #6b7280;
  text-align: center;
`;

const CardsContainer = styled.View`
  flex-direction: row;
  gap: 26px;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0px 24px;
`;

const PlansContainer = styled.View`
  margin-top: 32px;
  padding: 0px 0px;
`;

const CircleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const CircleButton = styled(TouchableOpacity)<{ disabled?: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 20px;
  border-width: 2px;
  border-color: ${({ disabled }: any) => (disabled ? "#CBD5E1" : "#4338CA")};
  align-items: center;
  justify-content: center;
  opacity: ${({ disabled }: any) => (disabled ? 0.5 : 1)};
`;

const STEPS = [
  { number: 1, label: "Planes y coberturas" },
  { number: 2, label: "Resumen" },
];

export default function PlanScreen({
  navigation,
}: NativeStackScreenProps<RootStack, "Plans">) {
  
  const { width } = useWindowDimensions();
  const isMobile = width < 925;
  const {
    beneficiaryType,
    selectedPlan,
    currentPlans,
    userName,
    handleBeneficiarySelect,
    handlePlanSelect,
    goBack,
  } = usePlanSelection();

  const handleSelectPlan = (planId: any) => {
    handlePlanSelect(planId);
    navigation.navigate("SummaryFinish", { quoteId: "result" });
  };

  const content = (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      nestedScrollEnabled
      directionalLockEnabled
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
    >
      <Container>
        {(beneficiaryType || selectedPlan) && !isMobile && (
          <BackContainer>
            <CircleContainer>
              <CircleButton activeOpacity={0.7} onPress={() => navigation.navigate("Home")}>
              <Image
                source={require("../../assets/images/arrowRetur.png")}
              />
              </CircleButton>
              <BackText>Volver</BackText>
            </CircleContainer>
          </BackContainer>
        )}

        <TitleContainer>
          <Title>{userName} ¿Para quién deseas cotizar?</Title>
          <Subtitle>Selecciona la opción que se ajuste más a tus necesidades.</Subtitle>
        </TitleContainer>

        <CardsContainer>
          <BeneficiaryCard
            icon={
              <Image
                source={require("../../assets/images/protectionLight.png")}
                style={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                }}
              />
            }
            title="Para mí"
            description="Cotiza tu seguro de salud y agrega familiares si así lo deseas."
            selected={beneficiaryType === "para-mi"}
            onPress={() => handleBeneficiarySelect("para-mi")}
          />
          <BeneficiaryCard
            icon={
              <Image
                source={require("../../assets/images/addUserLight.png")}
                style={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                }}
              />
            }
            title="Para alguien más"
            description="Realiza una cotización para uno de tus familiares o cualquier persona."
            selected={beneficiaryType === "para-alguien-mas"}
            onPress={() => handleBeneficiarySelect("para-alguien-mas")}
          />
        </CardsContainer>

        {beneficiaryType && (
          <PlansContainer>
            <PlanCarousel
              plans={currentPlans.map((p) => ({ ...p, id: String(p.id) }))}
              onSelect={(id) => handleSelectPlan(id as any)}
            />
          </PlansContainer>
        )}
      </Container>
    </ScrollView>
  );

  return (
    <Layout stepper={<StepIndicator steps={STEPS} currentStep={1} navigation={navigation} />}>
      {content}
    </Layout>
  );
}