import { TUserGroup, TUsersGroup } from '../types/userGroup';
import { UserGroup } from '../models/userGroup';
import { sequelize } from '../data-access/sequelize';

export const createUserGroup = async (userGroup: TUserGroup): Promise<TUserGroup> =>
    await UserGroup.create({ ...userGroup });

export const addUsersToGroup = async ({ group_id, user_id }: TUsersGroup): Promise<TUserGroup[]> => {
    const t = await sequelize.transaction();
    console.log(group_id, user_id)
    try {
        const promises: Promise<TUserGroup>[] = user_id.map(id => 
            UserGroup.create({ group_id, user_id: id }, { transaction: t })
        )
        const result: TUserGroup[] = await Promise.all(promises);
        await t.commit();
        return result;
    }
    catch (error) {
        await t.rollback();
    }
}
