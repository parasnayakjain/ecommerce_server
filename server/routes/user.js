const {registerUser,login,logout, updatePassword,updateProfile}=require("../controllers/user");
const express = require("express");
const authNormal = require("../middleware/auth");
const router = express.Router();

router
 .route("/registerUser")
   .post(registerUser,login)
router
  .route("/login")
   .post(login);
router
  .route("/logout")
   .post(logout);
router
  .route("/updatePassword")
   .post(authNormal, updatePassword);

router
  .route("/updateProfile")
    .post(authNormal , updateProfile);
module.exports=router;