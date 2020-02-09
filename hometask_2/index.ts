import express from 'express';
import { initSequelize } from './data-access/sequelize';
import {router} from './controllers'

initSequelize();
export const app = express();

const port = process.env.PORT || 3000;
app.use(express.json());
// export const router = express.Router();
app.use('/', router);

app.listen(port, () => console.log('started'));
