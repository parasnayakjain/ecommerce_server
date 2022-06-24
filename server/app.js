const express=require("express");
const cookieParser=require("cookie-parser");
const app=express();
const product=require("./routes/products")
const user=require("./routes/user");
const connectDB=require("./database/connect");
const errorHandler = require("./middleware/error");
app.use(cookieParser());
app.use(express.json());
app.use("/api/v1",product);
app.use("/api/v1",user);
app.use(errorHandler);
connectDB();
module.exports=app