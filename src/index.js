const express = require('express');
const path = require('path');
const bcryptjs=require('bcryptjs');
require('./db/mongoose');
require('dotenv').config();
const app = express();
const port=process.env.PORT;
const hbs = require('hbs');

const bodyParser = require('body-parser');

app.use(express.json());
app.use(express.urlencoded({extended:true}));


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
app.get('/mainpage/editprofile',(req,res) => {
    res.render('editprofile');
})
app.get('/mainpage',(req,res) => {
    res.render('main');
})
//Listen Port
app.listen(process.env.PORT, () => {
    console.log("Your server is set to port " + port)
});
const User=require('./models/user');
const main=async () =>
{
    const user=await User.findById('60ccbab5aeea8e255f1d9f21');
    await user.populate('tasks').execPopulate();
    console.log(user.tasks);
}