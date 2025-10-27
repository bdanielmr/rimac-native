import { render } from '@testing-library/react-native';
import React from 'react';
import { FamilyImageCard } from '../../../src/components/molecules/FamilyImageCard';

// Mock de la imagen
jest.mock('../../../assets/images/family.png', () => 'family-image');

describe('FamilyImageCard Component', () => {

  it('renders with custom dimensions', () => {
    const { UNSAFE_getByType } = render(
      <FamilyImageCard width={400} height={300} />
    );
    
    const view = UNSAFE_getByType('View');
    expect(view.props.style).toMatchObject(
      expect.arrayContaining([
        expect.objectContaining({ width: 400, height: 300 })
      ])
    );
  });

  it('applies default borderRadius of 24', () => {
    const { UNSAFE_getByType } = render(
      <FamilyImageCard width={300} height={200} />
    );
    
    const view = UNSAFE_getByType('View');
    expect(view.props.style).toMatchObject(
      expect.arrayContaining([
        expect.objectContaining({ borderRadius: 24 })
      ])
    );
  });

  it('applies custom borderRadius when provided', () => {
    const { UNSAFE_getByType } = render(
      <FamilyImageCard width={300} height={200} borderRadius={16} />
    );
    
    const view = UNSAFE_getByType('View');
    expect(view.props.style).toMatchObject(
      expect.arrayContaining([
        expect.objectContaining({ borderRadius: 16 })
      ])
    );
  });

  it('renders Image component with correct props', () => {
    const { UNSAFE_getByType } = render(
      <FamilyImageCard width={300} height={200} />
    );
    
    const image = UNSAFE_getByType('Image');
    expect(image.props.resizeMode).toBe('cover');
    expect(image.props.style).toMatchObject({ width: '100%', height: '100%' });
  });
});