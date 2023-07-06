import spendServices from '../services/spend.services.js';
import createError from 'http-errors';

export default {
  getSpendByPeriod: async (req, res, next) => {
    try {
      const { fromDate, toDate, type } = req.query;
      const { userId } = req.params;
      const data = await spendServices.getSpendByPeriod(userId, fromDate, toDate, type);
      res.status(200).json({
        status: 200,
        message: 'get spend in period success',
        data,
      });
    } catch (err) {
      next(err);
    }
  },

  countSpendInDateByMonth: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const { month, year } = req.query;
      const data = await spendServices.countSpendInDateByMonth(userId, month, year);
      res.status(200).json({
        status: 200,
        message: 'get all quantity spend in date by month success!',
        data,
      });
    } catch (err) {
      next(err);
    }
  },

  getSpend: async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await spendServices.getSpendById(id);
      res.json({
        status: 200,
        message: 'get a spend success',
        data,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  },

  getAllSpend: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const data = await spendServices.getAllSpend(userId);
      res.json({
        status: 200,
        message: 'get all spend success',
        data,
      });
    } catch (err) {
      next(err);
    }
  },

  getSpendByDate: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const { day, month, year } = req.query;
      const data = await spendServices.getAllSpendByDate(userId, day, month, year);
      res.status(200).json({
        status: 200,
        message: 'get all spend by date success',
        data,
      });
    } catch (err) {
      next(err);
    }
  },

  getSpendByMonth: async (req, res, next) => {
    try {
      const { month, year } = req.query;
      const { userId } = req.params;
      // check month and year in request
      if (!month || !year) {
        throw createError.ExpectationFailed('Expected "month" and "year" in query of request!');
      }
      const data = await spendServices.getAllSpendByMonth(userId, month, year);
      res.status(200).json({
        status: 200,
        message: 'get all spend by month success',
        data,
      });
    } catch (err) {
      next(err);
    }
  },

  createSpend: async (req, res, next) => {
    try {
      const { waletId, typeId, moneySpend, timeSpend, note, location, image, friends, listFriendId } = req.body;
      const newSpend = { waletId, typeId, moneySpend, timeSpend, note, location, image, friends };
      const data = await spendServices.createNewSpend(newSpend, listFriendId);
      res.status(200).json({
        status: 201,
        message: 'create new spend success',
        data,
      });
    } catch (err) {
      next(err);
    }
  },

  editSpend: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { typeId, moneySpend, timeSpend, note, location, image, listFriendId, friends } = req.body;
      const newSpend = { typeId, moneySpend, timeSpend, note, location, image, friends };
      const data = await spendServices.updateSpendById(id, newSpend, listFriendId);
      res.status(200).json({
        status: 200,
        message: 'updated spend success',
        data,
      });
    } catch (err) {
      next(err);
    }
  },

  deleteSpend: async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await spendServices.deleteSpendById(id);
      res.status(200).json({
        status: 200,
        message: 'delete a spend success',
        data,
      });
    } catch (err) {
      next(err);
    }
  },
};
