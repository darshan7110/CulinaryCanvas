const { response } = require("express");
const recipie = require("../models/recipie");
const Recipies = require("../models/recipie");
const multer=require("multer")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + '-' + file.filename
    cb(null, filename)
  }
})

const upload = multer({ storage: storage })

//fetch recipie all
const getRecipies = async (req, res) => {
  const recipies = await Recipies.find();
  return res.json(recipies);
};

const getRecipie = async (req, res) => {
  const recipie = await Recipies.findById(req.params.id);
  res.json(recipie);
};

const addRecipie = async (req, res) => {
  const { title, ingredients, instructions, time } = req.body;
  if (!title || !ingredients || !instructions || !time) {
    res.json({message: "Required Fields Can't Be Empty"});
  }
  

  const newRecipie = await Recipies.create({
    title,
    ingredients,
    instructions,
    time,
    coverImg:req.file.filename,
    createdBy:req.user.id
  });
  return res.json(newRecipie);
};

const editRecipie = async (req, res) => {
  const { title, ingredients, instructions, time } = req.body;
  let recipie = await Recipies.findById(req.params.id);
  try {
    if (recipie) {
      let coverImg=req.file?.filename?req.file.filename:recipie.coverImg
      await Recipies.findByIdAndUpdate(req.params.id, {...req.body,coverImg}, { new: true });
      res.json({ title, ingredients, instructions, time });
    }
  } catch (error) {
    return res.status(404).json({
        message:" Id Not Found " +error,
        
    })
    
  }
};

const deleteRecipie = async(req, res) => {
  try {
    await Recipies.deleteOne({_id:req.params.id})
    res.json({status:"Ok"})
  } catch (error) {
    return res.status(400).json({message:"Error"})
  }
};

module.exports = {
  getRecipies,
  getRecipie,
  addRecipie,
  editRecipie,
  deleteRecipie,
  upload
};
