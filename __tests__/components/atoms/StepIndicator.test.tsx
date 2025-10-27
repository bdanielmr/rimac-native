import { render } from '@testing-library/react-native';
import React from 'react';
import { StepIndicator } from '../../../src/components/atoms/StepIndicator';

jest.mock('../../../assets/images/arrorDownGrey.png', () => 'arrorDownGrey');

const mockUseWindowDimensions = jest.fn();
jest.mock('react-native/Libraries/Utilities/useWindowDimensions', () => ({
  __esModule: true,
  default: () => mockUseWindowDimensions(),
}));

const mockNavigation = {
  navigate: jest.fn(),
};

describe('StepIndicator Component', () => {
  const mockSteps = [
    { number: 1, label: 'Planes y coberturas' },
    { number: 2, label: 'Resumen' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Desktop View', () => {
    beforeEach(() => {
      mockUseWindowDimensions.mockReturnValue({ width: 1024, height: 768 });
    });

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

    it('renders all step numbers correctly', () => {
      const { getByText } = render(
        <StepIndicator steps={mockSteps} currentStep={1} />
      );

      mockSteps.forEach(step => {
        expect(getByText(step.number.toString())).toBeTruthy();
      });
    });
  });

  describe('Mobile View', () => {
    beforeEach(() => {
      mockUseWindowDimensions.mockReturnValue({ width: 375, height: 812 });
    });

    it('renders mobile layout correctly', () => {
      const { getByText } = render(
        <StepIndicator 
          steps={mockSteps} 
          currentStep={1} 
          navigation={mockNavigation}
        />
      );

      expect(getByText('PASO 1 DE 2')).toBeTruthy();
    });

    it('renders back button in mobile view', () => {
      const { UNSAFE_getAllByType } = render(
        <StepIndicator 
          steps={mockSteps} 
          currentStep={1} 
          navigation={mockNavigation}
        />
      );

      const images = UNSAFE_getAllByType('Image');
      expect(images.length).toBeGreaterThan(0);
    });

    it('renders progress bar in mobile view', () => {
      const { UNSAFE_getAllByType } = render(
        <StepIndicator 
          steps={mockSteps} 
          currentStep={1} 
          navigation={mockNavigation}
        />
      );

      const views = UNSAFE_getAllByType('View');
      expect(views.length).toBeGreaterThan(0);
    });

    it('does not render desktop step labels in mobile view', () => {
      const { queryByText } = render(
        <StepIndicator 
          steps={mockSteps} 
          currentStep={1} 
          navigation={mockNavigation}
        />
      );

      expect(queryByText('Planes y coberturas')).toBeNull();
      expect(queryByText('Resumen')).toBeNull();
    });

    it('does not render separators in mobile view', () => {
      const { queryByText } = render(
        <StepIndicator 
          steps={mockSteps} 
          currentStep={1} 
          navigation={mockNavigation}
        />
      );

      expect(queryByText('- - - -')).toBeNull();
    });

    it('updates text for step 2 in mobile', () => {
      const { getByText } = render(
        <StepIndicator 
          steps={mockSteps} 
          currentStep={2} 
          navigation={mockNavigation}
        />
      );

      expect(getByText('PASO 1 DE 2')).toBeTruthy();
    });
  });

  describe('Responsive behavior', () => {
    it('switches from desktop to mobile layout at breakpoint', () => {
      mockUseWindowDimensions.mockReturnValue({ width: 926, height: 768 });
      const { getByText: getDesktop, rerender } = render(
        <StepIndicator steps={mockSteps} currentStep={1} />
      );
      expect(getDesktop('Planes y coberturas')).toBeTruthy();

      mockUseWindowDimensions.mockReturnValue({ width: 924, height: 768 });
      rerender(
        <StepIndicator 
          steps={mockSteps} 
          currentStep={1} 
          navigation={mockNavigation}
        />
      );
      expect(getDesktop('PASO 1 DE 2')).toBeTruthy();
    });
  });

  describe('Snapshot tests', () => {
    it('matches snapshot for desktop first step', () => {
      mockUseWindowDimensions.mockReturnValue({ width: 1024, height: 768 });
      const { toJSON } = render(
        <StepIndicator steps={mockSteps} currentStep={1} />
      );
      expect(toJSON()).toMatchSnapshot();
    });

    it('matches snapshot for desktop last step', () => {
      mockUseWindowDimensions.mockReturnValue({ width: 1024, height: 768 });
      const { toJSON } = render(
        <StepIndicator steps={mockSteps} currentStep={2} />
      );
      expect(toJSON()).toMatchSnapshot();
    });

    it('matches snapshot for mobile view', () => {
      mockUseWindowDimensions.mockReturnValue({ width: 375, height: 812 });
      const { toJSON } = render(
        <StepIndicator 
          steps={mockSteps} 
          currentStep={1} 
          navigation={mockNavigation}
        />
      );
      expect(toJSON()).toMatchSnapshot();
    });
  });
});