import { getGroups } from '../controllers/group';
import { getGroupsList, getAutoSuggestGroups } from '../services/group';

jest.mock('../services/group');

const mockGetGroupsList = getGroupsList as jest.Mock;

describe('/groups', () => {
    it('should return list groups', async () => {
        let result;
        const groupsList = [{ name: 1, permission: 1 }, { name: 2, permission: 2 }];
        mockGetGroupsList.mockResolvedValue(groupsList);
        const req = { query: {} };
        const res = {
            json: r => result = r
        };
        await getGroups(req, res, jest.fn());

        expect(result).toBe(groupsList);
    });
    it('should return sorted list groups', async () => {
        let result;
        const groupsList = [{ name: 1, permission: 1 }, { name: 12, permission: 2 }, { name: 3, permission: 3 }];
        mockGetGroupsList.mockResolvedValue(groupsList);
        const req = { query: {} };
        const res = {
            json: r => result = r
        };
        await getGroups(req, res, jest.fn());

        expect(result).toBe(groupsList);
    });
});
