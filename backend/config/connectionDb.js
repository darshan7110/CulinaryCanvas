const mongoose=require("mongoose");

const connectdb=async()=>
{
    await mongoose.connect(process.env.CONNECTION_STRING)
    .then(()=>console.log("Connected To DB...."))
}

module.exports=connectdb

