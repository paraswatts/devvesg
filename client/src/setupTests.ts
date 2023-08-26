/* istanbul ignore file */

// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

import { server } from 'src/mocks/server';

jest.mock('src/routes/clients/providers/ClientProvider.tsx');
jest.mock('src/routes/partners/PartnerProvider.tsx');

// Establish API mocking before all tests.
beforeAll(() => {
  server.listen();
  // @ts-ignore
  global.IntersectionObserver = class IntersectionObserver {
    constructor() {}

    disconnect() {
      return null;
    }

    observe() {
      return null;
    }

    takeRecords() {
      return null;
    }

    unobserve() {
      return null;
    }
  };
});

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
  server.resetHandlers();
});

// Clean up after the tests are finished.
afterAll(() => server.close());
