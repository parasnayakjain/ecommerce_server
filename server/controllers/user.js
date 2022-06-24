const func = require("../middleware/assyncError");
const User = require("../models/user");
const ErrorHander = require("../utils/error");
const setToken = require("../utils/setToken");



const registerUser = func(async (req, res, next) => {
    const { name, email, password } = req.body;

    const user = await User.create({
        name, email, password,
        avatar: {
            public_id: "a",
            url: "a"
        }
    });

    next();
});

const login = func((async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password)
        return next(new ErrorHander("Enter Eamil and Password", 400));
    console.log(email, password);
    const user = await User.findOne({ email: email, password: password });

    if (!user)
        return next(new ErrorHander("Enter Valid Eamil and Password", 400));

    setToken(res, user);

}))

const logout = func((async (req, res, next) => {
    res.cookie("id", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged Out",
    });

}))


const updatePassword = func(async (req, res, next) => {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const { id } = req.cookies;
    if (!oldPassword || !newPassword  || !confirmPassword)
        return next(new ErrorHander("Enter Eamil and Password", 400));
    if (newPassword != confirmPassword)
        return next(new ErrorHander("PLease eneter same Passwords", 400));

    const user = await User.findById(id);
    if (user.password != oldPassword)
        return next(new ErrorHander("PLease eneter correct Passwords", 400))

    user.password = newPassword;
    user.save();
    res.status(200).json({
        success: "true",
        message: "updated succesfully"
    })




})

const updateProfile = func(async (req, res, next) => {
    const {name , email}=req.body;
    const { id } = req.cookies;
    if (!email || !name)
      return next(new ErrorHander("Enter Eamil and Password", 400)); 

      const user = await User.findByIdAndUpdate(id, {name:name , email:email}, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });
     res.status(200).json({
        success: "true",
        message: "updated succesfully"
    })
})
module.exports = { registerUser, login, logout, updatePassword ,updateProfile};
