import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { Text } from 'react-native';
import { BeneficiaryCard } from '../../../src/components/molecules/BeneficiaryCard';

jest.mock('../../../src/theme/responsive', () => ({
  useBreakpoint: jest.fn(() => ({ isMobile: true })),
}));

describe('BeneficiaryCard Component', () => {
  const mockIcon = <Text testID="mock-icon">Icon</Text>;
  const mockProps = {
    icon: mockIcon,
    title: 'Para mí',
    description: 'Cotiza tu seguro de salud y agrega familiares si así lo deseas.',
    selected: false,
    onPress: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with title and description', () => {
    const { getByText } = render(<BeneficiaryCard {...mockProps} />);

    expect(getByText('Para mí')).toBeTruthy();
    expect(getByText('Cotiza tu seguro de salud y agrega familiares si así lo deseas.')).toBeTruthy();
  });

  it('calls onPress when card is pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <BeneficiaryCard {...mockProps} onPress={onPressMock} />
    );

    fireEvent.press(getByText('Para mí'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('shows checkmark when selected', () => {
    const { getByText } = render(
      <BeneficiaryCard {...mockProps} selected={true} />
    );

    expect(getByText('✓')).toBeTruthy();
  });

  it('does not show checkmark when not selected', () => {
    const { queryByText } = render(
      <BeneficiaryCard {...mockProps} selected={false} />
    );

    expect(queryByText('✓')).toBeNull();
  });

  it('renders icon correctly', () => {
    const { getByTestId } = render(<BeneficiaryCard {...mockProps} />);

    expect(getByTestId('mock-icon')).toBeTruthy();
  });
});