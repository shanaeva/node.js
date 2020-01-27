import express from 'express';
import { router } from './controllers/user';
import { initSequelize } from './data-access/sequelize';

initSequelize();
export const app = express();

const port = process.env.PORT || 3000;
app.use(express.json());
app.use('/', router);

app.listen(port, () => console.log('started'));
