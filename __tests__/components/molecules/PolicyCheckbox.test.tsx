import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { PolicyCheckbox } from '../../../src/components/molecules/PolicyCheckbox';

// Mock del componente Checkbox
jest.mock('../../../src/components/Checkbox', () => ({
  Checkbox: ({ value, onChange, label }: any) => {
    const { TouchableOpacity } = require('react-native');
    return (
      <TouchableOpacity onPress={() => onChange(!value)} testID="checkbox">
        {label}
      </TouchableOpacity>
    );
  },
}));

// Mock de Linking
jest.mock('react-native/Libraries/Linking/Linking', () => ({
  openURL: jest.fn(),
}));

describe('PolicyCheckbox Component', () => {
  const mockProps = {
    value: false,
    onChange: jest.fn(),
    text: 'Acepto los',
    linkText: 'Términos y Condiciones',
    linkUrl: 'https://example.com/terms',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls onChange when checkbox is pressed', () => {
    const onChangeMock = jest.fn();
    const { getByTestId } = render(
      <PolicyCheckbox {...mockProps} onChange={onChangeMock} />
    );

    fireEvent.press(getByTestId('checkbox'));
    expect(onChangeMock).toHaveBeenCalledWith(true);
  });


  it('renders with checked state', () => {
    const { getByTestId } = render(
      <PolicyCheckbox {...mockProps} value={true} />
    );

    expect(getByTestId('checkbox')).toBeTruthy();
  });

});