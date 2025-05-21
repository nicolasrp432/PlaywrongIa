import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// Set up MSW server with the defined handlers
export const server = setupServer(...handlers);

// Start the server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

// Reset handlers after each test
afterEach(() => server.resetHandlers());

// Close server after all tests
afterAll(() => server.close());
