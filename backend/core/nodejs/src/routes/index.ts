import { Router } from 'express';
import metrics from './metrics.routes';

const api = Router();
api.use(metrics);

export default api;