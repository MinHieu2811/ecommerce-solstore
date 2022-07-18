import express from "express";
import { authUser, getUserProfile, getUsers, registerUser, updateUserProfile, getUserById, deleteUser, updateUser } from "../controllers/userControllers.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route('/').post(registerUser).get(protect, admin, getUsers);
router.post('/login', authUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.route('/:id').get(protect, admin, getUserById).put(protect, admin, updateUser).delete(protect, admin, deleteUser);
// router.route('/reset-password').post(resetPasswordEmail);

export default router;