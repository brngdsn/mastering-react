import { render, screen, waitFor } from '@testing-library/react';
import { HashRouter, HashRouter as Router } from 'react-router-dom';
import App from './App';

test('renders task manager app', async () => {
  render(<HashRouter>
    <App />
  </HashRouter>);
  const linkElement = await screen.findByText(/Loading.../i);
  expect(linkElement).toBeInTheDocument();
  await waitFor(async () => {
    const title = await screen.findByText(/My Task Manager/i);
    expect(title).toBeInTheDocument();
  });
});
