import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


export function verifyJWT(req: any, res: any, next: Function) {
    const token: string = req.header('x-auth-token');

    // check if no token
    if(!token) {
        return res.status(401).json({ msg: "no token, authentication denied" });
    }

    // verify token 
    try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
        req.user = decoded.user;

        next();
    } catch (err) {
        res.status(401).json({ msg: "Token is not valid" })
    }
}
