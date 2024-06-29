import CustomerSearch from "../src/components/CustomerSearch.jsx";
import { fireEvent, getByLabelText, render, screen, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

describe('CustomerSearch Component tests', async () => {
  it('renders', async () => {
    render(<CustomerSearch />);

    expect(screen.queryAllByLabelText("Customer Search:").length).toBe(1);
  });

  it('updates query on change', async () => {
    const args = []
    const change = arg => args.push(arg);
    const {getByLabelText} = render(<CustomerSearch onQueryChange = {change}/>);

    const searchBox = getByLabelText('Customer Search:')
    act(() => {
        fireEvent.change(searchBox, { target: { value: 'a'}}); 
    })
    
    expect(args.length).toBe(1);
    expect(args[0]).toBe('search=a');
  });

  it('updates query to empty when returned to default', async () => {
    const args = []
    const change = arg => args.push(arg);
    const {getByLabelText} = render(<CustomerSearch onQueryChange = {change}/>);

    const searchBox = getByLabelText('Customer Search:')
    act(() => {
        fireEvent.change(searchBox, { target: { value: 'a'}}); 
    });
    act(() => {
        fireEvent.change(searchBox, { target: { value: ''}}); 
    })
    
    expect(args.length).toBe(2);
    expect(args[0]).toBe('search=a');
    expect(args[1]).toBe('');
  });
});
