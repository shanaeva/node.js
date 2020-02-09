import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../data-access/sequelize';

export class UserModel extends Model {
    public id!: number;
    public login!: string;
    public password!: string;
    public age!: number;
    isDelete?: boolean;
}

UserModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    login: {
        type: new DataTypes.STRING(20),
        allowNull: false,
    },
    password: {
        type: new DataTypes.STRING(30),
        allowNull: false,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    isDelete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    tableName: 'users',
    sequelize, 
    timestamps: false,
});
