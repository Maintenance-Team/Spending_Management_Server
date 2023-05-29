import express from 'express';
import waletController from '../controllers/walet.controller.js';
const router = express.Router();

//* [GET] /walets/all-of-user/:userId   -> get all walet of user
router.get('/all-of-user/:userId', waletController.getAllWaletOfUser);

//* [GET] /walets/:id       -> get a walet
router.get('/:id', waletController.getDetailWalet);

//* [POST] /walets/create-first     -> create walet in first access
router.post('/create-first', waletController.createWaletInFirst);

//* [POST] /walets/create       -> create a walet
router.post('/create', waletController.createWalet);

//* [PUT]  /walets/update/:id      -> update a walet
router.put('/update/:id', waletController.updateWalet);

//* [DELETE] /walets/delete/:id     -> delete a walet
router.delete('/delete/:id', waletController.deleteWalet);

export default router;
