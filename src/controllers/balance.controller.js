import prisma from '../config/db.js';
import balanceServices from '../services/balance.services.js';

export default {
  getAllBalanceOfWalet: async (req, res, next) => {
    try {
      const { waletId } = req.params;
      const data = await balanceServices.getAllBalanceOfWalet(waletId);
      res.status(200).json({
        status: 200,
        message: 'get all balance of walet success',
        data,
      });
    } catch (err) {
      next(err);
    }
  },

  createBalance: async (req, res, next) => {
    try {
      const { waletId, moneyForMonth, month, year } = req.body;
      const newBalance = { waletId, moneyForMonth, month, year };
      const data = await balanceServices.createNewBalance(newBalance);
      res.status(201).json({
        status: 201,
        message: 'create new balance success',
        data,
      });
    } catch (err) {
      next(err);
    }
  },

  updateBalance: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { moneyForMonth } = req.body;
      const newBalance = { moneyForMonth };
      const data = balanceServices.updateBalanceById(id, newBalance);
      res.status(200).json({
        status: 200,
        message: 'update balance success',
        data,
      });
    } catch (err) {
      next(err);
    }
  },

  deleteBalance: async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await balanceServices.deleteBalanceById(id);
      res.status(200).json({
        status: 200,
        message: 'delete balance success',
        data,
      });
    } catch (err) {
      next(err);
    }
  },
};
