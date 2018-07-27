import express from 'express';
import cors from 'cors';
import health from './routes/health';
import api from './routes/api';
import config from 'config';

const version = config.get('apiVersion');

function createApp () {
  return new Promise((resolve) => {
    const app = express();
    const port = process.env.PORT;

    app.set('port', port);

    /**
     * CORS
     */
    app.use(cors());

    /**
     * Setup API router
     */
    app.use(`/api/${version}`, api.router());

    /**
     * Setup health check
     */
    app.use('/health', health.router());

    /**
     * Start the application
     */
    app.listen(port, () => {
      console.log(`Express started on port ${port}`);
      resolve(app);
    });
  });
}

export default {
  create: createApp
};
