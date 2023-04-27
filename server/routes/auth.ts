import express from "express";
import { prisma } from "../prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { verifyJWT } from "../middleware/verifyJWT";

dotenv.config();
const router = express.Router();

// authenticate the user
router.post('/', async (req, res) => {
    const {name, password} = req.body;


    if (!name) {
        return res.status(400).json({ msg: "Name field is needed"});
    }

    if (!password) {
        return res.status(400).json({ msg: "Password field is needed"});
    }


    try {
        const user = await prisma.users.findFirst({
            where: {
                name,
            }
        });

        if(!user) return res.status(400).json({ msg: "Invalid credentials"});

        // validating the password
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) return res.status(400).json({ msg: "Invalid credentials"});


        // return the JWT
        const payload = {
            user: {
                id: user.id,
            }
        }

        jwt.sign(payload, 
            process.env.JWT_SECRET!,
            {expiresIn: 36000},
            (err, token) => {
                if (err) 
                throw err;
                
                res.json({token});
            }
            
            );

    } catch (err) {
        console.error(err);
        res.status(500).json({msg: "server error"});
    }

});

export default router;