const { model } = require('mongoose');
const accessoryService= require('./../services/accessoryService');

const router = require('express').Router();

router.get('/create' , (req,res)=>{
    res.render('accessory/create')
});

router.post('/create' , async (req,res)=>{
    const {name,description,imageUrl} = req.body;

   await accessoryService.create({name,imageUrl,description});

   res.redirect("/");
});

module.exports=router;