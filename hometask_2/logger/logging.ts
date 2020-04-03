import { isEmpty } from '../helper/isEmpty';
import debug from 'debug';

const log = debug('method');
const logErr = debug('error');

export const logTextError = (...text: any) => logErr.log(...text);

export const loggerMiddleware = (req: any, res: any, next: any) => {
    const params = isEmpty(req.query) || isEmpty(req.body) || {};
    log(req.method, req.path, 'arguments:', params);
    next();
};

export const errorHandler = (err: any, req: any, res: any, next: any) => {
    const params = isEmpty(req.query) || isEmpty(req.body);
    logErr(req.method, 'arguments:', params, 'message', err.message);
    res.status(500);
    res.json({message: 'Something went wrong'});
};