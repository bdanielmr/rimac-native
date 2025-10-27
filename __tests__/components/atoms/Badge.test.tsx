import { render } from '@testing-library/react-native';
import React from 'react';
import { Badge } from '../../../src/components/atoms/Badge';

describe('Badge Component', () => {
  it('renders correctly with text content', () => {
    const { getByText } = render(<Badge>Promoción</Badge>);
    expect(getByText('Promoción')).toBeTruthy();
  });

  it('renders with different text content', () => {
    const { getByText } = render(<Badge>Nuevo</Badge>);
    expect(getByText('Nuevo')).toBeTruthy();
  });

  it('renders multiple badges independently', () => {
    const { getByText } = render(
      <>
        <Badge>Promoción</Badge>
        <Badge>Destacado</Badge>
        <Badge>Oferta</Badge>
      </>
    );
    
    expect(getByText('Promoción')).toBeTruthy();
    expect(getByText('Destacado')).toBeTruthy();
    expect(getByText('Oferta')).toBeTruthy();
  });

  it('renders with numeric content', () => {
    const { getByText } = render(<Badge>100</Badge>);
    expect(getByText('100')).toBeTruthy();
  });

  it('renders with long text content', () => {
    const longText = 'Este es un texto muy largo para el badge';
    const { getByText } = render(<Badge>{longText}</Badge>);
    expect(getByText(longText)).toBeTruthy();
  });

  it('can be found by testID when provided', () => {
    const { getByTestId } = render(
      <Badge testID="promo-badge">Promoción</Badge>
    );
    expect(getByTestId('promo-badge')).toBeTruthy();
  });

  it('renders with special characters', () => {
    const { getByText } = render(<Badge>50% OFF 🎉</Badge>);
    expect(getByText('50% OFF 🎉')).toBeTruthy();
  });

  it('matches snapshot', () => {
    const { toJSON } = render(<Badge>Promoción</Badge>);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders as Text component', () => {
    const { getByText } = render(<Badge>Test</Badge>);
    const badge = getByText('Test');
    expect(badge.type).toBe('Text');
  });
});