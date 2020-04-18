import { getUserByLogin } from '../services/user';
import { authentication } from '../controllers/authenticate';

jest.mock('../services/user');
jest.mock('jsonwebtoken', () => ({
    sign: () => 'token'
}));

const mockGetUser = getUserByLogin as jest.Mock;

const params = { success: false, message: 'Bad login/password combination' };

describe('/post/authenticate', () => {
    it('should authorize and return token', async () => {
        let result;
        const user = { login: '1', password: '1' };
        mockGetUser.mockResolvedValue(user);
        const req = { body: user };
        const res = {
            send: r => result = r
        };
        await authentication(req, res, jest.fn());

        expect(result).toBe('token');
    });
    it('should return message Bad login/password combination, login does not exist', async () => {
        let result;
        const user = { login: '1', password: '1' };
        mockGetUser.mockResolvedValue(null);
        const req = { body: user };
        const res = {
            status() {
                return this;
            },
            send: r => result = r
        };
        await authentication(req, res, jest.fn());

        expect(result).toEqual(params);
    });
    it('should return message Bad login/password combination, incorrect password', async () => {
        let result;
        const user = { login: '1', password: '1' };
        const user2 = { login: '1', password: '2' };
        mockGetUser.mockResolvedValue(user2);
        const req = { body: user };
        const res = {
            status() {
                return this;
            },
            send: r => result = r
        };
        await authentication(req, res, jest.fn());

        expect(result).toEqual(params);
    });
});
