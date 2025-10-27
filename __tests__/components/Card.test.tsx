import { render } from '@testing-library/react-native';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { Card } from '../../src/components/Card';

const mockTheme = {
  colors: {
    surface: '#ffffff',
  },
};

describe('Card Component', () => {
  it('renders as View component', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={mockTheme}>
        <Card testID="card" />
      </ThemeProvider>
    );
    expect(getByTestId('card')).toBeTruthy();
  });
});