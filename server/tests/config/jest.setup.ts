import { app, server } from '../../';

export const mockSendEmail = jest.fn();
jest.mock('../../config/ses', () => ({
  sendEmail: (...args) => mockSendEmail(...args),
}));

afterAll((done) => {
  server.then((s) => {
    s.close();
    done();
  });
});

beforeAll((done) => {
  app.on('app-start', () => {
    done();
  });
});
