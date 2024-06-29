import ResultGrid from "../src/components/ResultGrid.jsx";
import { fireEvent, getByLabelText, render, screen, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

global.fetch = vi.fn()

function createFetchResponse(data) {
    return { json: () => new Promise((resolve) => resolve(data)) }
  }

describe('Company Filter Component tests', async () => {
  it('renders query results', async () => {
    fetch.mockResolvedValue(createFetchResponse([{"_id": 1, '_source':{"name": "abc def", "company": "xyz llc", "first_name": "abc", "last_name": "def"}}]))
    render(<ResultGrid />);

    await waitFor(() => {
        expect(screen.queryByText('abc def')).toBeDefined();
    })

    expect(screen.queryAllByText('abc def').length).toBe(1);
    expect(screen.queryAllByText('xyz llc').length).toBe(1);
  });
});
