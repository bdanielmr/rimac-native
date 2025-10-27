import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { Checkbox } from '../../src/components/Checkbox';

describe('Checkbox Component', () => {
  it('renders with label text', () => {
    const { getByText } = render(
      <Checkbox value={false} onChange={() => {}} label="Accept terms" />
    );
    expect(getByText('Accept terms')).toBeTruthy();
  });

  it('calls onChange with opposite value when pressed', () => {
    const onChangeMock = jest.fn();
    const { getByText } = render(
      <Checkbox value={false} onChange={onChangeMock} label="Accept terms" />
    );

    fireEvent.press(getByText('Accept terms'));
    expect(onChangeMock).toHaveBeenCalledWith(true);
  });

  it('shows checkmark when checked', () => {
    const { getByText } = render(
      <Checkbox value={true} onChange={() => {}} label="Accept terms" />
    );
    expect(getByText('✓')).toBeTruthy();
  });

  it('does not show checkmark when unchecked', () => {
    const { queryByText } = render(
      <Checkbox value={false} onChange={() => {}} label="Accept terms" />
    );
    expect(queryByText('✓')).toBeNull();
  });

  it('toggles from checked to unchecked', () => {
    const onChangeMock = jest.fn();
    const { getByText } = render(
      <Checkbox value={true} onChange={onChangeMock} label="Accept terms" />
    );

    fireEvent.press(getByText('Accept terms'));
    expect(onChangeMock).toHaveBeenCalledWith(false);
  });
});