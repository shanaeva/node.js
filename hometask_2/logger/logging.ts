import { isEmpty } from '../helper/isEmpty';

const log = require('debug')('method');
const logErr = require('debug')('error')

export const logTextError = (...text: any) => logErr(...text);

export const logMethod = (req: any, res: any, next: any) => {
    const params = isEmpty(req.query) || isEmpty(req.body) || {};
    log(req.method, req.path, 'arguments:', params);
    next();
};

export const errorHandler = (err: any, req: any, res: any, next: any) => {
    const params = isEmpty(req.query) || isEmpty(req.body);
    logErr(req.method, 'arguments:', params, 'message', err.message)
    res.status(500);
    res.json({message: 'Somthing went wrong'});
}