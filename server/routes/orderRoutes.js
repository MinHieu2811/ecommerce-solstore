import express from "express";
const router = express.Router();
import { addOrderItems, getOrders, getMyOrders, getOrderById, updateOrderToPaid, updateOrderToDelivered } from '../controllers/orderControllers.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);
router.route('/:id/pay').put(protect, admin, updateOrderToPaid);

export default router;