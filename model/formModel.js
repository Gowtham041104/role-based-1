let mongoose = require("mongoose")


let formSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    skills:{
        type:[String],
        required:true
    },
    experience:{
        type:Number,
        required:true
    },
    education:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:"Pending"
    },
    resume:{
        type:String,
        required:true
    },
    authUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"register",
        default:null
    },
    strengths:{
        type:String,
        default:null,
     
    },
    weaknesses:{
        type:String,
        default:null,
   
    },
    rating:{
        type:String,
        default:null,
  
    },
    decision:{
        type:String,
        default:null,
     
    },

})


module.exports = new mongoose.model("form-data",formSchema)