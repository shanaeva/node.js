import { getAutoSuggestUsers, getUsersList, createUser, getUser, deleteUser, updateUser } from '../services/user';
import { getUsers, postCreateUser, getOneUser, deleteOneUser, putUser } from '../controllers/user';

jest.mock('../services/user');

const mockGetAutoSuggestUsers = getAutoSuggestUsers as jest.Mock;
const mockGetUsersList = getUsersList as jest.Mock;
const mockCreateUser = createUser as jest.Mock;
const mockGetUser = getUser as jest.Mock;
const mockDeleteOneUser = deleteUser as jest.Mock;
const mockUpdateUser = updateUser as jest.Mock;

describe('/users', () => {
    it('should return list users', async () => {
        let result;
        const usersList = [{ login: 1, password: 1 }, { login:2, password:2 }];
        mockGetUsersList.mockResolvedValue(usersList);
        const req = { query: {} };
        const res = {
            json: r => result = r
        };
        await getUsers(req, res, jest.fn());

        expect(result).toBe(usersList);
    });
    it('should return sorted users list', async () => {
        let result;
        const sortedUsersList = [{ login: 1, password: 1 }, { login:12, password:2 }, { login:2, password:2 }];
        mockGetAutoSuggestUsers.mockResolvedValue(sortedUsersList);
        const req = { query: { login:1 } };
        const res = {
            json: r => result = r
        };
        await  getUsers(req, res, jest.fn());

        expect(result).toBe(sortedUsersList);
    });

    it('should return user', async  () => {
        let result;
        const user = { login:1, password: 1 };
        mockCreateUser.mockResolvedValue(user);
        const req = { body: user };
        const res = {
            json: r => result = r
        };
        await postCreateUser(req, res, jest.fn());

        expect(result).toBe(user);
    });
    it('should return message User with this login already exist', async () => {
        let result;
        const user = { login:1, password: 1 };
        mockCreateUser.mockResolvedValue(null);
        const req = { body: user };
        const res = {
            status() {
                return this;
            },
            json: r => result = r
        };
        await postCreateUser(req, res, jest.fn());

        expect(result).toEqual({ message: `User with login ${req.body.login} already exists` });
    });

    describe('/:id', () => {
        it('should return one user', async () => {
            let result;
            const user = { login:1, password: 1 };
            mockGetUser.mockResolvedValue(user);
            const req = { params: { id: 1 } };
            const res = {
                status() {
                    return this;
                },
                json: r => result = r
            };
            await getOneUser(req, res, jest.fn());

            expect(result).toBe(user);
        });
        it('should return message User with this id not found', async () => {
            let result;
            mockGetUser.mockResolvedValue(null);
            const req = { params: { id: 1 } };
            const res = {
                status() {
                    return this;
                },
                json: r => result = r
            };
            await getOneUser(req, res, jest.fn());

            expect(result).toEqual({ message: `User with id ${req.params.id} not found` });
        });

        it('should return deleted user', async () => {
            let result;
            const user = { login:1, password: 1 };
            mockDeleteOneUser.mockResolvedValue([1, [user]]);
            const req = { params: { id: 1 } };
            const res = {
                status() {
                    return this;
                },
                json: r => result = r
            };
            await deleteOneUser(req, res, jest.fn());

            expect(result).toEqual([1, [user]]);
        });
        it('should return message User with this id not found', async () => {
            let result;
            mockDeleteOneUser.mockResolvedValue([]);
            const req = { params: { id: 1 } };
            const res = {
                status() {
                    return this;
                },
                json: r => result = r
            };
            await deleteOneUser(req, res, jest.fn());

            expect(result).toEqual({ message: `User with id ${req.params.id} not found` });
        });

        it('should return updated User', async () => {
            let result;
            const user = { login:1, password: 1 };
            mockUpdateUser.mockResolvedValue([1, [user]]);
            const req = { params: { id: 1 } };
            const res = {
                status() {
                    return this;
                },
                json: r => result = r
            };
            await putUser(req, res, jest.fn());

            expect(result).toEqual([1, [user]]);
        });
        it('should return message User with this id not found', async () => {
            let result;
            mockUpdateUser.mockResolvedValue([]);
            const req = { params: { id: 1 } };
            const res = {
                status() {
                    return this;
                },
                json: r => result = r
            };
            await putUser(req, res, jest.fn());

            expect(result).toEqual({ message: `User with id ${req.params.id} not found` });
        });
    });
});
