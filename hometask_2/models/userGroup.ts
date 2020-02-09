import { DataTypes } from 'sequelize';
import { sequelize } from '../data-access/sequelize';

export const UserGroup = sequelize.define('user_group', {
    id: DataTypes.STRING
});