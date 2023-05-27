import express from 'express';
import typeController from '../controllers/type.controller.js';
const router = express.Router();

//* [GET] /types/all    -> get all types
router.get('/all', typeController.getAllTypes);

//* [GET] /types/:id    ->  get a type
router.get('/:id', typeController.getType);

//* [POST] /types/create    -> create a type
router.post('/create', typeController.createType);

//* [PUT] /types/update/:id     -> update a type
router.put('/update/:id', typeController.updateType);

//* [DELETE] /types/delete/:id      -> delete a type
router.delete('/delete/:id', typeController.deleteType);

export default router;
