import express from 'express';
import jwt from 'jsonwebtoken';
import { getUserByLogin} from "../services/user";

export const router = express.Router();

router.route('/authenticate')
    .post(async (req, res, next) => {
        try {
            const employee = await getUserByLogin((req.body.login)).then(res => res);

            if(employee === undefined || employee.password !== req.body.password){
                res.status(403).send({success: false, message: 'Bad login/password combinator'})
            }
            else{
                const payload = {'login': employee.login};
                const token = jwt.sign(payload, 'secret', {expiresIn: 30});
                res.send(token);
            }
        }
        catch(err) {
            return next(err)
        }
});
