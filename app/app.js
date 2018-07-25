import express from 'express';
import health from './routes/health';

function createApp () {
    return new Promise((res, rej) => {
        const app = express();
        const port = process.env.PORT;

        app.set('port', port);

        /**
         * Setup health check
         */
        app.use(['/health', 'health'], health.router());

        /**
         * Start the application
         */
        app.listen(port, () => {
            console.log(`Express started on port ${port}`);
            res(app);
        });
    })
}

export default {
    create: createApp
};