const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    discription:{
        type:String,
        required:true
    },
    completed:{
        type:Boolean,
        default:false
    },
    title:{
        type:String,
        required:true,
        validator(title){
            if(title.length>=15)
            {
                throw new Error('Title Length Exceeded');
            }
        }
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    }
},{
    timestamps:true
})

// taskSchema.pre('save',function(next){
//     const task=this;
//     console.log('Before saving task');
//     next();
// })

const tasks=mongoose.model('tasks',taskSchema);

module.exports=tasks;