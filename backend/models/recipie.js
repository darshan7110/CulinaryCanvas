const mongoose=require("mongoose");

const recipieSchema=mongoose.Schema({

    title:{
        type:String,
        require:true,
    },
    ingredients:{
        type:Array,
        require:true,
    },
    instructions:{
        type:String,
        require:true,
    },
    time:{
        type:String,
        require:true,
    },
    coverImg:{
        type:String,
        
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

},{timestamps:true})

module.exports=mongoose.model("Recipies",recipieSchema);