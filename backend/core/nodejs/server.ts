import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { connectMongo } from './src/db/mongo';
import router from './src/routes';
import { errorHandler } from './src/middleware/errorHandler';

dotenv.config();

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;
const ORIGIN = process.env.CORS_ORIGIN || '*';

async function main() {
  await connectMongo();

  const app = express();
  app.disable('x-powered-by');
  app.use(cors({ origin: ORIGIN, methods: ['GET'], maxAge: 600 }));
  app.use(express.json());

  app.get('/health', (_req, res) => res.json({ ok: true }));
  app.use('/metrics', router);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Metrics API running on http://localhost:${PORT}`);
  });
}

main().catch((err) => {
  console.error('Fatal bootstrap error:', err);
  process.exit(1);
});