import React from "react";
import styled from "styled-components/native";

const StepContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 20px 16px;
`;

const StepCircle = styled.View<{ active: boolean; completed: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background-color: ${(props: any) =>
    props.completed || props.active ? "#4F4FFF" : "transparent"};
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-color: ${(props: any) =>
    props.completed || props.active ? "#FFFFFF" : "#7981B2"};
`;

const StepNumber = styled.Text<{ active: boolean; completed: boolean }>`
  color: ${(props: any) => (props.active || props.completed ? "white" : "#7981B2")};
  font-weight: 700;
  font-size: 12px;
`;

const StepLabel = styled.Text<{ active: boolean }>`
  font-size: 16px;
  font-weight: ${(props: any) => (props.active ? "700" : "400")};
  color: ${(props: any) => (props.active ? "#141938" : "#7981B2")};
`;

const SeparatorIndicator = styled.Text`
  color: #4F4FFF;
  margin: 0 16px;
  font-size: 20px;
`;

const StepWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

interface Step {
  number: number;
  label: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep }) => (
  <StepContainer>
    {steps.map((step, index) => (
      <React.Fragment key={step.number}>
        <StepWrapper>
          <StepCircle
            active={currentStep === step.number}
            completed={currentStep > step.number}
          >
            <StepNumber
              active={currentStep === step.number}
              completed={currentStep > step.number}
            >
              {step.number}
            </StepNumber>
          </StepCircle>
          <StepLabel active={currentStep === step.number}>{step.label}</StepLabel>
        </StepWrapper>
        {index < steps.length - 1 && (
          <SeparatorIndicator>- - - -</SeparatorIndicator>
        )}
      </React.Fragment>
    ))}
  </StepContainer>
);