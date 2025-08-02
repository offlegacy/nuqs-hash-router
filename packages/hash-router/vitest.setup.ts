import { expect, vi } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

Object.defineProperty(window, 'history', {
  value: {
    pushState: vi.fn(),
    replaceState: vi.fn(),
  },
  writable: true,
});

Object.defineProperty(window, 'location', {
  value: {
    hash: '',
    origin: 'http://localhost:3000',
  },
  writable: true,
});
