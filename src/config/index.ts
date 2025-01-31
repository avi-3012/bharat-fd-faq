export default {
    app: {
      port: parseInt(process.env.PORT || '3000'),
      baseLanguage: process.env.BASE_LANGUAGE || 'en',
      supportedLanguages: process.env.SUPPORTED_LANGUAGES?.split(',') || ['en', 'es', 'fr', 'hi']
    },
    redis: {
      url: process.env.REDIS_URL || 'redis://localhost:6379',
      ttl: parseInt(process.env.REDIS_TTL || '3600')
    },
    mongo: {
      uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/faq_db'
    },
    googleTranslate: {
      key: process.env.GOOGLE_TRANSLATE_API_KEY || ''
    },
    googleCloud: {
      projectId: process.env.GOOGLE_CLOUD_PROJECT_ID || 'faq-api-449515',
      key: process.env.GOOGLE_CLOUD_KEY || 'AIzaSyCwE3k7edqTRJPv97F0WaxMrG63s1boVB8',
      credentials: process.env.CREDENTIALS || './credentials.json'
    }
  };