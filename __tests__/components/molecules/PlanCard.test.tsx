import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { PlanCard } from '../../../src/components/molecules/PlanCard';

// Mock de las imágenes
jest.mock('../../../assets/images/homeLight.png', () => 'homeLight');
jest.mock('../../../assets/images/hospitalLight.png', () => 'hospitalLight');

// Mock del Separator
jest.mock('../../../src/components/atoms/Separator', () => ({
  Separator: () => null,
}));

describe('PlanCard Component', () => {
  const mockProps = {
    name: 'Plan en Casa',
    icon: 'homeLight',
    cost: 89,
    benefits: [
      'Médico general a domicilio',
      'Consulta **ilimitada** en clínica',
      'Chequeos preventivos anuales',
    ],
    onSelect: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders plan name and cost correctly', () => {
    const { getByText } = render(<PlanCard {...mockProps} />);

    expect(getByText('Plan en Casa')).toBeTruthy();
    expect(getByText('$89 al mes')).toBeTruthy();
    expect(getByText('COSTO DEL PLAN')).toBeTruthy();
  });

  it('renders all benefits correctly', () => {
    const { getByText } = render(<PlanCard {...mockProps} />);

    expect(getByText('Médico general a domicilio')).toBeTruthy();
    expect(getByText('ilimitada')).toBeTruthy();
    expect(getByText('Chequeos preventivos anuales')).toBeTruthy();
  });

  it('calls onSelect when button is pressed', () => {
    const onSelectMock = jest.fn();
    const { getByText } = render(
      <PlanCard {...mockProps} onSelect={onSelectMock} />
    );

    fireEvent.press(getByText('Seleccionar plan'));
    expect(onSelectMock).toHaveBeenCalledTimes(1);
  });

  it('renders badge when provided', () => {
    const { getByText } = render(
      <PlanCard {...mockProps} badge="Recomendado" />
    );

    expect(getByText('Recomendado')).toBeTruthy();
  });

  it('renders cost before when provided', () => {
    const { getByText } = render(
      <PlanCard {...mockProps} costBefore={120} />
    );

    expect(getByText('$120 antes')).toBeTruthy();
    expect(getByText('$89 al mes')).toBeTruthy();
  });

  it('does not render badge when not provided', () => {
    const { queryByText } = render(<PlanCard {...mockProps} />);

    expect(queryByText('Recomendado')).toBeNull();
  });

});