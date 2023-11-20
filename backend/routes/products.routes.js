const router = require("express").Router();
const {
  addProduct,
  getAllProducts,
  getProductById,
} = require("../controllers/products.controller");
// const authManager = require('../middlewares/authUser');

/* GET users listing. */

/* Manager routes */
// getProducts
// getProductById
// addProduct
// updateProduct
// removeProduct
router.get("/managers/all", getAllProducts);
// router.get('/managers/:productId', getAllProductById);
router.post("/managers", addProduct);
// router.put('/managers', getAllProductById);
// router.delete('/managers', getAllProductById);

// // ----------------------------------------------------------

// /* Customers routes */
// // getAllProducts
router.get("/customers/all", getAllProducts);
// // getProductsById
router.post("/by-id", getProductById);

// // queryProducts

// router.get('/customers/all', getAllProducts);
// // router.get('/customers/:productId', getAllProductById);

module.exports = router;
