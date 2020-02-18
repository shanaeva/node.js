import { Op } from 'sequelize';
import { TUser, TAutoSuggestUsers } from '../types/user';
import { UserModel } from '../models/user';
import { UserGroup } from '../models/userGroup';

export const createUser = async (user: TUser): Promise<TUser> => await UserModel.create({ ...user });

export const getUsersList = async (): Promise<TUser[]> => await UserModel.findAll();

export const getUser = async (id: number): Promise<TUser> => await UserModel.findByPk(id);

export const deleteUser = async (id: number): Promise<[number, TUser[]]> => {
    await UserGroup.destroy({
        where: {
            user_id: id,
        }
    });

    return await UserModel.update({
        isDelete: true,
    }, {
        where: {
            id
        }
    })
};

export const updateUser = async (id: number, params: TUser): Promise<[number, TUser[]]> =>
    await UserModel.update({
        ...params
    }, {
        where: {
            id
        }
    });

export const getAutoSuggestUsers = async ({ login, limit }: TAutoSuggestUsers): Promise<TUser[]> =>
    await UserModel.findAll({
        where: {
            login: {
                [Op.iRegexp]: login
            }
        },
        limit,
    });

