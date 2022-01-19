import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

interface UserPayload{
    id: string;
    email: string;
}

declare global{
    namespace Express{
        interface Request{
            currentUser: UserPayload;
        }
    }
}

export const currentUser = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if(!req.session?.jwt){
        return next();
    }

    const key = process.env.JWT_KEY || 'testkey';

    try{
        const verifiedpayload = jwt.verify(req.session.jwt, key) as UserPayload;
        req.currentUser = verifiedpayload;
    }
    catch(err){
        // token is not valid
    }

    next();
}