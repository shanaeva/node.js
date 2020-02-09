import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../data-access/sequelize';
import { Permission } from '../types/group';
import { UserModel } from './user';
import { UserGroup } from './userGroup';

export class GroupModel extends Model {
    public id!: number;
    public name!: string;
    public permission!: Permission[];
}

GroupModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: new DataTypes.STRING(20),
        allowNull: false,
    },
    permission: {
        type: new DataTypes.ARRAY(DataTypes.STRING),
    },
}, {
    tableName: 'groups',
    sequelize,
    timestamps: false,
});

GroupModel.belongsToMany(UserModel, { through: UserGroup });