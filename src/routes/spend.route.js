import express from 'express';
import spendController from '../controllers/spend.controller.js';
const router = express.Router();

// [GET] spends/all -> Get all spend
router.get('/all', spendController.getAllSpend);

// [GET] spends/by-month?month="" ->  Get all spend by month
router.get('/by-month', spendController.getSpendByMonth);

// [GET] spends/:id -> Get a spend
router.get('/:id', spendController.getSpend);

// [POST] spends/create -> Create a spend
router.post('/create', spendController.createSpend);

// [PUT] spends/edit/:id -> Edit a spend
router.put('/update/:id', spendController.editSpend);

router.delete('/delete/:id', spendController.deleteSpend);

export default router;
