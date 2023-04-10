import express from 'express';
import userController from '../controllers/user.controller.js';
const router = express.Router();

// [GET] users/all
router.get('/all', userController.getAll);

// [GET] users/:id
router.get('/:id', userController.getAnUser);

// [POST] users/create
router.post('/create', userController.addNewUser);

export default router;
