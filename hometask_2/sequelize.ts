import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('users', 'admin', 'admin', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
});
