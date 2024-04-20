
import request from 'supertest';
import app from '../index';

describe('GET /taxis', () => {
  it('should respond with JSON array of taxis', async () => {
    const response = await request(app).get('/taxis');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true); // Verifica que el cuerpo de la respuesta sea un array

    // Verifica que cada objeto en el array tenga las propiedades esperadas
    response.body.forEach((taxi: any) => {
      expect(taxi).toHaveProperty('id');
      expect(taxi).toHaveProperty('plate');
    });
  });
});

