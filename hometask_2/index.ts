import express from 'express';
import { router } from './controller';
export const app = express();

const port = process.env.PORT || 3000;
app.use(express.json());
app.use('/', router);

app.listen(port, () => console.log('started'));
