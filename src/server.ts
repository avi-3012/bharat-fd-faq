import mongoose from 'mongoose';
import cacheService from './services/cache.service';
import config from './config';
import app from './app';

const startServer = async () => {
  try {
    await mongoose.connect(config.mongo.uri);
    await cacheService.initialize();
    
    app.listen(config.app.port, () => {
      console.log(`Server running on port ${config.app.port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();