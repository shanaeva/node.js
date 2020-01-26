import { Op } from 'sequelize';
import { TUser, TAutoSuggest } from '../types/types';
import { User as UserModel } from '../models/user';

export const createUser = async (user: TUser): Promise<TUser> => await UserModel.create({ ...user });

export const getUsersList = async (): Promise<TUser[]> => await UserModel.findAll();

export const getUser = async (id: string): Promise<TUser> => await UserModel.findByPk(id);

export const deleteUser = async (id: string): Promise<number> => await UserModel.destroy({
    where: {
        id,
    }
});

export const updateUser = async (id: string, params: TUser): Promise<[number, TUser[]]> =>
    await UserModel.update({
        ...params
    }, {
        where: {
            id
        }
    });

export const getAutoSuggestUsers = async ({ login, limit }: TAutoSuggest): Promise<TUser[]> =>
    await UserModel.findAll({
        where: {
            login: {
                [Op.regexp]: login
            }
        },
        limit,
    });

