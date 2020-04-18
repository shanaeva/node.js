import { Op } from 'sequelize';
import { TUser, TAutoSuggestUsers } from '../types/user';
import { UserModel } from '../models/user';
import { UserGroup } from '../models/userGroup';

export const getUserByLogin = async (login: string): Promise<TUser> => await UserModel.findOne({
    where: {
        login
    }
});

export const createUser = async (user: TUser): Promise<TUser> => {
    const userByLogin = await getUserByLogin(user.login);

    if (Object.keys(userByLogin).length === 0) {
        return await UserModel.create({ ...user });
    }
};


export const getUsersList = async (): Promise<TUser[]> => await UserModel.findAll();

export const getUser = async (id: number): Promise<TUser> => await UserModel.findByPk(id);

export const deleteUser = async (id: number): Promise<[number, TUser[]]> => {
    await UserGroup.destroy({
        where: {
            user_id: id
        }
    });

    return await UserModel.update({
        isDelete: true
    }, {
        where: {
            id
        }
    });
};

export const updateUser = async (id: number, params: TUser): Promise<[number, TUser[]]> =>
    await UserModel.update({
        ...params
    }, {
        where: {
            id
        },
        returning: true
    });

export const getAutoSuggestUsers = async ({ login, limit }: TAutoSuggestUsers): Promise<TUser[]> =>
    await UserModel.findAll({
        where: {
            login: {
                [Op.iLike]: `%${login}%`
            }
        },
        limit
    });
