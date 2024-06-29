import CompanyFilter from "../src/components/CompanyFilter.jsx";
import { fireEvent, getByLabelText, render, screen, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

global.fetch = vi.fn()

function createFetchResponse(data) {
    return { json: () => new Promise((resolve) => resolve(data)) }
  }

describe('Company Filter Component tests', async () => {
  it('renders select options', async () => {
    fetch.mockResolvedValue(createFetchResponse([{'key': 'company b', 'doc_count': 10}]))
    render(<CompanyFilter />);

    await waitFor(() => {
        expect(screen.queryByText('company b')).toBeDefined();
    })

    expect(screen.queryAllByText('All Companies').length).toBe(1);
    expect(screen.queryAllByText('company b (10)').length).toBe(1);
  });

  it('updates query on change', async () => {
    fetch.mockResolvedValue(createFetchResponse([{'key': 'company b', 'doc_count': 10}]))
    const args = []
    const change = arg => args.push(arg);
    const {getByLabelText} = render(<CompanyFilter onQueryChange = {change}/>);

    await waitFor(() => {
        expect(screen.queryByText('company b')).toBeDefined();
    })

    const filterSelect = getByLabelText('Company Filter:')
    act(() => {
        fireEvent.change(filterSelect, { target: { value: 'company b'}}); 
    })
    
    expect(args.length).toBe(1);
    expect(args[0]).toBe('filter_by_company_name=company+b');
  });

  it('updates query to empty when returned to default', async () => {
    fetch.mockResolvedValue(createFetchResponse([{'key': 'company b', 'doc_count': 10}]))
    const args = []
    const change = arg => args.push(arg);
    const {getByLabelText} = render(<CompanyFilter onQueryChange = {change}/>);

    await waitFor(() => {
        expect(screen.queryByText('company b')).toBeDefined();
    })

    const filterSelect = getByLabelText('Company Filter:')
    act(() => {
        fireEvent.change(filterSelect, { target: { value: 'company b'}}); 
    })
    act(() => {
        fireEvent.change(filterSelect, { target: { value: 'All Companies'}}); 
    })
    
    expect(args.length).toBe(2);
    expect(args[0]).toBe('filter_by_company_name=company+b');
    expect(args[1]).toBe('');
  });
});
