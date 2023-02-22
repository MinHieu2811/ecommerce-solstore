import express from "express";
import { getAllPosts, createPost, getPost, updatePost, aprrovePost, getMyPost, getPostApproved, likePost, deletePost } from "../controllers/postControllers.js";
import { protect, admin } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.route('/').get(getPostApproved).post(protect, createPost).get(protect, getMyPost);
router.route('/admin').get(protect, getAllPosts);
router.route('/:id').get(getPost).put(protect, updatePost).delete(protect, deletePost);
router.route('/:id/likePost').patch(protect, likePost);
router.route('/:id/approve').put(protect, aprrovePost);

export default router;