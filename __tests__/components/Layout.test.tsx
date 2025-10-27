import { render } from '@testing-library/react-native';
import React from 'react';
import { Text, View } from 'react-native';
import { Layout } from '../../src/components/Layout';
// Mock de las imágenes
jest.mock('../../assets/images/Logo.png', () => 'logo');
jest.mock('../../assets/images/logo-white.png', () => 'logo-white');

describe('Layout Component', () => {
  it('renders children content correctly', () => {
    const { getByText } = render(
      <Layout>
        <Text>Main Content</Text>
      </Layout>
    );

    expect(getByText('Main Content')).toBeTruthy();
  });

  it('renders header with phone number and text', () => {
    const { getByText } = render(
      <Layout>
        <Text>Content</Text>
      </Layout>
    );

    expect(getByText('¡Compra por este medio!')).toBeTruthy();
    expect(getByText('(01) 411 6001')).toBeTruthy();
    expect(getByText('📞')).toBeTruthy();
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
    expect(images).toHaveLength(2); // Header logo + Footer logo
  });
});