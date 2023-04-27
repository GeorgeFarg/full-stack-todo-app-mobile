import express from "express";
import { prisma } from "../prisma";
import { userTemplate, userTemplateNoPassword } from "../types/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { verifyJWT } from "../middleware/verifyJWT";

const router = express.Router();

dotenv.config()


router.delete("/", verifyJWT, async (req: any, res) => {
    try {
        
        const l = await prisma.lists.delete({
            where: {
                userId: req.user.id,
            },
            select: {
                id: true,
                list: false,
                userId: false
            }
        });

        await prisma.users.delete({
            where: {
                id: req.user.id
            },
            select: {
                id: true,
                email: false,
                name: false,
                password: false
            }
        });
        
        res.json({msg: "Deleted successfully"});

    } catch (err) {
        console.error(err)
        res.status(500).json({msg : "Server error"});
    }
});

// PUT to update user
router.put('/', verifyJWT, async (req: any, res) => {
    const { name, email } = req.body;
    

    if( !name && !email ) 
    return res.status(400).json({msg: "You changed nothing"});

    let data: any = {};

    if( name ) 
        data.name = name;
        
        const regEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if( email ) {
        data.email = email;
        
        if(!regEx.test(email))
        return res.status(400).json({msg: "email is not valid"});
    }

    try {

        let checkuser: userTemplate[] | null = await prisma.users.findMany({
            where: 
                {email},
        })

        if (checkuser.length > 1) 
            {
                console.log("user is used");
                return res.status(400).json({msg: "this email is already used"});}
          
        let updateUser: userTemplateNoPassword = await prisma.users.update({
            where: {
                id: req.user.id
            },
            data: {
                name,
                email
            },
            select: {
                id: true,
                email: true,
                name: true,
                password: false,
            }
        });

        console.log(name, email);
        
        if(updateUser) console.log("updated");
        
        
        res.json(updateUser);

    } catch (err) {
        console.error(err);
        res.status(500).json({msg : "server error"});
    }
});


// retrieving user's data
router.get("/", verifyJWT,async (req: any, res) => {
    try {
        const user: userTemplateNoPassword | null = await prisma.users.findFirst({
            where:{
                id: req.user.id
            },
            select: {
                password: false,
                id: true,
                name: true,
                email: true
            }
        });

        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({msg: "Server error"});
    }
});


// Register the user and return the JWT
router.post('/',async (req,res) => {
    const { name, email, password } = req.body;

    if( !name || !email || !password ) 
    return res.status(400).json({msg: "You need to fill all the fields"});

    const regEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    
    if(!regEx.test(email))
    return res.status(400).json({msg: "email is not valid"});

    try {
        // check if user already exists
        let checkuser = await prisma.users.findFirst({
            where: {
                email
            }
        });

        if (checkuser)
        return res.status(400).json({msg: "this email is already used"})
        
        let user : userTemplate = {
            name,
            email,
            password
        }

        // hashing the password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        const { id } : userTemplateNoPassword = await prisma.users.create({
            data: user,
        })

        await prisma.lists.create({
            data: {
                user: {
                    connect: {
                        id
                    }
                }
            }
        });

        // returning the JWT
        const payload = {
            user: {
                id
            }
        }

        jwt.sign(payload, 
            process.env.JWT_SECRET!,
            {expiresIn: 36000},
            (err, token) => {
                if (err) 
                throw err;
                
                res.json({token});
            });
        
    } catch (e) {
        console.log(e);
        res.status(500).json({msg: "server error"});
    }
})


export default router;