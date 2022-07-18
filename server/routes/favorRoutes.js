import express from 'express';
// import {protect} from '../middlewares/authMiddleware';
import { protect } from '../middlewares/authMiddleware.js';
import { addToFavor, getFavor, deleteFavor } from '../controllers/favorControllers.js';

const router = express.Router();

router.route('/').get(protect, getFavor).post(protect, addToFavor);
router.route('/:id').delete(protect, deleteFavor);

export default router;
