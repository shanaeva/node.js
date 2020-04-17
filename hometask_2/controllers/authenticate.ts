import jwt from 'jsonwebtoken';
import { getUserByLogin } from '../services/user';

export const authentication = async (req, res, next) => {
    try {
        const employee = await getUserByLogin(req.body.login);

        if (!employee || employee.password !== req.body.password) {
            res.status(403).send({ success: false, message: 'Bad login/password combination' });
        } else {
            const payload = { 'login': employee.login };
            const token = jwt.sign(payload, 'secret', { expiresIn: 30 });
            res.send(token);
        }
    } catch (err) {
        return next(err);
    }
};

