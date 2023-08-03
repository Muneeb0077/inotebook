var jwt = require('jsonwebtoken');
const JWT_SECRET='Muneebisagoodb$boy';

const fetchUser=(req,res,next)=>{
    // Get the user from jwt token and send id to request object
    const token =req.header('auth-token');
    if(!token){
        res.status(401).send({error:"please authenticate using a valid token"})
    }

    try {
        const data=jwt.verify(token,JWT_SECRET);
        req.user=data.user;
        next();
    } catch (error) {
        res.status(401).send({error:"please authenticate using a valid token"})
    }
   
}

module.exports= fetchUser;