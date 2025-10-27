import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { PlanCarousel } from '../../../src/components/molecules/PlanCarousel';

// Mock del hook useCarousel
jest.mock('../../../src/hooks/useCarousel', () => ({
  useCarousel: jest.fn(() => ({
    scrollRef: { current: null },
    index: 0,
    offsets: [0, 300, 600],
    handleScroll: jest.fn(),
    handleScrollBeginDrag: jest.fn(),
    handleMomentumEnd: jest.fn(),
    canGoPrev: false,
    canGoNext: true,
    goToPrev: jest.fn(),
    goToNext: jest.fn(),
  })),
}));

// Mock del PlanCard
jest.mock('../../../src/components/molecules/PlanCard', () => ({
  PlanCard: ({ name, onSelect }: any) => {
    const { Text, TouchableOpacity } = require('react-native');
    return (
      <TouchableOpacity onPress={onSelect}>
        <Text>{name}</Text>
      </TouchableOpacity>
    );
  },
}));

describe('PlanCarousel Component', () => {
  const mockPlans = [
    {
      id: '1',
      name: 'Plan en Casa',
      icon: 'homeLight',
      cost: 89,
      benefits: ['Médico a domicilio'],
    },
    {
      id: '2',
      name: 'Plan en Clínica',
      icon: 'hospitalLight',
      badge: 'Recomendado',
      cost: 120,
      costBefore: 150,
      benefits: ['Consulta ilimitada'],
    },
  ];

  const mockOnSelect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all plans correctly', () => {
    const { getByText } = render(
      <PlanCarousel plans={mockPlans} onSelect={mockOnSelect} />
    );

    expect(getByText('Plan en Casa')).toBeTruthy();
    expect(getByText('Plan en Clínica')).toBeTruthy();
  });

  it('calls onSelect with correct plan id when plan is selected', () => {
    const { getByText } = render(
      <PlanCarousel plans={mockPlans} onSelect={mockOnSelect} />
    );

    fireEvent.press(getByText('Plan en Casa'));
    expect(mockOnSelect).toHaveBeenCalledWith('1');
  });

  it('renders pager with correct page indicator', () => {
    const { getByText } = render(
      <PlanCarousel plans={mockPlans} onSelect={mockOnSelect} />
    );

    expect(getByText('1 / 2')).toBeTruthy();
  });

  it('renders navigation buttons', () => {
    const { getByText } = render(
      <PlanCarousel plans={mockPlans} onSelect={mockOnSelect} />
    );

    expect(getByText('‹')).toBeTruthy();
    expect(getByText('›')).toBeTruthy();
  });

  it('calls goToNext when next button is pressed', () => {
    const mockGoToNext = jest.fn();
    const { useCarousel } = require('../../../src/hooks/useCarousel');
    
    useCarousel.mockReturnValue({
      scrollRef: { current: null },
      index: 0,
      offsets: [0, 300],
      handleScroll: jest.fn(),
      handleScrollBeginDrag: jest.fn(),
      handleMomentumEnd: jest.fn(),
      canGoPrev: false,
      canGoNext: true,
      goToPrev: jest.fn(),
      goToNext: mockGoToNext,
    });

    const { getByText } = render(
      <PlanCarousel plans={mockPlans} onSelect={mockOnSelect} />
    );

    fireEvent.press(getByText('›'));
    expect(mockGoToNext).toHaveBeenCalledTimes(1);
  });

  it('calls goToPrev when prev button is pressed and enabled', () => {
    const mockGoToPrev = jest.fn();
    const { useCarousel } = require('../../../src/hooks/useCarousel');
    
    useCarousel.mockReturnValue({
      scrollRef: { current: null },
      index: 1,
      offsets: [0, 300],
      handleScroll: jest.fn(),
      handleScrollBeginDrag: jest.fn(),
      handleMomentumEnd: jest.fn(),
      canGoPrev: true,
      canGoNext: false,
      goToPrev: mockGoToPrev,
      goToNext: jest.fn(),
    });

    const { getByText } = render(
      <PlanCarousel plans={mockPlans} onSelect={mockOnSelect} />
    );

    fireEvent.press(getByText('‹'));
    expect(mockGoToPrev).toHaveBeenCalledTimes(1);
  });

  it('updates pager text based on current index', () => {
    const { useCarousel } = require('../../../src/hooks/useCarousel');
    
    useCarousel.mockReturnValue({
      scrollRef: { current: null },
      index: 1,
      offsets: [0, 300],
      handleScroll: jest.fn(),
      handleScrollBeginDrag: jest.fn(),
      handleMomentumEnd: jest.fn(),
      canGoPrev: true,
      canGoNext: false,
      goToPrev: jest.fn(),
      goToNext: jest.fn(),
    });

    const { getByText } = render(
      <PlanCarousel plans={mockPlans} onSelect={mockOnSelect} />
    );

    expect(getByText('2 / 2')).toBeTruthy();
  });
});