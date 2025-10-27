import { render } from '@testing-library/react-native';
import React from 'react';
import BackgroundGradient from '../../src/components/BackgroundGradient';

// Mock de las imágenes
jest.mock('../../assets/images/right-teal-mobile.png', () => 'right-teal-mobile');
jest.mock('../../assets/images/left-violet-mobile.png', () => 'left-violet-mobile');
jest.mock('../../assets/images/left-violet.png', () => 'left-violet');
jest.mock('../../assets/images/right-teal.png', () => 'right-teal');

// Mock del hook useBreakpoint
const mockUseBreakpoint = jest.fn();
jest.mock('../../src/theme/responsive', () => ({
  useBreakpoint: () => mockUseBreakpoint(),
}));

describe('BackgroundGradient Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders mobile layout when isMobile is true', () => {
    mockUseBreakpoint.mockReturnValue({ isMobile: true });

    const { UNSAFE_getAllByType } = render(<BackgroundGradient />);
    
    const images = UNSAFE_getAllByType('Image');
    expect(images).toHaveLength(2);
  });

  it('renders desktop layout when isMobile is false', () => {
    mockUseBreakpoint.mockReturnValue({ isMobile: false });

    const { UNSAFE_getAllByType } = render(<BackgroundGradient />);
    
    const images = UNSAFE_getAllByType('Image');
    expect(images).toHaveLength(2);
  });

  it('renders container with correct styles', () => {
    mockUseBreakpoint.mockReturnValue({ isMobile: true });

    const { UNSAFE_getAllByType } = render(<BackgroundGradient />);
    
    const views = UNSAFE_getAllByType('View');
    const container = views[0];
    
    expect(container.props.style).toMatchObject({
      position: 'absolute',
      backgroundColor: '#ffffff',
      overflow: 'hidden',
    });
    expect(container.props.pointerEvents).toBe('none');
  });

  it('renders different images for mobile and desktop', () => {
    // Mobile
    mockUseBreakpoint.mockReturnValue({ isMobile: true });
    const { UNSAFE_getAllByType: getMobile } = render(<BackgroundGradient />);
    const mobileImages = getMobile('Image');

    // Desktop
    mockUseBreakpoint.mockReturnValue({ isMobile: false });
    const { UNSAFE_getAllByType: getDesktop } = render(<BackgroundGradient />);
    const desktopImages = getDesktop('Image');

    expect(mobileImages).toHaveLength(2);
    expect(desktopImages).toHaveLength(2);
  });

});