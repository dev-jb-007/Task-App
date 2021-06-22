const express = require('express');
const path = require('path');
const bcryptjs=require('bcryptjs');
require('./db/mongoose');
//Setting up the application
const app = express();
const port=process.env.PORT;
const hbs = require('hbs');
const cookieParser = require('cookie-parser');
const multer=require('multer');//it is a famous npm library used for uploading diff types of files
// const upload=multer({
//     dest:'pdf',
//     limits:{
//         fileSize:1000000
//     },
//     fileFilter(req,file,callback){
//         if(!file.originalname.match(/\.(doc|docx)$/))
//         //.match allow us to use regular expressions as if we want multiple file uploads we not need to call endWith function multiple times
//         {
//             return callback(new Error('Please Upload a  PDF file'));
//         }
//         callback(undefined,true);
//     }
// })
//upload.single() is a middleware we need to provide.It should contain the same file name which is uploaded
// app.post('/upload',upload.single('upload'),async (req,res)=>{
//     res.send();
// },(error,req,res,next)=>{
//     res.send({error:error.message}).status(400)
// })
//Express Middlewares
// without middleware=> new request->run route handlers

// with middleware=> new request -> do something ->run route handlers

//We can use it by creating a user-defined function

//Here without calling next the function will not call the route handlers
// app.use((req,res,next)=>{
//     // console.log('This is task app');
//     //We can aslo send request that the website is under maintaince 
//     res.send('Website is currently under maintaince,try again later').status(503);
//     next();
// })
//this function will call the console.log every time when we call a request

//We will use this for authentication .... we will get an authkey and check if its exist or not for requests like get user or get task expect for log in and log out

app.use(cookieParser());
app.use(express.json());//express allow us to access our data as object by using these.It parse automatically the json data to object remember to add it before adding routers
const userRouter=require('./routers/user');
const taskRouter = require('./routers/task');


//Setting view engine
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../templates/views'));
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

//Setting up routers

app.use(userRouter);
app.use(taskRouter);

//Setting up port
// const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../static')))
console.log(path.join(__dirname, '../static'));

app.get('',(req,res) => {
    res.render('login');
})
app.get('/mainpage',(req,res) => {
    res.render('main');
})
//Listen Port
app.listen(port, () => {
    console.log("Your server is set to port " + port)
});

// const myfunction=async()=>{
//     const password="kushank1234";
//     const coded= await bcryptjs.hash(password,8);//it takes two argument that is the password and the no of round that will always be 8
//     console.log(password);
//     console.log(coded);
//     const valid=bcryptjs.compare("kushank123",coded);
//     return valid
// }
//Now this is a one way process that is we cant convert the hashed password again to the real password, to test the password for log in we should convert it to hash code and check ol the hash code we have

// myfunction().then((data)=>console.log(data));

// const jwt=require('jsonwebtoken');//it helps us to hide our data from public
// const myfunction = async () => {
//     const token=jwt.sign({_id:'abc123'},'iamlearningnodejs',{expiresIn:'7 days'});
//     console.log(token);
//     const data=jwt.verify(token,'iamlearningnodejs');
//     console.log(data);
// }
// myfunction();
const User=require('./models/user');
const main=async () =>
{
    const user=await User.findById('60ccbab5aeea8e255f1d9f21');
    await user.populate('tasks').execPopulate();
    console.log(user.tasks);
}