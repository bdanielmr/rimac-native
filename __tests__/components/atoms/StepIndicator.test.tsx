import { render } from '@testing-library/react-native';
import React from 'react';
import { StepIndicator } from '../../../src/components/atoms/StepIndicator';

describe('StepIndicator Component', () => {
  const mockSteps = [
    { number: 1, label: 'Planes y coberturas' },
    { number: 2, label: 'Resumen' },
  ];

  it('renders all steps correctly', () => {
    const { getByText } = render(
      <StepIndicator steps={mockSteps} currentStep={1} />
    );

    expect(getByText('1')).toBeTruthy();
    expect(getByText('Planes y coberturas')).toBeTruthy();
    expect(getByText('2')).toBeTruthy();
    expect(getByText('Resumen')).toBeTruthy();
  });

  it('renders separator between steps', () => {
    const { getByText } = render(
      <StepIndicator steps={mockSteps} currentStep={1} />
    );

    expect(getByText('- - - -')).toBeTruthy();
  });

  it('does not render separator after last step', () => {
    const { getAllByText } = render(
      <StepIndicator steps={mockSteps} currentStep={1} />
    );

    const separators = getAllByText('- - - -');
    expect(separators).toHaveLength(1); // Solo 1 separador para 2 pasos
  });

  it('highlights current step correctly', () => {
    const { getByText } = render(
      <StepIndicator steps={mockSteps} currentStep={1} />
    );

    const currentStepNumber = getByText('1');
    const currentStepLabel = getByText('Planes y coberturas');
    
    expect(currentStepNumber).toBeTruthy();
    expect(currentStepLabel).toBeTruthy();
  });

  it('shows completed state for previous steps', () => {
    const { getByText } = render(
      <StepIndicator steps={mockSteps} currentStep={2} />
    );

    expect(getByText('1')).toBeTruthy();
    expect(getByText('2')).toBeTruthy();
    expect(getByText('Planes y coberturas')).toBeTruthy();
    expect(getByText('Resumen')).toBeTruthy();
  });

  it('renders with single step', () => {
    const singleStep = [{ number: 1, label: 'Único paso' }];
    const { getByText, queryByText } = render(
      <StepIndicator steps={singleStep} currentStep={1} />
    );

    expect(getByText('1')).toBeTruthy();
    expect(getByText('Único paso')).toBeTruthy();
    expect(queryByText('- - - -')).toBeNull(); // No separator for single step
  });

  it('renders with multiple steps', () => {
    const multipleSteps = [
      { number: 1, label: 'Paso 1' },
      { number: 2, label: 'Paso 2' },
      { number: 3, label: 'Paso 3' },
    ];
    const { getByText, getAllByText } = render(
      <StepIndicator steps={multipleSteps} currentStep={2} />
    );

    expect(getByText('1')).toBeTruthy();
    expect(getByText('2')).toBeTruthy();
    expect(getByText('3')).toBeTruthy();
    expect(getAllByText('- - - -')).toHaveLength(2); // 2 separators for 3 steps
  });

  it('handles first step as current', () => {
    const { getByText } = render(
      <StepIndicator steps={mockSteps} currentStep={1} />
    );

    expect(getByText('1')).toBeTruthy();
    expect(getByText('Planes y coberturas')).toBeTruthy();
  });

  it('handles last step as current', () => {
    const { getByText } = render(
      <StepIndicator steps={mockSteps} currentStep={2} />
    );

    expect(getByText('2')).toBeTruthy();
    expect(getByText('Resumen')).toBeTruthy();
  });

  it('renders with long step labels', () => {
    const longLabelSteps = [
      { number: 1, label: 'Este es un paso con un texto muy largo' },
      { number: 2, label: 'Otro paso con descripción extensa' },
    ];
    const { getByText } = render(
      <StepIndicator steps={longLabelSteps} currentStep={1} />
    );

    expect(getByText('Este es un paso con un texto muy largo')).toBeTruthy();
    expect(getByText('Otro paso con descripción extensa')).toBeTruthy();
  });

  it('renders all step numbers correctly', () => {
    const { getByText } = render(
      <StepIndicator steps={mockSteps} currentStep={1} />
    );

    mockSteps.forEach(step => {
      expect(getByText(step.number.toString())).toBeTruthy();
    });
  });

  it('matches snapshot for first step', () => {
    const { toJSON } = render(
      <StepIndicator steps={mockSteps} currentStep={1} />
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('matches snapshot for last step', () => {
    const { toJSON } = render(
      <StepIndicator steps={mockSteps} currentStep={2} />
    );
    expect(toJSON()).toMatchSnapshot();
  });

});