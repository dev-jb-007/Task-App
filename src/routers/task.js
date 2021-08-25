const express=require('express');
const app= express();
const router=express.Router();
const auth=require('../Middlewares/auth');
const Task = require('../models/task');
const cookieParser=require('cookie-parser');
router.use(cookieParser());
const jwt=require('jsonwebtoken');
//Ports
router.get('/tasks/:id',auth,async (req, res) => {
    try{
        const task=await Task.findOne({_id: req.params.id,owner:req.user._id});
        if(!task){
            return res.send("No tasks found").status(404);
        }
        res.send(task).status(201);
    }
    catch(e){
        res.send(e).status(500);
    }
})
//Get tasks?sortBy=completedAt_desc
router.get('/tasks',auth,async (req, res) => {
    try{
        let match={};
        let sort={};
        if(req.query.completed)
        {
            match.completed=req.query.completed==='true';
        }
        if(req.query.sortBy)
        {
            let parts=req.query.sortBy.split('_');
            sort[parts[0]]=(parts[1]==='desc'?-1:1);
        }
        await req.user.populate({
            path:'tasks',
            match,
            options:{
                limit:6,
                skip:parseInt(req.query.skip),
                sort
            }
        }).execPopulate();
        let task=req.user.tasks;
        // const task=await Task.find({owner:req.user._id});
        if(!task){
            return res.status('No tasks Found').status(404);
        }
        res.send({array:task}).status(201);
    }
    catch(e){
        res.send(e).status(500);
    }
})
router.patch('/tasks/:title',async (req, res)=>{
    const update=Object.keys(req.body);
    const allowedUpdates=['discription','completed','title'];
    const isUpdateValidate=update.every((update)=>allowedUpdates.includes(update));

    if(!isUpdateValidate)
    {
        return res.send({error:'Invalid Update field'}).status(400);
    }
    try{
        const task=await Task.findOne({title:req.params.title});
        
        // const task=await Task.findOneAndUpdate({discription:req.params.discription},req.body,{new:true,runValidators:true});
        if(!task){
            return res.send({error:'No such task found'}).status(400);
        }
        update.forEach(element=>task[element]=req.body[element]);
        await task.save();
        res.send(task).status(201);
    }
    catch(e){
        res.send(e).status(500);
    }
})



router.post('/tasks',auth,async (req, res) => {
    const task=new Task({
        ...req.body,
        owner:req.user._id
    });
    try{
        let t=await task.save();
        res.send(t).status(201);
    }
    catch(e){
        res.status(400).send(e);
    }
})


// Update tasks

router.patch('/tasks/:discription',async (req, res)=>{
    const update=Object.keys(req.body);
    const allowedUpdates=['discription','completed','title'];
    const isUpdateValidate=update.every((update)=>allowedUpdates.includes(update));

    if(!isUpdateValidate)
    {
        return res.send({error:'Invalid Update field'}).status(400);
    }
    try{
        const task=await Task.findOneAndUpdate({title:req.params.title},req.body,{new:true,runValidators:true});
        if(!task){
            return res.send({error:'No such task found'}).status(400);
        }
        res.send(task).status(201);
    }
    catch(e){
        res.send(e).status(500);
    }
})


//Delete Task

router.delete('/tasks/:title',async (req, res)=>{
    try {
        const task=await Task.findOneAndDelete({title:req.params.title});
        if(!task){
            return res.send({error:"No such task found"})
        }
        res.send(task).status(201);
    } catch (e) {
        res.send(e).status(500);
    }
});




module.exports=router;
// 60ccbab5aeea8e255f1d9f21