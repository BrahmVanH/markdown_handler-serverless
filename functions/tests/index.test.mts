import request from 'supertest';
import { handler } from '../netlify/functions/actions/index';

describe('API Tests', () => {
  it('should return 200 OK when accessing /', async () => {
    const response = await request(handler).get('/');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Hello, World!' });
  });

  it('should return 404 Not Found when accessing unknown route', async () => {
    const response = await request(handler).get('/unknown');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Route not found' });
  });

  // Add more tests for other routes and functionality
});
