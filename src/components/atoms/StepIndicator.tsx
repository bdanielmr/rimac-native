import React from "react";
import { Image, TouchableOpacity, useWindowDimensions } from "react-native";
import styled from "styled-components/native";

const StepContainer = styled.View`
  flex-direction: row;

  justify-content: center;
  padding: 20px 16px;
`;

const StepContainerMobile = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 20px 30px;
  gap: 10px;
  background: white;
  borderBottomColor: #D7DBF5;
  borderBottomWidth: 1;
`;

const StepCircle = styled.View<{ active: boolean; completed: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background-color: ${(props: any) =>
    props.active ? "#4F4FFF" : props.completed ? "transparent" : "transparent"};
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-color: ${(props: any) =>
    props.active ? "#4F4FFF" : props.completed ? "#7981B2" : "#7981B2"};
`;

const StepNumber = styled.Text<{ active: boolean; completed: boolean }>`
  color: ${(props: any) => 
    props.active ? "white" : props.completed ? "#7981B2" : "#7981B2"};
  font-weight: 700;
  font-size: 12px;
`;

const StepLabel = styled.Text<{ active: boolean; completed: boolean }>`
  font-size: 16px;
  font-weight: ${(props: any) => (props.active ? "700" : "400")};
  color: ${(props: any) => 
    props.active ? "#141938" : props.completed ? "#7981B2" : "#7981B2"};
`;

const StepLabelMobile = styled.Text<{ active: boolean; completed: boolean }>`
  font-size: 10px;
  font-weight: 700;
  color: #141938
`;

const SeparatorIndicator = styled.Text<{ completed: boolean }>`
  color: ${(props: any) => (props.completed ? "#7981B2" : "#4F4FFF")};
  margin: 0 16px;
  font-size: 20px;
`;

const StepWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

const CircleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const CircleButton = styled(TouchableOpacity)<{ disabled?: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 20px;
  border-width: 2px;
  border-color: #CBD5E1;
  align-items: center;
  justify-content: center;
  opacity: ${({ disabled }: any) => (disabled ? 0.5 : 1)};
`;

const ProgressWrapper = styled.View`
  position: relative;
  width: 70%;
  height: 8px;
  background-color: #C5CAE9;
  border-radius: 8px;
  overflow: visible;
`;

const ProgressFill = styled.View`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 5%;
  background-color: #4F4FFF;
  border-radius: 8px;
`;


interface Step {
  number: number;
  label: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  navigation?: any
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep, navigation }) =>{

  const { width } = useWindowDimensions();
  const isMobile = width < 925;

  return isMobile ? ( 
  <StepContainerMobile>
    <CircleContainer>
      <CircleButton activeOpacity={0.7} onPress={() => navigation.navigate("Home")}>
        <Image
          source={require("../../../assets/images/arrorDownGrey.png")}
        />
      </CircleButton>
    </CircleContainer>
    <StepLabelMobile active={true} completed={false}>
      PASO 1 DE 2
    </StepLabelMobile>
    <ProgressWrapper>
      <ProgressFill />
    </ProgressWrapper>

  </StepContainerMobile>
) :  ( 
  <StepContainer>
    {steps.map((step, index) => {
      const isActive = currentStep === step.number;
      const isCompleted = currentStep > step.number;
      
      return (
        <React.Fragment key={step.number}>
          <StepWrapper>
            <StepCircle active={isActive} completed={isCompleted}>
              <StepNumber active={isActive} completed={isCompleted}>
                {step.number}
              </StepNumber>
            </StepCircle>
            <StepLabel active={isActive} completed={isCompleted}>
              {step.label}
            </StepLabel>
          </StepWrapper>
          {index < steps.length - 1 && (
            <SeparatorIndicator completed={isCompleted}>
              - - - -
            </SeparatorIndicator>
          )}
        </React.Fragment>
      );
    })}
  </StepContainer>
);
}