const jwt = require("jsonwebtoken")
const cookie = require("cookie");

module.exports.authUser = (req,res,next)=>{
    try{
        const token = req.cookies.token;
        console.log(token)
        if(!token){
            return res.status(401).json({message: 'Unauthorized no token provided'});
        }
        console.log(token)
        const decoded = jwt.verify(token,"secret-key")
        req.user = decoded;
        next();
    }
    catch(err){
       console.log(err)
        return res.status(401).json({message: 'Unauthorized token mismatch'});
    }

}