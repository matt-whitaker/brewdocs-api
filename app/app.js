import cors from 'cors';
import express from 'express';
import { isNil, reject } from 'ramda';

import api from './routes/api';
import health from './routes/health';
import error from './utils/error';
import boom from 'boom';

const rejectNil = reject(isNil);

/**
 * Creates the express app and resolves with it
 */
function createApp () {
  return new Promise((resolve) => {
    const app = express();
    const port = process.env.PORT;

    app.set('port', port);

    /**
     * CORS
     */
    const corsOptions = rejectNil({ origin: process.env.ORIGIN });
    app.options('*', cors(corsOptions));
    app.use(cors(corsOptions));

    /**
     * Setup API router
     */
    app.use(`/api/v1`, api.router());

    /**
     * Setup health check
     */
    app.use('/health', health.router());

    /**
     * Catch the rest
     */
    app.use('*', (rs, rq, next) => next(boom.notFound()));

    /**
     * Error middleware
     */
    app.use(error.middleware());

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
