import { TUserGroup, TUsersGroup } from '../types/userGroup';
import { UserGroup } from '../models/userGroup';
import { sequelize } from '../data-access/sequelize';

export const createUserGroup = async (userGroup: TUserGroup): Promise<TUserGroup> =>
    await UserGroup.create({ ...userGroup });

export const addUsersToGroup = async ({ groupId, userIds }): Promise<TUsersGroup> => {
    const t = await sequelize.transaction();
    try {
        const result = await userIds.forEach(userId => {
            UserGroup.create({ group_id: groupId, user_id: userId }, { transaction: t });
        })
        await t.commit();
        return result;
    }
    catch (error) {
        await t.rollback();
    }
}
