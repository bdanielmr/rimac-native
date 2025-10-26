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