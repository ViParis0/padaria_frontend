import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

describe('renders main page items', () => {
  test('renders main page', () => {
    render(<App />, {wrapper: BrowserRouter});
    const linkElement = screen.getByRole('textbox')
    expect(linkElement).toBeInTheDocument();
  });
})
