import express from 'express';
import { router } from './controllers/controller';
import { sequelize } from './sequelize';

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    })
sequelize.sync();

export const app = express();

const port = process.env.PORT || 3000;
app.use(express.json());
app.use('/', router);

app.listen(port, () => console.log('started'));
