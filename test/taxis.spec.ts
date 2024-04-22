
import request from 'supertest';
import app from '../src/index';

describe('GET /taxis', () => {

  it('should return 400 if skip or take parameters are missing', async () => {
    const response = await request(app).get('/taxis');
    console.log("🚀 ~ it ~ response:", response.status)
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: "The parameters 'skip' and 'take' are mandatory in the query" });
  });

  it('should return all taxis when skip and take parametes are provided', async () => {
    const response = await request(app).get('/taxis').query({ skip: 0, take: 10 });
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  })
});

