const express = require('express');
const route = express.Router();
const configDetails = require('../config.json')
const db = require('monk')(configDetails.url + configDetails.db)
const dotenv = require("dotenv");
const jwtVerify = require('../helper/jwtVerify')
const { ErrorHandler } = require('../error')


//get config details
dotenv.config();

route.post('/addMeals',jwtVerify, async(req,res,next)=>{
    try{
        let dt = new Date(req.body.date.toString())
        let body = {
            food:req.body.food,
            calories:parseFloat(req.body.calories),
        }
        let email = req.decoded.email
        let collcn = await db.get('meals')
        let chkDt = await collcn.findOne({email:email, date:dt.toISOString()})
        if(chkDt == null){
            await collcn.insert({email:email,date:dt.toISOString(),dailyMeals:[body]})
        }else{
            await collcn.findOneAndUpdate({ email:email,date:dt.toISOString()},{$push:{dailyMeals:body}})
        }
        res.locals.msg = "Meal Added"
        let obj =  { ...res.locals}
        res.send(obj)
    }catch(e){
        throw new ErrorHandler(e)
    }
})

route.post('/editMeals',jwtVerify, async(req,res,next)=>{
    try{
        let body = {
            food:req.body.food,
            calories:parseFloat(req.body.calories),
            arrayIndex:req.body.index
        }
        let objId = req.body.id
        let collcn = await db.get('meals')
        await  collcn.update({_id:objId},
            {$set:{[`dailyMeals.${body.arrayIndex}.food`]:body.food, 
            [`dailyMeals.${body.arrayIndex}.calories`]:body.calories}})
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
        throw new ErrorHandler(e)
    }
})

route.get('/fetchMeals', jwtVerify, async(req,res,next)=>{
    try{
        let userId = req.decoded.email
        let collcn = await db.get('meals')
        let data = await collcn.find({"email":userId})
        for(const temp of data){
            let totalCalories = 0
            for(const list of temp.dailyMeals){
                 totalCalories += list.calories
            }
            temp.totalCalories = totalCalories
        }
        let obj =  { ...res.locals,data}
        res.send(obj)
    }catch(e){
        next(e)
    }
})



module.exports = route