const express = require('express');
const app = express();
//Setting up routers
const router = express.Router();
const User = require('../models/user');
const auth = require('../Middlewares/auth');
const multer=require('multer');
const sharp=require('sharp');
const {sendwelcomeemail,sendgoodbyeemail}=require('../emails/account');
const upload=multer({
    //if we  need to pass the binary data of the image to  the function we dont need to provide dest option
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,callback){
        if(!file.originalname.match(/\.(jpg|png|jpeg)$/))
        {
            // return callback(null,false); if we use these we cant send a 404 error message
            return callback(new Error('Please Upload an Image'));
        }
        callback(undefined,true);
    }
})
//Ports

//Create user
router.post('/users',async (req, res) => {
    try {
        
        let user = new User(req.body);
        
        let token = await user.createAuthToken();
        sendwelcomeemail(user.email,user.name);//It is a async method but we dont need to wait for the user to proced without welcome email
        res.cookie('jwt',token,{
            expires:new Date(Date.now()+5000000),
            httpOnly:true
        });
        res.status(201).send({ user, token });
    }
    catch (e) {
        res.status(400).send(e);
    }
    //We cant return anything out of the function so we are using try and catch so when the await call will not be fulfilled the further code will not get executed and it will go directly to the catch for the error handling
});

//Uploading Images
router.post('/users/me/avtar',[auth,upload.single('profileimage')],async (req,res) => {
    let buffer= await sharp(req.file.buffer).resize({width:300,height:300}).png().toBuffer();
    req.user.avtar = buffer;
    await req.user.save();
    res.render('main');
},(error,req,res,next) => {
    res.status(400).send({error:error.message});
})

//Login User
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findbyemailandpassword(req.body.email, req.body.password);
        const token = await user.createAuthToken();
        res.cookie('jwt',token,{
            expires:new Date(Date.now()+5000000),
            httpOnly:true
        })
        //Here the User is called a model and user is called an instance .To create a function for the model we can use the .statics method but for creating a function for the instance we can use the    .method to  create a user-defined function for the user instance.
        res.send({
            user,
            token
        }).status(201);
    }
    catch (e) {
        res.send(e).status(500);
    }
})

//Getting data back
router.get('/users/:name/:email/:age', async (req, res) => {
    try {
        let users = await User.find(req.params);
        res.send({ array: users });
    }
    catch (e) {
        res.send(e).status(500);
    }
})
//Up above the :{paramsname} is the used to set different fields to get parameters for searching values.We can also provide multiple parameters to search by chaining it as shown above

//Show all users

//To set up middleware for these route we need to add it as a second argument
// router.get('/users',auth,async (req, res) => {
//     try {
//         let users = await User.find({});
//         res.send({ array: users }).status(201);
//     }
//     catch (e) {
//         res.send(e).status(500);
//     }
// })

router.get('/users/me', auth, async (req, res) => {
    try {
        
        res.send(req.user).status(201);
    }
    catch (e) {
        res.send(e).status(500);
    }
})

//Loggin out
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });
        await req.user.save();
        res.send().status(201);
    }
    catch (e) {
        res.send(e).status(500);
    }
})

//Patch request is for updating a user

router.patch('/users/me',auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'age', 'email', 'password'];
    const isUpdateValidate = updates.every((update) => allowedUpdates.includes(update));//every will run number of time equal to the number of element in update array and will return true if for every loop it gets an true or otherwise it will return false if any for any one loop there is false

    if (!isUpdateValidate) {
        return res.status(400).send({
            error: 'No Such Property avalaible'
        })
    }
    try {
        // const user=await User.findOneAndUpdate({name:req.params.name, age:req.params.age},req.body,{new:true,runValidators:true}); these will not run the mongoose schema we need to do it manually
        // const user = await User.findOne({ name: req.params.name, age: req.params.age });

        // if (!user) {
            //     return res.status(400).send({
                //         error: 'No such user found'
                //     })
                // }
                // await user.save();
                // res.send(user).status(200);
                updates.forEach((update) => req.user[update] = req.body[update]);
                await req.user.save();
                res.send(req.user);
        
    }
    catch (e) {
        res.send(e).status(500);
    }

});



//Delete Users

router.delete('/users/me',auth, async (req, res) => {
    try {
        // const user = await User.findOneAndDelete({ name: req.params.name, age: req.params.age });
        // // if (!user) {
        // //     return res.send({ error: 'No user found' }).status(404);
        // // }
        // res.send(user).status(201);
        await req.user.remove();
        sendgoodbyeemail(req.user.email,req.user.name);
        res.send(req.user);
    }
    catch (e) {
        res.send(e).status(500);
    }
})

//Deleting the profile picture of a user
router.delete('/users/me/avtar',auth, async (req, res) => {
    req.user.avtar=undefined;
    await req.user.save();
    res.send(req.user).status(200);
});

router.get('/users/me/avtar',auth, async (req, res) => {
    res.set('Content-Type', 'image/jpg');
    res.send(req.user.avtar);
})
//Exporting routers
module.exports = router;






