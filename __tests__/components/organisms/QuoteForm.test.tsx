import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { QuoteForm } from '../../../src/components/organisms/QuoteForm';

// Mock de los componentes importados
jest.mock('../../../src/components/Button', () => ({
  Button: ({ title, onPress, disabled }: any) => {
    const { TouchableOpacity, Text } = require('react-native');
    return (
      <TouchableOpacity onPress={onPress} disabled={disabled} testID="submit-button">
        <Text>{title}</Text>
      </TouchableOpacity>
    );
  },
}));

jest.mock('../../../src/components/TextField', () => ({
  TextField: ({ label, value, onChangeText, error }: any) => {
    const { View, Text, TextInput } = require('react-native');
    return (
      <View>
        <Text>{label}</Text>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          testID={`input-${label.toLowerCase()}`}
        />
        {error && <Text>{error}</Text>}
      </View>
    );
  },
}));

jest.mock('../../../src/components/molecules/PolicyCheckbox', () => ({
  PolicyCheckbox: ({ value, onChange, text, linkText }: any) => {
    const { TouchableOpacity, Text } = require('react-native');
    return (
      <TouchableOpacity onPress={() => onChange(!value)} testID={`checkbox-${linkText}`}>
        <Text>{text}</Text>
        <Text>{linkText}</Text>
      </TouchableOpacity>
    );
  },
}));

describe('QuoteForm Component', () => {
  const mockProps = {
    tipoDocumento: 'dni',
    setTipoDocumento: jest.fn(),
    dni: '',
    handleDniChange: jest.fn(),
    celular: '',
    handleCelularChange: jest.fn(),
    aceptaPP: false,
    setAceptaPP: jest.fn(),
    aceptaMkt: false,
    setAceptaMkt: jest.fn(),
    loading: false,
    ready: false,
    onSubmit: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders DNI and Celular fields', () => {
    const { getByText } = render(<QuoteForm {...mockProps} />);
    
    expect(getByText('DNI')).toBeTruthy();
    expect(getByText('Celular')).toBeTruthy();
  });

  it('calls handleDniChange when DNI input changes', () => {
    const { getByTestId } = render(<QuoteForm {...mockProps} />);
    
    fireEvent.changeText(getByTestId('input-dni'), '12345678');
    expect(mockProps.handleDniChange).toHaveBeenCalledWith('12345678');
  });

  it('calls handleCelularChange when Celular input changes', () => {
    const { getByTestId } = render(<QuoteForm {...mockProps} />);
    
    fireEvent.changeText(getByTestId('input-celular'), '987654321');
    expect(mockProps.handleCelularChange).toHaveBeenCalledWith('987654321');
  });

  it('renders error messages when provided', () => {
    const { getByText } = render(
      <QuoteForm
        {...mockProps}
        dniError="DNI inválido"
        celError="Celular inválido"
      />
    );
    
    expect(getByText('DNI inválido')).toBeTruthy();
    expect(getByText('Celular inválido')).toBeTruthy();
  });

  it('renders both policy checkboxes', () => {
    const { getByText } = render(<QuoteForm {...mockProps} />);
    
    expect(getByText('Política de Privacidad')).toBeTruthy();
    expect(getByText('Política Comunicaciones Comerciales')).toBeTruthy();
  });

  it('calls setAceptaPP when privacy policy checkbox is toggled', () => {
    const { getByTestId } = render(<QuoteForm {...mockProps} />);
    
    fireEvent.press(getByTestId('checkbox-Política de Privacidad'));
    expect(mockProps.setAceptaPP).toHaveBeenCalledWith(true);
  });

  it('calls setAceptaMkt when marketing checkbox is toggled', () => {
    const { getByTestId } = render(<QuoteForm {...mockProps} />);
    
    fireEvent.press(getByTestId('checkbox-Política Comunicaciones Comerciales'));
    expect(mockProps.setAceptaMkt).toHaveBeenCalledWith(true);
  });

  it('renders submit button with correct text when not loading', () => {
    const { getByText } = render(<QuoteForm {...mockProps} />);
    
    expect(getByText('Cotiza aquí')).toBeTruthy();
  });

  it('renders submit button with loading text when loading', () => {
    const { getByText } = render(
      <QuoteForm {...mockProps} loading={true} />
    );
    
    expect(getByText('Cargando...')).toBeTruthy();
  });

  it('calls onSubmit when submit button is pressed', () => {
    const { getByTestId } = render(
      <QuoteForm {...mockProps} ready={true} />
    );
    
    fireEvent.press(getByTestId('submit-button'));
    expect(mockProps.onSubmit).toHaveBeenCalledTimes(1);
  });

  it('renders terms and conditions link', () => {
    const { getByText } = render(<QuoteForm {...mockProps} />);
    
    expect(getByText('Aplican Términos y Condiciones.')).toBeTruthy();
  });

});