const express=require("express");




const {getRecipies,getRecipie,addRecipie,editRecipie,deleteRecipie,upload} = require("../controller/recipie");
const verifyToken = require("../middleware/auth");
const router=express.Router();

//get all the recipie
router.get("/",getRecipies);

//get recipie by Id
router.get("/:id",getRecipie);

//add recipie
router.post("/",upload.single('file'),verifyToken,addRecipie); 

//edit recipie
router.put("/:id",upload.single('file'), editRecipie);

//delete recipie
router.delete("/:id",deleteRecipie);

module.exports=router;