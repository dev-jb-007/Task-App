const mongoose=require('mongoose');
const validator=require('validator');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const Task = require('../models/task');
//For using the middlewares ,we need to define a schmea instead of the object we provide at the time of model creation.Instead the mongoose does this same thing behind the scene.

const userSchema=new mongoose.Schema({
    name:{

        type:String,
        required:true,
        trim:true
    },
    age:{
        type:String,
        validator(age){
            if(age<0)
            {
                throw new Error('Enter a positive age');
            }
        }
    },
    email:{
        type:String,
        unique:true,
        require:true,
        trim:true,
        lowercase:true,
        validate(email){
            if(!validator.isEmail(email))
            {
                throw new Error('Enter a valid email')
            }
        }
    },
    password:{
        trim:true,
        type:String,
        required:true,
        validate(password){
            if(password.length<=6||(password.toLowerCase().includes("password")))
            {
                throw new Error('Enter a valid password');
            }
        }
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],
    avtar:{
        type:Buffer
    }
},{
    timestamps:true//we added timestamp as the options or a second argument to the model and it will two new fields for the user that is created at and modified at
});

userSchema.virtual('tasks',{
    ref:'tasks',
    localField:'_id',
    foreignField:'owner'
})
//We have two methods that is pre and post, pre run before the operation and post run after the operation .It also takes two arguments that is the process name and an simple function(not arrow) as we will get a this for the current object which is going to be saved. It also takes a callback function next which we have to call to tell it that we have finished runninng the function or it will run infinitely
userSchema.pre('save', async function(next){
    const user=this;
    if(user.isModified('password')){
        user.password=await bcrypt.hash(user.password,8);
    }
    next();
})
userSchema.pre('remove', async function(next){
    const user=this;
    await Task.deleteMany({owner:user._id});
    next();
})

//To define user based functions for model or schema
userSchema.statics.findbyemailandpassword=async (email,password)=>{
    const user=await Users.findOne({email});//we have to define the model at the last
    if(!user)
    {
        throw new Error('Could not find');
    }
    
    const isValid=await bcrypt.compare(password,user.password);
    if(!isValid){
        throw new Error('Could not find');
    }
    return user;
}

//To define user based function for instance of a models
userSchema.methods.createAuthToken=async function(){
    const user=this;
    const token=jwt.sign({_id:user._id.toString()},process.env.JWT_SECRET);
    user.tokens=user.tokens.concat({token:token});//.concat combines two or more array
    await user.save();
    return token;
}
// toJSON is called whenever the object is converted to string and it is done in res or req 
userSchema.methods.toJSON=function(){
    const user=this;
    userObject=user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    delete userObject.avtar;
    return userObject;
}
const Users=mongoose.model('users',userSchema);
//Creating a model
module.exports=Users