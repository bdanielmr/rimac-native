import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import PlanScreen from '../../src/screens/PlanScreen';

// Mock de React Navigation
const mockNavigate = jest.fn();

// Mock del hook usePlanSelection
const mockUsePlanSelection = {
  beneficiaryType: null,
  selectedPlan: null,
  currentPlans: [
    {
      id: 1,
      name: 'Plan en Casa',
      icon: 'homeLight',
      cost: 89,
      benefits: ['Médico a domicilio'],
    },
    {
      id: 2,
      name: 'Plan en Clínica',
      icon: 'hospitalLight',
      badge: 'Recomendado',
      cost: 120,
      benefits: ['Consulta ilimitada'],
    },
  ],
  userName: 'Bryan',
  handleBeneficiarySelect: jest.fn(),
  handlePlanSelect: jest.fn(),
  goBack: jest.fn(),
};

jest.mock('../../src/hooks/usePlanSelection', () => ({
  usePlanSelection: () => mockUsePlanSelection,
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
    return <Text>Step {currentStep} of {steps.length}</Text>;
  },
}));

jest.mock('../../src/components/molecules/BeneficiaryCard', () => ({
  BeneficiaryCard: ({ title, description, selected, onPress }: any) => {
    const { TouchableOpacity, Text } = require('react-native');
    return (
      <TouchableOpacity onPress={onPress} testID={`beneficiary-${title}`}>
        <Text>{title}</Text>
        <Text>{description}</Text>
        <Text>{selected ? 'Selected' : 'Not Selected'}</Text>
      </TouchableOpacity>
    );
  },
}));

jest.mock('../../src/components/molecules/PlanCarousel', () => ({
  PlanCarousel: ({ plans, onSelect }: any) => {
    const { TouchableOpacity, Text } = require('react-native');
    return (
      <>
        {plans.map((plan: any) => (
          <TouchableOpacity
            key={plan.id}
            onPress={() => onSelect(plan.id)}
            testID={`plan-${plan.id}`}
          >
            <Text>{plan.name}</Text>
          </TouchableOpacity>
        ))}
      </>
    );
  },
}));

// Mock de imágenes
jest.mock('../../assets/images/protectionLight.png', () => 'protectionLight');
jest.mock('../../assets/images/addUserLight.png', () => 'addUserLight');

describe('PlanScreen', () => {
  const mockNavigation = {
    navigate: mockNavigate,
  } as any;

  const mockRoute = {} as any;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUsePlanSelection.beneficiaryType = null;
    mockUsePlanSelection.selectedPlan = null;
  });

  it('renders screen with user name and title', () => {
    const { getByText } = render(
      <PlanScreen navigation={mockNavigation} route={mockRoute} />
    );

    expect(getByText('Bryan ¿Para quién deseas cotizar?')).toBeTruthy();
    expect(getByText('Selecciona la opción que se ajuste más a tus necesidades.')).toBeTruthy();
  });

  it('renders step indicator', () => {
    const { getByText } = render(
      <PlanScreen navigation={mockNavigation} route={mockRoute} />
    );

    expect(getByText('Step 1 of 2')).toBeTruthy();
  });

  it('renders both beneficiary cards', () => {
    const { getByText } = render(
      <PlanScreen navigation={mockNavigation} route={mockRoute} />
    );

    expect(getByText('Para mí')).toBeTruthy();
    expect(getByText('Para alguien más')).toBeTruthy();
    expect(getByText('Cotiza tu seguro de salud y agrega familiares si así lo deseas.')).toBeTruthy();
  });

  it('calls handleBeneficiarySelect when beneficiary card is pressed', () => {
    const { getByTestId } = render(
      <PlanScreen navigation={mockNavigation} route={mockRoute} />
    );

    fireEvent.press(getByTestId('beneficiary-Para mí'));
    expect(mockUsePlanSelection.handleBeneficiarySelect).toHaveBeenCalledWith('para-mi');
  });

  it('shows plans when beneficiaryType is selected', () => {
    mockUsePlanSelection.beneficiaryType = 'para-mi';

    const { getByText } = render(
      <PlanScreen navigation={mockNavigation} route={mockRoute} />
    );

    expect(getByText('Plan en Casa')).toBeTruthy();
    expect(getByText('Plan en Clínica')).toBeTruthy();
  });

  it('does not show plans when beneficiaryType is not selected', () => {
    mockUsePlanSelection.beneficiaryType = null;

    const { queryByText } = render(
      <PlanScreen navigation={mockNavigation} route={mockRoute} />
    );

    expect(queryByText('Plan en Casa')).toBeNull();
    expect(queryByText('Plan en Clínica')).toBeNull();
  });

  it('calls handlePlanSelect and navigates when plan is selected', () => {
    mockUsePlanSelection.beneficiaryType = 'para-mi';

    const { getByTestId } = render(
      <PlanScreen navigation={mockNavigation} route={mockRoute} />
    );

    fireEvent.press(getByTestId('plan-1'));
    expect(mockUsePlanSelection.handlePlanSelect).toHaveBeenCalledWith('1');
    expect(mockNavigate).toHaveBeenCalledWith('SummaryFinish', { quoteId: 'result' });
  });

  it('shows back button when beneficiaryType or selectedPlan exists', () => {
    mockUsePlanSelection.beneficiaryType = 'para-mi';

    const { getByText } = render(
      <PlanScreen navigation={mockNavigation} route={mockRoute} />
    );

    expect(getByText('Volver')).toBeTruthy();
    expect(getByText('‹')).toBeTruthy();
  });

  it('does not show back button when no beneficiaryType or selectedPlan', () => {
    mockUsePlanSelection.beneficiaryType = null;
    mockUsePlanSelection.selectedPlan = null;

    const { queryByText } = render(
      <PlanScreen navigation={mockNavigation} route={mockRoute} />
    );

    expect(queryByText('Volver')).toBeNull();
  });

  it('navigates to Home when back button is pressed', () => {
    mockUsePlanSelection.beneficiaryType = 'para-mi';

    const { getByText } = render(
      <PlanScreen navigation={mockNavigation} route={mockRoute} />
    );

    fireEvent.press(getByText('‹'));
    expect(mockNavigate).toHaveBeenCalledWith('Home');
  });
});