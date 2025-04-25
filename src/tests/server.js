import { setupServer } from 'msw/node';
import { rest } from 'msw';

export const createServer = (handleConfig) => {
  const handlers = handleConfig.map((config) => {
    return rest[config.method || 'get'](config.path, (req, res, ctx) => {
      return res(ctx.json(config.res(req, res, ctx)));
    });
  });

  const server = setupServer(...handlers);

  // Start MSW before all tests
  beforeAll(() => {
    server.listen();
  });

  // // Reset handlers after each test to avoid test bleed
  afterEach(() => server.resetHandlers());

  // // Clean up after the tests are finished
  afterAll(() => {
    server.close();
  });
};
