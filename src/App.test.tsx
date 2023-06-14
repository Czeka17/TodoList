import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App', () => {
  test('renders App component without errors', () => {
    render(<App />);

    expect(screen.getByTestId('todo-list')).toBeInTheDocument();
  });
});
