import jwt from "jsonwebtoken";

export const checkToken = (req:any, res:any, next:any) => {
    const token = req.headers['x-access-token'];
    if(token){
        jwt.verify(token, 'secret', (err:any)=> {
            if(err){
                res.json({success: false, message: 'Failed to authenticate token'})
            }
            else{
                next()
            }
        })
    }
    else{
        res.status(401).send({success: false, message: 'No token provided'})
    }
};