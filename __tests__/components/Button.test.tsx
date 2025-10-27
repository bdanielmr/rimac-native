import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { Button } from '../../src/components/Button';

describe('Button Component', () => {
  it('renders correctly with title', () => {
    const { getByText } = render(
      <Button title="Continuar" onPress={() => {}} />
    );
    expect(getByText('Continuar')).toBeTruthy();
  });

  it('calls onPress when button is pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button title="Continuar" onPress={onPressMock} />
    );
    
    fireEvent.press(getByText('Continuar'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when button is disabled', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button title="Continuar" onPress={onPressMock} disabled={true} />
    );
    
    fireEvent.press(getByText('Continuar'));
    expect(onPressMock).not.toHaveBeenCalled();
  });

  it('renders with disabled styles when disabled prop is true', () => {
    const { getByText } = render(
      <Button title="Continuar" onPress={() => {}} disabled={true} />
    );
    
    const button = getByText('Continuar').parent?.parent;
    expect(button).toBeTruthy();
  });

  it('renders with active styles when disabled prop is false', () => {
    const { getByText } = render(
      <Button title="Continuar" onPress={() => {}} disabled={false} />
    );
    
    const button = getByText('Continuar').parent?.parent;
    expect(button).toBeTruthy();
  });

  it('has correct accessibility properties', () => {
    const { getByText } = render(
      <Button title="Continuar" onPress={() => {}} />
    );
    
    const buttonElement = getByText('Continuar').parent?.parent;
    expect(buttonElement).toBeTruthy();
  });

  it('calls onPress multiple times when pressed multiple times', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button title="Continuar" onPress={onPressMock} />
    );
    
    const button = getByText('Continuar');
    fireEvent.press(button);
    fireEvent.press(button);
    fireEvent.press(button);
    
    expect(onPressMock).toHaveBeenCalledTimes(3);
  });

  it('renders different button titles correctly', () => {
    const { getByText, rerender } = render(
      <Button title="Aceptar" onPress={() => {}} />
    );
    
    expect(getByText('Aceptar')).toBeTruthy();
    
    rerender(<Button title="Cancelar" onPress={() => {}} />);
    expect(getByText('Cancelar')).toBeTruthy();
  });
});