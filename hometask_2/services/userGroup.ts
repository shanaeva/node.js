import { Op } from 'sequelize';
import { TUserGroup } from '../types/userGroup';
import { UserGroup } from '../models/userGroup';

export const createUserGroup = async (userGroup: TUserGroup): Promise<TUserGroup> =>
    await UserGroup.create({ ...userGroup });
