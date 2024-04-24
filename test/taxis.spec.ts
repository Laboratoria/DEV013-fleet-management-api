
import request from 'supertest';
import app from '../src/index';

describe('GET /taxis', () => {

  it('should return 400 when skip or take are missing', async () => {
    const response = await request(app).get('/taxis');
    console.log("🚀 ~ it ~ response:", response.status)
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: "The 'skip' and 'take' parameters are mandatory in the query." });
  });

  it('should return 200 when skip and take parametes are provided', async () => {
    const response = await request(app).get('/taxis').query({ skip: 0, take: 10 });
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBe(10);
  })
});

describe('GET /LocationHistory', () =>{
  it('should return 400 when skip or take parameters are missing',async () =>{
    const response = await request(app).get('/location');
    expect(response.status).toBe(400);
    expect(response.body).toEqual({message:"The 'skip' and 'take' parameters are mandatory in the query."})
  });

  it('should return 200 when skip and take parameters are provided', async() =>{
    const response = await request(app).get('/location').query({ skip: 1, take: 2 });
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    response.body.forEach((history:any) => {
      expect(history).toHaveProperty('id');
      expect(history).toHaveProperty('plate');
      expect(Array.isArray(history.Trajectories)).toBeTruthy();
      history.Trajectories.forEach((trajectory:any) => {
        expect(trajectory).toHaveProperty('latitude');
        expect(trajectory).toHaveProperty('longitude');
        expect(trajectory).toHaveProperty('date');

        expect(typeof trajectory.latitude).toBe('number');
        expect(typeof trajectory.longitude).toBe('number');
        expect(typeof trajectory.date).toBe('string');
      });
    })
    
  })

})

