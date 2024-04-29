import request from 'supertest';
import app from '../../src/index';


describe('GET /trajectories', () => {
    it('should return 400 when skip or take are missing', async () => {
        const response = await request(app).get('/trajectories');
        expect(response.status).toBe(400);
    });

    it('should return 200 when skip and take parametes are provided', async () => {
        const response = await request(app).get('/trajectories').query({ skip: 0, take: 10 });
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length > 0).toBeTruthy();
    });

    it('should respond with and id inside the body response', async () => {
        const response = await request(app).get("/trajectories").query({ skip: 0, take: 1 });
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body[0]).toHaveProperty('id');
        expect(typeof response.body[0].id).toBe('number');
    });
    it('should respond with a date, latitude and longitude inside the body response', async () => {
        const response = await request(app).get("/trajectories").query({ skip: 0, take: 1 });
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body[0]).toHaveProperty('date');
        expect(response.body[0]).toHaveProperty('latitude');
        expect(response.body[0]).toHaveProperty('longitude');
        expect(typeof response.body[0].date).toBe('string');
        expect(typeof response.body[0].latitude).toBe('number');
        expect(typeof response.body[0].longitude).toBe('number');
    });
    it('should respond with 10 trajectories as result', async () => {
        const response = await request(app).get('/trajectories').query({ skip: 0, take: 10 });
        expect(response.body).toHaveLength(10)
    });
})

describe('GET /count', () => {
    it('should return 200 ', async () => {
        const response = await request(app).get(`/count`);
        expect(response.status).toBe(200);
    });
})
