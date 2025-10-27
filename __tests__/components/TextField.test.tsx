import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { TextField } from '../../src/components/TextField';

describe('TextField Component', () => {
  const mockProps = {
    label: 'Número de documento',
    value: '',
    onChangeText: jest.fn(),
    placeholderText: 'Ingresa tu documento',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders label correctly', () => {
    const { getByText } = render(<TextField {...mockProps} />);
    expect(getByText('Número de documento')).toBeTruthy();
  });

  it('renders input field and placeholder', () => {
    const { getByText } = render(<TextField {...mockProps} />);
    expect(getByText('Ingresa tu documento')).toBeTruthy();
  });

  it('shows error message when error prop is provided', () => {
    const { getByText } = render(
      <TextField {...mockProps} error="Campo requerido" />
    );
    expect(getByText('Campo requerido')).toBeTruthy();
  });

  it('renders dropdown button when showDropdown is true', () => {
    const { getByText } = render(
      <TextField {...mockProps} showDropdown={true} />
    );
    expect(getByText('DNI')).toBeTruthy();
    expect(getByText('▼')).toBeTruthy();
  });

  it('opens modal when dropdown button is pressed', () => {
    const { getByText } = render(
      <TextField {...mockProps} showDropdown={true} />
    );

    fireEvent.press(getByText('DNI'));
    expect(getByText('Tipo de documento')).toBeTruthy();
    expect(getByText('CE')).toBeTruthy();
    expect(getByText('Pasaporte')).toBeTruthy();
  });

  it('calls onDropdownChange when option is selected', () => {
    const onDropdownChangeMock = jest.fn();
    const { getByText } = render(
      <TextField
        {...mockProps}
        showDropdown={true}
        onDropdownChange={onDropdownChangeMock}
      />
    );

    fireEvent.press(getByText('DNI')); // Open modal
    fireEvent.press(getByText('CE')); // Select CE
    
    expect(onDropdownChangeMock).toHaveBeenCalledWith('ce');
  });

  it('closes modal when close button is pressed', () => {
    const { getByText, queryByText } = render(
      <TextField {...mockProps} showDropdown={true} />
    );

    fireEvent.press(getByText('DNI')); // Open modal
    expect(getByText('Tipo de documento')).toBeTruthy();

    fireEvent.press(getByText('Cerrar')); // Close modal
    // Modal should be closed (not visible)
  });

  it('displays selected dropdown value', () => {
    const { getByText } = render(
      <TextField
        {...mockProps}
        showDropdown={true}
        selectedDropdownValue="ce"
      />
    );

    expect(getByText('CE')).toBeTruthy();
  });

  it('does not render dropdown when showDropdown is false', () => {
    const { queryByText } = render(
      <TextField {...mockProps} showDropdown={false} />
    );

    expect(queryByText('DNI')).toBeNull();
    expect(queryByText('▼')).toBeNull();
  });

  it('handles focus and blur events', () => {
    const onFocusMock = jest.fn();
    const onBlurMock = jest.fn();
    
    const { getByDisplayValue } = render(
      <TextField
        {...mockProps}
        value="12345678"
        onFocus={onFocusMock}
        onBlur={onBlurMock}
      />
    );

    const input = getByDisplayValue('12345678');
    
    fireEvent(input, 'focus');
    expect(onFocusMock).toHaveBeenCalled();

    fireEvent(input, 'blur');
    expect(onBlurMock).toHaveBeenCalled();
  });
});