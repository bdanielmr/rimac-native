import { render } from '@testing-library/react-native';
import React from 'react';
import { Text } from 'react-native';
import { Grid } from '../../src/components/Grid';

// Mock del hook useBreakpoint
const mockUseBreakpoint = jest.fn();
jest.mock('../../src/theme/responsive', () => ({
  useBreakpoint: () => mockUseBreakpoint(),
}));

describe('Grid Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders mobile layout with top and bottom content', () => {
    mockUseBreakpoint.mockReturnValue({ isMobile: true });

    const { getByText } = render(
      <Grid
        top={<Text>Top Content</Text>}
        bottom={<Text>Bottom Content</Text>}
      />
    );

    expect(getByText('Top Content')).toBeTruthy();
    expect(getByText('Bottom Content')).toBeTruthy();
  });

  it('renders desktop layout with left and right content', () => {
    mockUseBreakpoint.mockReturnValue({ isMobile: false });

    const { getByText } = render(
      <Grid
        left={<Text>Left Content</Text>}
        right={<Text>Right Content</Text>}
      />
    );

    expect(getByText('Left Content')).toBeTruthy();
    expect(getByText('Right Content')).toBeTruthy();
  });

  it('does not render left/right props in mobile layout', () => {
    mockUseBreakpoint.mockReturnValue({ isMobile: true });

    const { queryByText } = render(
      <Grid
        left={<Text>Left Content</Text>}
        right={<Text>Right Content</Text>}
        top={<Text>Top Content</Text>}
        bottom={<Text>Bottom Content</Text>}
      />
    );

    expect(queryByText('Left Content')).toBeNull();
    expect(queryByText('Right Content')).toBeNull();
    expect(queryByText('Top Content')).toBeTruthy();
    expect(queryByText('Bottom Content')).toBeTruthy();
  });

  it('does not render top/bottom props in desktop layout', () => {
    mockUseBreakpoint.mockReturnValue({ isMobile: false });

    const { queryByText } = render(
      <Grid
        left={<Text>Left Content</Text>}
        right={<Text>Right Content</Text>}
        top={<Text>Top Content</Text>}
        bottom={<Text>Bottom Content</Text>}
      />
    );

    expect(queryByText('Top Content')).toBeNull();
    expect(queryByText('Bottom Content')).toBeNull();
    expect(queryByText('Left Content')).toBeTruthy();
    expect(queryByText('Right Content')).toBeTruthy();
  });

});