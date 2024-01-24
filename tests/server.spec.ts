import { startServer } from "../src/server";
const dummyLogger = { error: () => {} };

describe("startServer", () => {
  afterEach(() => {
    delete process.env.PORT;
  });

  it("should listen on default port", () => {
    const listen = jest.fn();
    const app = {
      listen,
    };

    startServer(app, dummyLogger);

    expect(listen).toHaveBeenCalledWith(3000);
  });

  it("should listen on port defined by PORT env", () => {
    process.env.PORT = "1234";
    const listen = jest.fn();
    const app = {
      listen,
    };

    startServer(app, dummyLogger);

    expect(listen).toHaveBeenCalledWith(1234);
  });

  it('should log error if thrown', () => {
    const error = new Error('test');
    const listen = jest.fn(() => {
      throw error;
    });
    const app = {
      listen,
    };
    const logger = {
      error: jest.fn(),
    };

    startServer(app, logger);

    expect(logger.error).toHaveBeenCalledWith('Error starting server:', error.message);
  });
});
