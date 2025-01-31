import FAQ from '../models/faq.model';
import translationService from './translation.service';

export default {
  createFAQ: async (question: string, answer: string) => {
    const [questionTranslations, answerTranslations] = await Promise.all([
      translationService.translateContent(question),
      translationService.translateContent(answer)
    ]);

    return await FAQ.create({
      question: questionTranslations,
      answer: answerTranslations
    });
  },

  getAllFAQs: async (lang: string) => {
    const faqs = await FAQ.find();
    return faqs.map(faq => ({
      question: faq.question.get(lang) || faq.question.get('en'),
      answer: faq.answer.get(lang) || faq.answer.get('en')
    }));
  }
};