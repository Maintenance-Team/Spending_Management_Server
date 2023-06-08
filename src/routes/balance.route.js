import express from 'express';
import balanceController from '../controllers/balance.controller.js';
const router = express.Router();

//* [GET] /balances/all-of-walet/:waletId    -> Get all balance of walet by waletId
router.get('/all-of-walet/:waletId', balanceController.getAllBalanceOfWalet);

//* [GET] /balances/by-month/:userId?waletId=""?month=""?year=""
router.get('/by-month/:userId', balanceController.getBalanceByMonth);

//* [POST] /balances/create     -> Create a balance
router.post('/create', balanceController.createBalance);

//* [PUT] /balances/update  -> Update balance
router.put('/update', balanceController.updateBalance);

//* [DELETE] /balances/delete/:id   -> Delete a balance
router.delete('/delete/:id', balanceController.deleteBalance);

export default router;
