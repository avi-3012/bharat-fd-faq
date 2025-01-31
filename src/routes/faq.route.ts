import express from 'express';
import cacheService from '../services/cache.service';
import faqService from '../services/faq.service';
import config from '../config';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const lang = req.query.lang?.toString() || config.app.baseLanguage;
    const cacheKey = `faqs:${lang}`;

    const cachedData = await cacheService.get(cacheKey);
    if (cachedData) return res.json(JSON.parse(cachedData));

    const faqs = await faqService.getAllFAQs(lang);
    await cacheService.set(cacheKey, JSON.stringify(faqs));
    
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { question, answer } = req.body;
    if (!question || !answer) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newFAQ = await faqService.createFAQ(question, answer);
    await cacheService.invalidateLanguageCaches();

    res.status(201).json({
      id: newFAQ._id,
      question: newFAQ.question,
      answer: newFAQ.answer
    });
  } catch (error) {
    console.error('Failed to create FAQ:', error);
    res.status(500).json({ error: 'Failed to create FAQ' });
  }
});

export default router;