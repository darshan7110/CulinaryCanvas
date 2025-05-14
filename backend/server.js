const express=require("express");
const app=express();
const dotenv = require("dotenv").config();
const cors = require("cors")
const connectdb=require("./config/connectionDb")

const PORT = process.env.PORT || 3000;

connectdb()

app.use(express.json())
app.use(cors())
app.use(express.static("public"))
app.use("/recipie",require("./routes/recipie"))
app.use("/",require("./routes/user"))
app.listen(PORT,(err)=>{
    console.log(`App Working on PORT = ${PORT}`);
})