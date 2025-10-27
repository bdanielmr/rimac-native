import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import SummaryFinishScreen from '../../src/screens/SummaryFinishScreen';

// Mock de React Navigation
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

// Mock del store
const mockSelectedPlanInfo = {
  userName: 'Juan',
  userLastName: 'Pérez',
  dni: '12345678',
  celular: '987654321',
  planName: 'Plan Familiar',
  planCost: '150.00',
};

const mockUseAppStore = jest.fn();

jest.mock('../../src/store/appStore', () => ({
  useAppStore: () => mockUseAppStore(),
}));

// Mock de componentes
jest.mock('../../src/components/Layout', () => ({
  Layout: ({ children, stepper }: any) => (
    <>
      {stepper}
      {children}
    </>
  ),
}));

jest.mock('../../src/components/atoms/StepIndicator', () => ({
  StepIndicator: ({ steps, currentStep }: any) => {
    const { Text } = require('react-native');
    return <Text testID="step-indicator">Step {currentStep} of {steps.length}</Text>;
  },
}));

// Mock de imagen
jest.mock('../../assets/images/glfamily.png', () => 'glfamily.png');

describe('SummaryFinishScreen', () => {
  const mockNavigation = {
    navigate: mockNavigate,
  } as any;

  const mockRoute = {} as any;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAppStore.mockReturnValue({
      selectedPlanInfo: mockSelectedPlanInfo,
    });
  });

  it('renders screen correctly with plan information', () => {
    const { getByText } = render(
      <SummaryFinishScreen navigation={mockNavigation} route={mockRoute} />
    );

    expect(getByText('Resumen del seguro')).toBeTruthy();
    expect(getByText('PRECIOS CALCULADOS PARA:')).toBeTruthy();
    expect(getByText('Juan Pérez')).toBeTruthy();
  });

  it('displays user information correctly', () => {
    const { getByText } = render(
      <SummaryFinishScreen navigation={mockNavigation} route={mockRoute} />
    );

    expect(getByText('Responsable de pago')).toBeTruthy();
    expect(getByText('DNI: 12345678')).toBeTruthy();
    expect(getByText('Celular: 987654321')).toBeTruthy();
  });

  it('displays selected plan information', () => {
    const { getByText } = render(
      <SummaryFinishScreen navigation={mockNavigation} route={mockRoute} />
    );

    expect(getByText('Plan elegido')).toBeTruthy();
    expect(getByText('Plan Familiar')).toBeTruthy();
    expect(getByText('Costo del Plan: $150.00')).toBeTruthy();
  });

  it('navigates back to Plans screen when back button is pressed', () => {
    const { getByText } = render(
      <SummaryFinishScreen navigation={mockNavigation} route={mockRoute} />
    );

    const backButton = getByText('‹').parent;
    fireEvent.press(backButton);

    expect(mockNavigate).toHaveBeenCalledWith('Plans');
  });

  it('shows message when no plan is selected', () => {
    mockUseAppStore.mockReturnValue({
      selectedPlanInfo: null,
    });

    const { getByText, queryByText } = render(
      <SummaryFinishScreen navigation={mockNavigation} route={mockRoute} />
    );

    expect(getByText('No hay información de plan seleccionado')).toBeTruthy();
    expect(queryByText('Resumen del seguro')).toBeNull();
  });

  it('renders back button with correct text', () => {
    const { getByText } = render(
      <SummaryFinishScreen navigation={mockNavigation} route={mockRoute} />
    );

    expect(getByText('Volver')).toBeTruthy();
    expect(getByText('‹')).toBeTruthy();
  });

  it('displays all section titles', () => {
    const { getByText } = render(
      <SummaryFinishScreen navigation={mockNavigation} route={mockRoute} />
    );

    expect(getByText('PRECIOS CALCULADOS PARA:')).toBeTruthy();
    expect(getByText('Responsable de pago')).toBeTruthy();
    expect(getByText('Plan elegido')).toBeTruthy();
  });
});