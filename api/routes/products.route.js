import express from 'express';
import { products } from '../controllers/products.controller.js';

const router = express.Router();

router.post('/products', products)

export default router