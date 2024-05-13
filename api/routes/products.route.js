import express from 'express';
import { fetchAllProducts, fetchProduct, products } from '../controllers/products.controller.js';

const router = express.Router();

router.post('/product', products)
router.get('/products/:productId', fetchProduct)
router.get('/allproducts', fetchAllProducts)

export default router