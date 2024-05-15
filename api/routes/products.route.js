import express from 'express';
import { fetchAllProducts, product, products } from '../controllers/products.controller.js';

const router = express.Router();

router.post('/product', products)
router.get('/allproducts', fetchAllProducts)
router.get('/product/:productId', product)


export default router