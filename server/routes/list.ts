import { prisma } from "../prisma";
import express from "express";
import { verifyJWT } from "../middleware/verifyJWT";
import {v4} from "uuid"
import { task } from "../types/lists";

const router = express.Router();


// DELETE task
router.delete('/:taskId', verifyJWT, async (req: any, res) => {
    const {list}: any  = await prisma.lists.findFirst({
        where: {
            userId: req.user.id
        },
        select: {
            list: true
        }
    });
    
    if (!list)
    return res.status(404).json({msg:"Not found"});
    
    const objIndex = list.findIndex((obj: any) => obj.id === req.params.taskId) ;

    list.splice(objIndex, 1);

    await prisma.lists.update({
        where: {
            userId: req.user.id
        },
        data:{
            list
        }
    })

    res.json({msg: "Deleted successfully"});
});


// PUT update task
router.put('/:taskId', verifyJWT, async (req: any, res) => {
    let { title, description, isFinished } = req.body;

    if (!title) title = "";
    if (!description) description = "";
    if (!isFinished) isFinished = false;

    const task : task = {
        title,
        description,
        isFinished
    }
    try {
        
        const {list}: any  = await prisma.lists.findFirst({
            where: {
                userId: req.user.id
            },
            select: {
                list: true
            }
        });
        
        if (!list)
        return res.status(404).json({msg:"Not found"});
        
        const objIndex = list.findIndex((obj: any) => obj.id === req.params.taskId) ;

        list[objIndex] = task;
        
        await prisma.lists.update({
            where:{
                userId: req.user.id
            },
            data: {
                list,
            }
        });

        res.json({msg: "updated successfully"});
    } catch (err) {
        console.error(err);
        res.status(500).json({msg: "Server error"});
    }

});


// GET specific task
router.get('/:taskId', verifyJWT, async (req: any, res) => {
    try {

        const { list }: any = await prisma.lists.findFirst({
            where: {
                userId: req.user.id
            },
            select: {
                list: true
            }
        });
        
        if (!list)
        return res.status(404).json({msg:"Not found"});


        const objIndex = list.findIndex((obj: any) => obj.id == req.params.taskId) ;
        

        res.json(list[objIndex]);

    } catch (err) {
        console.error(err);
        res.status(500).json({msg: "Server error"});
    }
})

// GET full list
router.get('/', verifyJWT, async (req: any, res) => {
    try {
        
        const { list }: any = await prisma.lists.findFirst({
            where: {
                userId: req.user.id
            },
            select: {
                list: true
            }
        });

        res.json(list.reverse());

    } catch (err) {
        console.error(err);
        res.status(500).json({msg: "Server error"});
    }
})


// POST new task to list
router.post("/", verifyJWT, async (req: any, res) => {
    let { title, description, isFinished } = req.body;

    if (!title) title = "";
    if (!description) description = "";
    if (!isFinished) isFinished = false;

    const task : task = {
        id: v4(),
        title,
        description,
        isFinished
    }

    try {
        
       const {list}: any = await prisma.lists.findFirst({
        where: {
            userId: req.user.id
        },
        select: {
            list: true
        }
       })

       if(!list) return res.status(404).json({msg: "Not found"});

       await prisma.lists.update({
        where: {
            userId: req.user.id
        },
        data: {
            list: [...list, task]
        }
       })
       
       res.json({msg: "Added successfully"});
    } catch (err) {
        console.error(err);
        res.status(500).json({msg: "Server error"})
    }

})

export default router;