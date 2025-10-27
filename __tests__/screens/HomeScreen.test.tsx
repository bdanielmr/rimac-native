import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import { Alert } from 'react-native';
import HomeScreen from '../../src/screens/HomeScreen';

// Mock de React Navigation
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

// Mock del hook useQuoteForm
const mockUseQuoteForm = {
  dni: '',
  celular: '',
  aceptaPP: false,
  aceptaMkt: false,
  tipoDocumento: 'dni',
  setTipoDocumento: jest.fn(),
  dniError: '',
  celError: '',
  isFormValid: false,
  handleDniChange: jest.fn(),
  handleCelularChange: jest.fn(),
  handleAceptaPPChange: jest.fn(),
  handleAceptaMktChange: jest.fn(),
  loading: false,
  error: null,
  fetchData: jest.fn(),
};

jest.mock('../../src/hooks/useQuoteForm', () => ({
  useQuoteForm: () => mockUseQuoteForm,
}));

// Mock de componentes
jest.mock('../../src/components/BackgroundGradient', () => ({
  __esModule: true,
  default: () => null,
}));

jest.mock('../../src/components/Layout', () => ({
  Layout: ({ children }: any) => children,
}));

jest.mock('../../src/components/Grid', () => ({
  Grid: ({ top, bottom }: any) => (
    <>
      {top}
      {bottom}
    </>
  ),
}));

jest.mock('../../src/components/organisms/MobileHeader', () => ({
  MobileHeader: () => {
    const { Text } = require('react-native');
    return <Text>Mobile Header</Text>;
  },
}));

jest.mock('../../src/components/organisms/QuoteForm', () => ({
  QuoteForm: ({ onSubmit, ready }: any) => {
    const { TouchableOpacity, Text } = require('react-native');
    return (
      <TouchableOpacity
        onPress={onSubmit}
        disabled={!ready}
        testID="quote-form-submit"
      >
        <Text>Submit Form</Text>
      </TouchableOpacity>
    );
  },
}));

jest.mock('../../src/components/atoms/Badge', () => ({
  Badge: ({ children }: any) => {
    const { Text } = require('react-native');
    return <Text>{children}</Text>;
  },
}));

jest.mock('../../src/components/atoms/Typography', () => ({
  Title: ({ children }: any) => {
    const { Text } = require('react-native');
    return <Text>{children}</Text>;
  },
  Subtitle: ({ children }: any) => {
    const { Text } = require('react-native');
    return <Text>{children}</Text>;
  },
}));

jest.mock('../../src/components/molecules/FamilyImageCard', () => ({
  FamilyImageCard: () => null,
}));

// Mock de Alert
jest.spyOn(Alert, 'alert');

describe('HomeScreen', () => {
  const mockNavigation = {
    navigate: mockNavigate,
  } as any;

  const mockRoute = {} as any;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseQuoteForm.fetchData = jest.fn().mockResolvedValue(true);
    mockUseQuoteForm.error = null;
    mockUseQuoteForm.isFormValid = true;
  });

  it('renders screen correctly', () => {
    const { getByText } = render(
      <HomeScreen navigation={mockNavigation} route={mockRoute} />
    );

    expect(getByText('Mobile Header')).toBeTruthy();
    expect(getByText('Submit Form')).toBeTruthy();
  });

  it('renders subtitle with correct text', () => {
    const { getAllByText } = render(
      <HomeScreen navigation={mockNavigation} route={mockRoute} />
    );

    const subtitles = getAllByText(
      'Tú eliges cuánto pagar. Ingresa tus datos, cotiza y recibe nuestra asesoría. 100% online.'
    );
    expect(subtitles.length).toBeGreaterThan(0);
  });

  it('navigates to Plans screen on successful submit', async () => {
    mockUseQuoteForm.fetchData = jest.fn().mockResolvedValue(true);

    const { getAllByTestId } = render(
      <HomeScreen navigation={mockNavigation} route={mockRoute} />
    );

    const submitButtons = getAllByTestId('quote-form-submit');
    fireEvent.press(submitButtons[0]);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('Plans');
    });
  });

  it('shows alert when fetchData returns false', async () => {
    mockUseQuoteForm.fetchData = jest.fn().mockResolvedValue(false);
    mockUseQuoteForm.error = 'Error en los datos';

    const { getAllByTestId } = render(
      <HomeScreen navigation={mockNavigation} route={mockRoute} />
    );

    const submitButtons = getAllByTestId('quote-form-submit');
    fireEvent.press(submitButtons[0]);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Error', 'Error en los datos');
    });
  });

  it('shows alert on unexpected error', async () => {
    mockUseQuoteForm.fetchData = jest.fn().mockRejectedValue(new Error('Network error'));

    const { getAllByTestId } = render(
      <HomeScreen navigation={mockNavigation} route={mockRoute} />
    );

    const submitButtons = getAllByTestId('quote-form-submit');
    fireEvent.press(submitButtons[0]);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Error', 'Ocurrió un error inesperado');
    });
  });
});