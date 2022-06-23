const func = require("../middleware/assyncError");
const User = require("../models/user");



const registerUser=func(async (req,res,next)=>{
   const{name,email,password}=req.body;

   const user= await User.create({
    name,email,password,
    avatar:{
        public_id:"a",
        url:"a"
    }
   });

   res.status(200).json({
    status:"True",
    user

   })
});

module.exports=registerUser;