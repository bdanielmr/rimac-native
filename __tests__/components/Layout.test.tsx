import { render } from '@testing-library/react-native';
import React from 'react';
import { Text, View } from 'react-native';
import { Layout } from '../../src/components/Layout';

// Mock de las imágenes
jest.mock('../../assets/images/Logo.png', () => 'logo');
jest.mock('../../assets/images/logo-white.png', () => 'logo-white');
jest.mock('../../assets/images/telephoneSolid.png', () => 'telephone');

// Mock de useSafeAreaInsets
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: jest.fn(() => ({
    top: 44,
    bottom: 34,
    left: 0,
    right: 0,
  })),
}));

describe('Layout Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders children content correctly', () => {
    const { getByText } = render(
      <Layout>
        <Text>Main Content</Text>
      </Layout>
    );

    expect(getByText('Main Content')).toBeTruthy();
  });

  it('renders header with phone number', () => {
    const { getByText } = render(
      <Layout>
        <Text>Content</Text>
      </Layout>
    );

    expect(getByText('(01) 411 6001')).toBeTruthy();
  });

  it('renders footer with copyright text', () => {
    const { getByText } = render(
      <Layout>
        <Text>Content</Text>
      </Layout>
    );

    expect(getByText('© 2023 RIMAC Seguros y Reaseguros.')).toBeTruthy();
  });

  it('renders stepper when provided', () => {
    const { getByText } = render(
      <Layout stepper={<Text>Step Indicator</Text>}>
        <Text>Content</Text>
      </Layout>
    );

    expect(getByText('Step Indicator')).toBeTruthy();
  });

  it('does not render stepper when not provided', () => {
    const { queryByText } = render(
      <Layout>
        <Text>Content</Text>
      </Layout>
    );

    expect(queryByText('Step Indicator')).toBeNull();
  });

  it('renders background when provided', () => {
    const { getByTestId } = render(
      <Layout background={<View testID="background" />}>
        <Text>Content</Text>
      </Layout>
    );

    expect(getByTestId('background')).toBeTruthy();
  });

  it('renders logos in header and footer', () => {
    const { UNSAFE_getAllByType } = render(
      <Layout>
        <Text>Content</Text>
      </Layout>
    );

    const images = UNSAFE_getAllByType('Image');
    expect(images.length).toBeGreaterThanOrEqual(3); // Header logo + Telephone + Footer logo
  });

  it('applies safe area insets', () => {
    const { useSafeAreaInsets } = require('react-native-safe-area-context');
    
    render(
      <Layout>
        <Text>Content</Text>
      </Layout>
    );

    expect(useSafeAreaInsets).toHaveBeenCalled();
  });
});