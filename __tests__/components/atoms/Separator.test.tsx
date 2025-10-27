import { render } from '@testing-library/react-native';
import React from 'react';
import { Separator } from '../../../src/components/atoms/Separator';

describe('Separator Component', () => {

  it('can be found by testID when provided', () => {
    const { getByTestId } = render(<Separator testID="divider" />);
    expect(getByTestId('divider')).toBeTruthy();
  });

  it('renders multiple separators independently', () => {
    const { getAllByTestId } = render(
      <>
        <Separator testID="separator" />
        <Separator testID="separator" />
        <Separator testID="separator" />
      </>
    );
    expect(getAllByTestId('separator')).toHaveLength(3);
  });

  it('matches snapshot', () => {
    const { toJSON } = render(<Separator />);
    expect(toJSON()).toMatchSnapshot();
  });
});