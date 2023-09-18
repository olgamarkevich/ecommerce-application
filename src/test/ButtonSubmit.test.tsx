import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from './renderWithProvider';
import ButtonSubmit from '../components/Buttons/ButtonSubmit/ButtonSubmit';

describe('ButtonSubmit should render correctly', () => {
  const handler = jest.fn();
  const text = 'ButtonText';

  test('It should render with given text', () => {
    renderWithProviders(<ButtonSubmit text={text} />);
    expect(screen.getByText(text)).toBeInTheDocument();
  });

  test('It should handle given function', async () => {
    renderWithProviders(<ButtonSubmit text={text} onClick={handler} />);
    const button = screen.getByRole('button');
    await userEvent.click(button);
    expect(handler.mock.calls).toHaveLength(1);
  });
});
