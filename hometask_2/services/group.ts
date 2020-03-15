import { Op } from 'sequelize';
import { TGroup, TAutoSuggestGroups } from '../types/group';
import { GroupModel } from '../models/group';
import { UserGroup } from '../models/userGroup';
import { UserModel } from '../models/user';

export const createGroup = async (group: TGroup): Promise<TGroup> => await GroupModel.create({ ...group });

export const getGroupsList = async (): Promise<TGroup[]> => await GroupModel.findAll();

export const getGroup = async (id: number): Promise<TGroup> => await GroupModel.findByPk(id, {
    include: [{
        model: UserModel, as: 'users', through: { attributes: [] }
    }]
});

export const deleteGroup = async (id: number): Promise<number> => {
    await UserGroup.destroy({
        where: {
            group_id: id,
        }
    });

    return await GroupModel.destroy({
        where: {
            id,
        },
    })
};

export const updateGroup = async (id: number, params: TGroup): Promise<[number, TGroup[]]> =>
    await GroupModel.update({
        ...params
    }, {
        where: {
            id
        },
        returning: true,
    });

export const getAutoSuggestGroups = async ({ name, limit }: TAutoSuggestGroups): Promise<TGroup[]> =>
    await GroupModel.findAll({
        where: {
            name: {
                [Op.iLike]: `%${name}%`
            }
        },
        limit,
    });

