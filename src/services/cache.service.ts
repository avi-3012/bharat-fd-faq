import { createClient } from 'redis';
import config from '../config';

const redisClient = createClient({ url: config.redis.url });

redisClient.on('error', (err) => console.error('Redis error:', err));

export default {
  initialize: async () => {
    await redisClient.connect();
  },

  get: async (key: string) => {
    return await redisClient.get(key);
  },

  set: async (key: string, value: string) => {
    await redisClient.setEx(key, config.redis.ttl, value);
  },

  invalidateLanguageCaches: async () => {
    const keys = await redisClient.keys('faqs:*');
    if (keys.length) await redisClient.del(keys);
  }
};