import React, { useState } from "react";
import {
  FlatList,
  Modal,
  Text,
  TextInputProps
} from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  width: 100%;
`;

const Label = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: #03050f;
  margin-bottom: 8px;
`;

const InputWrapper = styled.View<{ focused: boolean; hasError: boolean }>`
  flex-direction: row;
  border: 1px solid
    ${({ focused, hasError } : any) =>
      hasError ? "#dc2626" : focused ? "#03050f" : "#5e6488"};
  border-radius: 8px;
  background: #ffffff;
  overflow: hidden;
  position: relative;
`;

const DropdownButton = styled.TouchableOpacity`
  padding: 16px;
  border-right-width: 1px;
  border-right-color: #5e6488;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  min-width: 140px;
  justify-content: space-between;
`;

const DropdownText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #03050f;
`;

const InputContainer = styled.View`
  flex: 1;
  position: relative;
  justify-content: center;
`;

const Input = styled.TextInput<{ hasValue: boolean }>`
  flex: 1;
  padding: ${({ hasValue } : any) => (hasValue ? "20px 16px 8px 16px" : "16px")};
  font-size: 16px;
  color: #03050f;
`;

const FloatingPlaceholder = styled.Text<{ isFloating: boolean }>`
  position: absolute;
  left: 16px;
  font-size: ${({ isFloating } : any) => (isFloating ? "12px" : "14px")};
  color: #a9afc3;
  top: ${({ isFloating } : any) => (isFloating ? "8px" : "16px")};
  transition: all 0.2s;
  pointer-events: none;
`;

const ErrorText = styled.Text`
  color: #dc2626;
  font-size: 12px;
  margin-top: 4px;
`;

const ModalOverlay = styled.View`
  flex: 1;
  background: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.View`
  background: #ffffff;
  border-radius: 12px;
  width: 80%;
  max-height: 400px;
  padding: 16px;
`;

const ModalTitle = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: #03050f;
  margin-bottom: 16px;
`;

const OptionButton = styled.TouchableOpacity<{ isSelected: boolean }>`
  padding: 16px;
  border-radius: 8px;
  background: ${({ isSelected } : any) => (isSelected ? "#f0f0f0" : "transparent")};
  border: 1px solid ${({ isSelected } : any) => (isSelected ? "#03050f" : "#e5e7eb")};
  margin-bottom: 8px;
`;

const OptionText = styled.Text<{ isSelected: boolean }>`
  font-size: 16px;
  font-weight: ${({ isSelected } : any) => (isSelected ? "600" : "400")};
  color: #03050f;
`;

const CloseButton = styled.TouchableOpacity`
  padding: 12px;
  background: #e5e7eb;
  border-radius: 8px;
  align-items: center;
  margin-top: 8px;
`;

const CloseButtonText = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: #03050f;
`;

interface DropdownOption {
  label: string;
  value: string;
}

interface TextFieldProps extends TextInputProps {
  label: string;
  error?: string;
  showDropdown?: boolean;
  dropdownOptions?: DropdownOption[];
  selectedDropdownValue?: string;
  onDropdownChange?: (value: string) => void;
  placeholderText?: string;
}

export function TextField({
  label,
  error,
  value,
  showDropdown = false,
  dropdownOptions = [
    { label: "DNI", value: "dni" },
    { label: "CE", value: "ce" },
    { label: "Pasaporte", value: "pasaporte" },
  ],
  selectedDropdownValue = "dni",
  onDropdownChange,
  placeholderText,
  onFocus,
  onBlur,
  ...props
}: TextFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const hasValue = !!value;
  const showFloatingLabel = isFocused || hasValue;

  const selectedOption = dropdownOptions.find(
    (opt) => opt.value === selectedDropdownValue
  );

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const handleDropdownSelect = (value: string) => {
    onDropdownChange?.(value);
    setIsDropdownOpen(false);
  };

  return (
    <Container>
      <Label>{label}</Label>
      <InputWrapper focused={isFocused} hasError={!!error}>
        {showDropdown && (
          <DropdownButton
            onPress={() => setIsDropdownOpen(true)}
            activeOpacity={0.7}
          >
            <DropdownText>{selectedOption?.label || "DNI"}</DropdownText>
            <Text style={{ fontSize: 12 }}>▼</Text>
          </DropdownButton>
        )}
        <InputContainer>
          {placeholderText && (
            <FloatingPlaceholder isFloating={showFloatingLabel}>
              {placeholderText}
            </FloatingPlaceholder>
          )}
          <Input
            value={value}
            onFocus={handleFocus}
            onBlur={handleBlur}
            hasValue={showFloatingLabel}
            {...props}
          />
        </InputContainer>
      </InputWrapper>
      {error && <ErrorText>{error}</ErrorText>}

      <Modal
        visible={isDropdownOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsDropdownOpen(false)}
      >
        <ModalOverlay>
          <ModalContent>
            <ModalTitle>Tipo de documento</ModalTitle>
            <FlatList
              data={dropdownOptions}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <OptionButton
                  isSelected={item.value === selectedDropdownValue}
                  onPress={() => handleDropdownSelect(item.value)}
                  activeOpacity={0.7}
                >
                  <OptionText isSelected={item.value === selectedDropdownValue}>
                    {item.label}
                  </OptionText>
                </OptionButton>
              )}
            />
            <CloseButton
              onPress={() => setIsDropdownOpen(false)}
              activeOpacity={0.7}
            >
              <CloseButtonText>Cerrar</CloseButtonText>
            </CloseButton>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </Container>
  );
}