const User = require('../models/userModel');

//Users which have income lower than $5 USD and have a car of brand “BMW” or “Mercedes”.

const getUserQuery1 = async(req,res)=>{
    try{
        const users=await User.getData();
        res.status(200).json({error:false,message:"Success",data:users})
    }catch(e){
        res.status(400).json({error:true,message:e.message,data:[]})
    }
}
//Male Users which have phone price greater than 10,000.

const getUserQuery2 = async(req,res)=>{
    try{
        const users = await User.getUsers();
        res.status(200).json({error:false,message:"Success",data:users})
    }catch(e){
        res.status(400).json({error:true,message:e.message,data:[]})
    }
}

//Users whose last name starts with “M” and has a quote character length greater than 15 and email includes his/her last name.

const getUserQuery3 = async(req,res)=>{
    try{
        const users = await User.getUser();
        res.status(200).json({error:false,message:"Success",data:users})
    }catch(e){
        res.status(400).json({error:true,message:e.message,data:[]})
    }
}

//Users which have a car of brand “BMW”, “Mercedes” or “Audi” and whose email does not include any digit.

const getUserQuery4 = async(req,res)=>{
    try{
        const users  = await User.getDatas();
        res.status(200).json({error:false,message:"Success",data:users})
    }catch(e){
        res.status(400).json({error:true,message:e.message,data:[]})
    }
}

//Show the data of top 10 cities which have the highest number of users and their average income.
const getUserQuery5 = async(req,res)=>{
    try{
        const users = await User.getUserData();
        res.status(200).json({error:false,message:"Success",data:users})    
    }catch(e){
        res.status(400).json({error:true,message:e.message,data:[]})
    }
}

module.exports = {
    getUserQuery1,
    getUserQuery2,
    getUserQuery3,
    getUserQuery4,
    getUserQuery5
}