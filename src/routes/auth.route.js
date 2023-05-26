import express from 'express';
import authController from '../controllers/auth.controller.js';
const router = express.Router();

// [POST] auth/login
router.post('/login', authController.login);

// [POST] auth/register
router.post('/register', authController.register);

export default router;
