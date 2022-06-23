const app = require("../app");
const func = require("../middleware/assyncError");
const errorHandler = require("../middleware/error");
const Product = require("../models/product");
const ErrorHander = require("../utils/error");
const ApiFeatures =require("../utils/apiFeatures");

exports.createProduct = func(async (req, res, next) => {
    const product = await Product.create(req.body)
    res.status(201).json({
        sucess: true,
        product
    })


})
exports.getAllProducts = func(async (req, res) => {
    
    const a=new ApiFeatures(Product.find() , req.query);
    a.search();
    a.filter();
    a.pagination(2);
    const products = await a.query;
    res.status(200).json({
        sucess: true,
        products
    });
})

exports.updateProduct = func(async (req, res, next) => {
    const id = req.params.id;
    console.log(id);
    let product = await Product.findById(id);
    if (!product)
        return next(new ErrorHander("Product not found", 404));

    product = await Product.findByIdAndUpdate(id, req.body,
        { new: true, runValidators: true, useFindAndModify: false });

    res.status(200).json({
        sucess: true,
        product
    })

})


exports.deleteProduct = func(async (req, res, next) => {
    const id = req.params.id;
    let product = await Product.findById(id);
    if (!product)
        return next(new ErrorHander("Product not found", 404));

    await product.remove();

    res.status(200).json({
        success: true,
        message: "product deleted succesfully"
    })
})

exports.getProduct = func(async (req, res, next) => {
    const id = req.params.id;
    let product = await Product.findById(id);
    if (!product)
        return next(new ErrorHander("Product not found", 404));


    res.status(200).json({
        success: true,
        product
    })
})