import { data } from './data';
import uuid from 'uuid/v4';
import { TUser, TAutoSuggest } from './types';

export const createUser = (user: TUser): TUser => {
    const newUser: TUser = { ...user, id: uuid(), isDelete: false };
    data.push(newUser);
    return newUser;
};

export const getUsersList = (): TUser[] => data;

export const getUser = (id: string): TUser => data.find(user => user.id === id);

export const deleteUser = (id: string): TUser | boolean => {
    const user = getUser(id);
    if (user) {
        user.isDelete = true;
        return user;
    }
    return false;
};

export const updateUser = (id: string, params: TUser): TUser => {
    let newUser: TUser;
    data.find((user, index) => {
        if (user.id === id) {
            newUser = { id, ...params };
            data[index] = newUser;
        }
    });
    return newUser;
};


export const getAutoSuggestUsers = ({ login, limit }: TAutoSuggest): TUser[] => {
    const newUsersList: TUser[] = [];
    data.forEach(user => {
        if (user.login.includes(login)) {
            if (!limit || newUsersList.length < limit) {
                newUsersList.push(user);
            }
        }
    });

    return newUsersList;
};
