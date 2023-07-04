import express from 'express';
import spendController from '../controllers/spend.controller.js';
const router = express.Router();

//* [GET] spends/period?fromDate=""?toDate=""?type=""
router.get('/period/:userId', spendController.getSpendByPeriod);

//* [GET] spends/count-spend-by-date-in-month/:userId?month=""?year=""
router.get('/count-spend-by-date-in-month/:userId', spendController.countSpendInDateByMonth);

// [GET] spends/all -> Get all spend
router.get('/all-of-user/:userId', spendController.getAllSpend);

// [get] spends/by-date?day=""?month=""?year="" -> Get all spend by date
router.get('/by-date/:userId', spendController.getSpendByDate);

// [GET] spends/by-month?month="" ->  Get all spend by month
router.get('/by-month/:userId', spendController.getSpendByMonth);

// [GET] spends/:id -> Get a spend
router.get('/:id', spendController.getSpend);

// [POST] spends/create -> Create a spend
router.post('/create', spendController.createSpend);

// [PUT] spends/edit/:id -> Edit a spend
router.put('/update/:id', spendController.editSpend);

router.delete('/delete/:id', spendController.deleteSpend);

export default router;
