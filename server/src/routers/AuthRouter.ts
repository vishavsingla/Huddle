import { Router, Request, Response } from 'express';
import {
    signUpController,
    loginController,
    logOutController,
    refreshAccessTokenController,
    checkValidSession,
    getUserDetails,
} from '../controllers/AuthController';

const router = Router();

router.post('/signup', signUpController);
router.post('/login', loginController);
router.post('/logout/:id', logOutController);
router.post('/refresh-token', refreshAccessTokenController);
router.get('/check-session/:id', checkValidSession);
router.get('/user/:id', getUserDetails);

export default router; 

