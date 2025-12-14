import { render, screen } from '@testing-library/react';
import App from './App';

test('renders sensor data dashboard title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Sensor Data Dashboard/i);
  expect(titleElement).toBeInTheDocument();
});

test('shows firebase not configured message when firebase is not set up', () => {
  render(<App />);
  const warningElement = screen.getByText(/Firebase Not Configured/i);
  expect(warningElement).toBeInTheDocument();
});
