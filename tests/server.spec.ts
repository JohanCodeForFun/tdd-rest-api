import { startServer } from '../src/server';
import mongoose from 'mongoose';

jest.mock('mongoose', () => ({
  connect: jest.fn().mockResolvedValue(undefined),
}));

describe('startServer', () => {
  it('should throw an error when mongoUri is not defined', async () => {
    await expect(startServer(undefined, 3000)).rejects.toThrow('MONGO_URI is not defined');
  });

  it('should start the server successfully when mongoUri is defined', async () => {
    const mongoUri = 'mongodb://localhost:27017/test';
    const port = 3000;

    await startServer(mongoUri, port);

    expect(mongoose.connect).toHaveBeenCalledWith(mongoUri, expect.any(Object));
  });
});