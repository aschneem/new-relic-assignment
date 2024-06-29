import Customer from "../src/components/Customer.jsx";
import { fireEvent, getByLabelText, render, screen, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

describe('CustomerSearch Component tests', async () => {
  it('all data field are rendered', async () => {
    render(<Customer data={{'_source':{"name": "abc def", "company": "xyz llc", "first_name": "abc", "last_name": "def"}}} />);

    expect(screen.queryAllByText("abc def").length).toBe(1);
    expect(screen.queryAllByText("abc").length).toBe(1);
    expect(screen.queryAllByText("def").length).toBe(1);
    expect(screen.queryAllByText("xyz llc").length).toBe(1);
    
  });
});
