import express from "express";
import {
    creatUser, 
    loginUser,
    logoutCurrentUser, 
    getAllUsers, 
    getCurrentUserProfile,
    updateCurrentUserProfile,
    getUserById,
    deleteUserById,
    updateUserById} from '../controllers/userController.js'

import { authenticate, authorizeAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(creatUser).get(authenticate, authorizeAdmin, getAllUsers);

router.post("/auth", loginUser);
router.post("/logout", logoutCurrentUser);

router.route('/profile').get(authenticate, getCurrentUserProfile).put(authenticate,
    updateCurrentUserProfile);

// Admin routes
router.route('/:id')
    .delete(authenticate, authorizeAdmin, deleteUserById)
    .get(authenticate, authorizeAdmin, getUserById)
    .put(authenticate, authorizeAdmin, updateUserById);

export default router;