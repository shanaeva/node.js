import { Model, DataTypes, Sequelize } from 'sequelize';
import { sequelize } from '../data-access/sequelize';

export class UserGroup extends Model {
    public user_id!: number;
    public group_id!: number;
}

UserGroup.init({
    user_id: {
        type: DataTypes.INTEGER,
    },
    group_id: {
        type: DataTypes.INTEGER,
    },
}, {
    tableName: 'user_group',
    sequelize,
    timestamps: false,
});