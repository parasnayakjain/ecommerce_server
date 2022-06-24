const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProduct } = require("../controllers/product");
const router = express.Router();
const authNormal=require("../middleware/auth")
router
  .route("/products")
  .get(getAllProducts)
router
  .route("/product/new")
  .post(authNormal,createProduct)
router
  .route("/product/:id")
  .put(authNormal,updateProduct)
  .delete(authNormal,deleteProduct)
  .get(authNormal,getProduct)
module.exports = router;