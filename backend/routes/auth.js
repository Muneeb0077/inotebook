const express=require('express');
const router = express.Router();
const User=require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const JWT_SECRET='Muneebisagoodb$boy';

// create a User using: POST "/api/auth/createuser". No login required
router.post('/createuser',[
body('email','Enter a valid email').isEmail(),
body('name','Enter a valid name').isLength({min:3}),
body('password','Password must be atleast 5 characters').isLength({min:5})

],async (req,res)=>{
    // if there are errors, return bad request and errors
   const result = validationResult(req);
   if (!result.isEmpty()) {
     return res.send({ errors: result.array() });
   }
   
   try {
    // check whether the user with this email exists already
   let user=await User.findOne({email:req.body.email});
   if(user){
    return res.status(400).json({error: "Sorry a user with this email already exists"})
   }
   const salt=await bcrypt.genSalt(10);
   const secPass=await bcrypt.hash(req.body.password,salt);
   // create a new user
    user=await User.create({
      name: req.body.name,
      password: secPass,
      email:req.body.email,
    })

    const data={
      user:{
        id:user.id
      }
    }
    const authToken = jwt.sign(data,JWT_SECRET);
    //console.log(jwtData);
   //res.json(user)
   res.json({authToken});
 //catch errors other then email duplicacy
} catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured");
}
})

module.exports=router