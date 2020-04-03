import express from 'express';
import { initSequelize } from './data-access/sequelize';
import { router } from './controllers';
import { loggerMiddleware, errorHandler, logTextError } from './logger/logging'

initSequelize();
export const app = express();

const port = process.env.PORT || 3000;

process.on('uncaughtException', (err) => {
    logTextError('There was an uncaught error', err);
    process.exit(1)
});

process.on('unhandledRejection', (reason, p) => {
    logTextError("Possibly Unhandled Rejection at:", p, " reason: ", reason);
});

app.use(express.json());
app.use(loggerMiddleware);
app.use('/', router);
app.use(errorHandler);

app.listen(port, () => console.log('started'));

