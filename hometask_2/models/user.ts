import { Model, DataTypes, BuildOptions } from 'sequelize';
import { sequelize } from './../sequelize';

export class User extends Model {
    public id!: string;
    public login!: string;
    public password!: string;
    public age!: number;
    isDelete?: boolean;
}

User.init({
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
        allowNull: false,
        defaultValue: false
    }
}, {
    tableName: 'users',
    sequelize: sequelize, 
});
