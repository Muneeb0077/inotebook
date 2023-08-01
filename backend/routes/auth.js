const express=require('express');
const router = express.Router();
const User=require('../models/User');
const { body, validationResult } = require('express-validator');




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
   // check whether the user with this email exists already
   try {
    
   
   let user=await User.findOne({email:req.body.email});
   if(user){
    return res.status(400).json({error: "Sorry a user with this email already exists"})
   }
   // create a new user
    user=await User.create({
      name: req.body.name,
      password: req.body.password,
      email:req.body.email,
    })
    
 res.json(user)
 //catch errors other then email duplicacy
} catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured");
}
})

module.exports=router