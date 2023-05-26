import express from 'express';
import spendController from '../controllers/spend.controller.js';
const router = express.Router();

// [GET] spends/:id -> Get a spend
router.get('/:id', spendController.getSpend);

// [GET] spends/all -> Get all spend
router.get('/all', spendController.getAllSpend);

// [GET] spends/in-month/:month ->  Get all spend in month
router.get('/in-month/:month', spendController.getSpendInMonth);

// [POST] spends/create -> Create a spend
router.post('/create', spendController.createSpend);

// [PUT] spends/edit/:id -> Edit a spend
router.put('/edit/:id', spendController.editSpend);

router.delete('/delete/:id', spendController.deleteSpend);

export default router;
