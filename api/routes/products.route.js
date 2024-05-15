import express from 'express';
import { fetchAllProducts, products } from '../controllers/products.controller.js';

const router = express.Router();

router.post('/product', products)
router.get('/allproducts', fetchAllProducts)

export default router