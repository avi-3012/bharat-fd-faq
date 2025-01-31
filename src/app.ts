import express from 'express';
import cors from 'cors';
import config from './config';
import cacheService from './services/cache.service';
import faqRouter from './routes/faq.route';
// import { setupAdmin } from './admin/admin';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Admin panel
// app.use('/admin', setupAdmin());

// API routes
app.use('/api/faqs', faqRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

export default app;