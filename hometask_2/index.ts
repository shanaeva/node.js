import express from 'express';
import { Sequelize } from 'sequelize';
import { router } from './controller';

export const sequelize = new Sequelize('users', 'admin', 'admin', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

// export const app = express();

// const port = process.env.PORT || 3000;
// app.use(express.json());
// app.use('/', router);

// app.listen(port, () => console.log('started'));
