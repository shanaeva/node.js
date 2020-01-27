import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('users', 'admin', 'admin', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
});

export const initSequelize = () => sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    })
