const express = require('express');
const route = express.Router();
const configDetails = require('../config.json')
const db = require('monk')(configDetails.url + configDetails.db)
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const jwtVerify = require('../helper/jwtVerify')

//get config details
dotenv.config();

route.post('/addMeals',jwtVerify, async(req,res,next)=>{
    try{
        let body = {
            food:req.body.food,
            date:req.body.date,
            calories:parseFloat(req.body.calories),
            id: await db.get('meals')
        }
        body.email = req.decoded.email
        let collcn = await db.get('meals')
        await  collcn.insert(body)
        let obj =  { ...res.locals}
        res.send(obj)
    }catch(e){
        next(e)
    }
})

route.post('/editMeals',jwtVerify, async(req,res,next)=>{
    try{
        let body = {
            food:req.body.food,
            date:req.body.date,
            calories:parseFloat(req.body.calories),
        }
        let objId = req.body.id
        body.email = req.decoded.email
        let collcn = await db.get('meals')
        await  collcn.update({_id:objId},{$set:body})
        let obj =  { ...res.locals}
        res.send(obj)
    }catch(e){
        next(e)
    }
})

route.post('/delMeals',jwtVerify, async(req,res,next)=>{
    try{
        let id = req.body.id
        let collcn = await db.get('meals')
        await  collcn.findOneAndDelete({_id:id})
        let obj =  { ...res.locals}
        res.send(obj)
    }catch(e){
        next(e)
    }
})

route.post('/fetchMeals', jwtVerify, async(req,res,next)=>{
    try{
        let userId = req.decoded.email
        let collcn = await db.get('meals')
        let data = await collcn.find({"email":userId})
        let obj =  { ...res.locals,data}
        res.send(obj)
    }catch(e){
        next(e)
    }
})


module.exports = route