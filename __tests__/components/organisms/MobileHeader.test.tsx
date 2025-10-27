import { render } from '@testing-library/react-native';
import React from 'react';
import { MobileHeader } from '../../../src/components/organisms/MobileHeader';

// Mock de los componentes importados
jest.mock('../../../src/components/atoms/Badge', () => ({
  Badge: ({ children }: any) => {
    const { Text } = require('react-native');
    return <Text>{children}</Text>;
  },
}));

jest.mock('../../../src/components/atoms/Separator', () => ({
  Separator: () => {
    const { View } = require('react-native');
    return <View testID="separator" />;
  },
}));

jest.mock('../../../src/components/atoms/Typography', () => ({
  MobileTitle: ({ children }: any) => {
    const { Text } = require('react-native');
    return <Text>{children}</Text>;
  },
}));

jest.mock('../../../src/components/molecules/FamilyImageCard', () => ({
  FamilyImageCard: () => {
    const { View } = require('react-native');
    return <View testID="family-image-card" />;
  },
}));

describe('MobileHeader Component', () => {
  it('renders badge text correctly', () => {
    const { getByText } = render(<MobileHeader />);
    expect(getByText('Seguro Salud Flexible')).toBeTruthy();
  });

  it('renders title text correctly', () => {
    const { getByText } = render(<MobileHeader />);
    expect(getByText('Creado para ti y tu familia')).toBeTruthy();
  });

  it('renders FamilyImageCard component', () => {
    const { getByTestId } = render(<MobileHeader />);
    expect(getByTestId('family-image-card')).toBeTruthy();
  });

  it('renders Separator component', () => {
    const { getByTestId } = render(<MobileHeader />);
    expect(getByTestId('separator')).toBeTruthy();
  });

});