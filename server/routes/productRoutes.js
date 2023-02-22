import express from "express";
import { getProducts, getRandomProducts, getProductById, deleteProduct, createProduct, updateProduct, createProductReview } from "../controllers/productControllers.js";
import { protect, admin } from '../middlewares/authMiddleware.js'
const router = express.Router();

router.route('/').get(getProducts).post(protect, createProduct);
router.route('/random/:numberProducts').get(getRandomProducts);
router.route('/:id/reviews').post(protect, createProductReview)
router.route('/:id').get(getProductById).delete(protect, deleteProduct).put(protect, updateProduct);

export default router;