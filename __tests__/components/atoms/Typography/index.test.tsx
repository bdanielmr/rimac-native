import { render } from '@testing-library/react-native';
import React from 'react';
import { MobileTitle, Subtitle, Title } from '../../../../src/components/atoms/Typography';

describe('Typography Components', () => {
  it('renders Title with text content', () => {
    const { getByText } = render(<Title>Título Principal</Title>);
    expect(getByText('Título Principal')).toBeTruthy();
  });

  it('renders MobileTitle with text content', () => {
    const { getByText } = render(<MobileTitle>Título Móvil</MobileTitle>);
    expect(getByText('Título Móvil')).toBeTruthy();
  });

  it('renders Subtitle with text content', () => {
    const { getByText } = render(<Subtitle>Subtítulo descriptivo</Subtitle>);
    expect(getByText('Subtítulo descriptivo')).toBeTruthy();
  });

  it('renders all typography components as Text elements', () => {
    const { UNSAFE_getAllByType } = render(
      <>
        <Title>Title</Title>
        <MobileTitle>Mobile</MobileTitle>
        <Subtitle>Subtitle</Subtitle>
      </>
    );
    
    const textElements = UNSAFE_getAllByType('Text');
    expect(textElements).toHaveLength(3);
  });

  it('renders with different text lengths', () => {
    const longText = 'Este es un texto muy largo que debería renderizarse correctamente en todos los componentes de tipografía';
    
    const { getAllByText } = render(
      <>
        <Title>{longText}</Title>
        <MobileTitle>{longText}</MobileTitle>
        <Subtitle>{longText}</Subtitle>
      </>
    );
    
    expect(getAllByText(longText)).toHaveLength(3);
  });
});