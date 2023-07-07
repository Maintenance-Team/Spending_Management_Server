import express from 'express';
import authController from '../controllers/auth.controller.js';
const router = express.Router();

//* [POST] auth/login
router.post('/login', authController.login);

//* [POST] auth/register
router.post('/register', authController.register);
router.post('/verify_token', authController.verify);

export default router;
