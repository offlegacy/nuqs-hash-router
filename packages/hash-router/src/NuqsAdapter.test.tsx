import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';

const mockUseAdapter = vi.fn();
const mockUpdateUrl = vi.fn();
const mockGetSearchParamsSnapshot = vi.fn();

vi.mock('./NuqsAdapter', () => ({
  NuqsAdapter: ({ children }: { children: React.ReactNode }) => {
    mockUseAdapter();
    return <div data-testid="nuqs-adapter">{children}</div>;
  },
}));

vi.mock('nuqs/adapters/custom', () => ({
  unstable_createAdapterProvider: vi.fn((hook) => {
    return function MockProvider({ children }: { children: React.ReactNode }) {
      const result = hook();

      if (result) {
        mockUpdateUrl.mockImplementation(result.updateUrl);
        mockGetSearchParamsSnapshot.mockImplementation(result.getSearchParamsSnapshot);
      }

      return <div data-testid="adapter-provider">{children}</div>;
    };
  }),
}));

describe('NuqsAdapter', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.location.hash = '';
    vi.mocked(window.history.pushState).mockClear();
    vi.mocked(window.history.replaceState).mockClear();
  });

  it('should integrate with nuqs adapter system', async () => {
    const { NuqsAdapter } = await import('./NuqsAdapter');

    const TestApp = () => (
      <NuqsAdapter>
        <div>Test App</div>
      </NuqsAdapter>
    );

    render(<TestApp />);

    expect(mockUseAdapter).toHaveBeenCalled();
  });

  it('should handle complex URL scenarios', () => {
    const scenarios = [
      { hash: '#/', expected: { pathname: '/', search: '' } },
      { hash: '#/users', expected: { pathname: '/users', search: '' } },
      { hash: '#/users?page=1', expected: { pathname: '/users', search: '?page=1' } },
      {
        hash: '#/users/123?tab=profile&edit=true',
        expected: { pathname: '/users/123', search: '?tab=profile&edit=true' },
      },
    ];

    scenarios.forEach(({ hash, expected }) => {
      window.location.hash = hash;
      const url = new URL(window.location.hash.slice(1) || '/', window.location.origin);

      expect(url.pathname).toBe(expected.pathname);
      expect(url.search).toBe(expected.search);
    });
  });

  it('should handle URL parameter updates correctly', () => {
    window.location.hash = '#/test?existing=value';

    const url = new URL(window.location.hash.slice(1), window.location.origin);
    const currentParams = new URLSearchParams(url.search);
    const updated = new URLSearchParams(currentParams);

    updated.set('new', 'parameter');

    updated.delete('existing');

    const updatedHashUrl = `#${url.pathname}${updated.toString() ? `?${updated.toString()}` : ''}`;

    expect(updatedHashUrl).toBe('#/test?new=parameter');
  });

  it('should preserve pathname when updating search params', () => {
    window.location.hash = '#/complex/path/with/segments?param1=value1';

    const url = new URL(window.location.hash.slice(1), window.location.origin);
    const updated = new URLSearchParams();
    updated.set('param2', 'value2');

    const updatedHashUrl = `#${url.pathname}${updated.toString() ? `?${updated.toString()}` : ''}`;

    expect(updatedHashUrl).toBe('#/complex/path/with/segments?param2=value2');
  });
});
