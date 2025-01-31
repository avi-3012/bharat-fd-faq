import express from 'express';
import cors from 'cors';
import config from './config';
import cacheService from './services/cache.service';
import faqRouter from './routes/faq.route';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/faqs', faqRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

export default app;