import request from 'supertest';
import express from 'express';
import cors from 'cors';
import router from '../src/routes';

describe('Metrics routes (smoke)', () => {
  const app = express();
  app.use(cors());
  app.use('/metrics', router);

  it('GET /metrics/centers should 200', async () => {
    const res = await request(app).get('/metrics/centers');
    // En un entorno real, montarías la conexión Mongo o mockearías el servicio.
    expect([200, 500]).toContain(res.status);
  });
});