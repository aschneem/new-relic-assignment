import App from "../src/App.jsx";
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

describe('App tests', () => {
  it('renders Header', () => {
    
    render(<App />);

    expect(screen.getAllByText('Customers').length).toBe(1);
    expect(screen.getAllByText('Customers')[0].tagName).toBe('H1');
  });
});
