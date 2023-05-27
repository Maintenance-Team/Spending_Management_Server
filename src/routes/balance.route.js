import express from 'express';
import balanceController from '../controllers/balance.controller.js';
const router = express.Router();

//* [GET] /balances/all-of-walet/:waletId    -> Get all balance of walet by waletId
router.get('/all-of-walet/:waletId', balanceController.getAllBalanceOfWalet);

//* [POST] /balances/create     -> Create a balance
router.post('/create', balanceController.createBalance);

//* [PUT] /balances/update/:id  -> Update balance by id
router.put('/update/:id', balanceController.updateBalance);

//* [DELETE] /balances/delete/:id   -> Delete a balance
router.delete('/delete/:id', balanceController.deleteBalance);

export default router;
