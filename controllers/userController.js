const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');




exports.signupWithEmail = async(req,res)=>{

    const {Name,Email,Password}=req.body;
 try{
   
    if(!Name || !Email || !Password ){
          return   res.status(400).json({message:"Please fill the required Credentials"} );
       }
       const userExists = await User.findOne({Email:Email});
    if (userExists){
        console.log('user already exists')
        return res.status(400).json({message:'This user already exists!'})
    }
    else{
         const hashed =await bcrypt.hash(Password,10);
         const user =new User({Name,Email,Password:hashed});
         await user.save();
         res.status(200).json({message:'User SignUp successfull!'});
         console.log('user registered')
    
    }
 }
 catch(error) {
    console.log(error.message);
    res.status(404).json({error});
 }  
} 

exports.login= async(req,res)=>{

    const {Email ,Password}= req.body;
    try{
        console.log('in login try')
     if(!Email || !Password){ return  res.status(400).json({message:'Please fill both Credendials!'}); }
      const loggin = await User.findOne({Email:Email})
      if (loggin && (await bcrypt.compare(Password,loggin.Password))){
         console.log('making token')
         const {_id,Email,Name}=loggin
         const token = jwt.sign({_id,Email,Name},process.env.secretkey)
         res.status(200).json({"token":token})
      }else{
        res.status(400).json({message:"Invalid Credentials"})
      }
    }catch(error){
    console.log(error.message)
    res.status(401).json({error});
}
}
