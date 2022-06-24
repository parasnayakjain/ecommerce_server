const func = require("../middleware/assyncError");
const User = require("../models/user");
const ErrorHander = require("../utils/error");


const authNormal= func(async(req,res,next)=>{
   const { id } = req.cookies;
     
   const user=await User.findById(id);
   if(!user)
     next(new ErrorHander("Please login",404));
     
    next();
});

module.exports=authNormal;