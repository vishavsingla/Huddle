import { Router, Request, Response } from 'express';
import {
    signUpController,
    loginController,
    logOutController,
    refreshAccessTokenController,
    checkValidSession,
    getUserDetails,
} from '../controllers/AuthController';
import {authMiddleware} from '../middlewares/authMiddleware'
const router = Router();

router.post('/signup', signUpController);
router.post('/login', loginController);
router.post('/logout/:id?' ,logOutController);
router.post('/refresh-token', authMiddleware, refreshAccessTokenController);
router.get('/check-session/:id?', authMiddleware, checkValidSession);
router.get('/user/:id?', authMiddleware, getUserDetails);

export default router; 

