// routes/ProductRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductController');
const multer = require('multer');
const CheckAdminToken = require('../middleware/CheckAdminToken');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }); // Store uploaded files in memory

router.post('/add',  upload.single('image'), productController.createProduct);
router.get('/showAll', productController.getAllProducts); 
router.get('/showProductbyId/:productId', productController.getProductById);
router.get('/showAllByKind/:kind', productController.getProductsByKind);
router.get('/searchProduct/:name', productController.searchProductsByName);



module.exports = router;
