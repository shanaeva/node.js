import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../data-access/sequelize';
import { UserModel } from './user';
import { GroupModel } from './group';

export class UserGroup extends Model {
    public user_id!: number;
    public group_id!: number;
}

UserGroup.init({
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    group_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'groups',
            key: 'id'
        }
    },
}, {
    tableName: 'user_group',
    sequelize,
    timestamps: false,
});

UserModel.belongsToMany(GroupModel, { through: 'UserGroup', foreignKey: 'user_id' });
GroupModel.belongsToMany(UserModel, { through: 'UserGroup', foreignKey: 'group_id' });