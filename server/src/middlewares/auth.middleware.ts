import { Request,Response,NextFunction } from "express"
import jwt from "jsonwebtoken";

interface AuthRequest extends Request{
    userId?:string
}

export const verifyToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.auth_token;
        
        if (!token) {
            return res.status(401).json({ message: 'not logged in' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
        
        req.userId = decoded.userId
        
        next();        
    } catch (error) {
        console.error(error)
        res.status(401).json({ message: 'Invalid Token' });
    }    
}