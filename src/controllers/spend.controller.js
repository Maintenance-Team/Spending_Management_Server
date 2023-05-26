import prisma from '../config/db.js';
import createError from 'http-errors';

export default {
  getSpend: async (req, res, next) => {
    try {
      const { id } = req.params;

      const spend = await prisma.spend.findUnique({
        where: {
          id,
        },
      });

      res.json({
        status: 200,
        message: 'get a spend success',
        data: spend,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  },

  getAllSpend: async (req, res, next) => {
    try {
      const allSpend = await prisma.spend.findMany({
        where: {
          id: Number(1),
        },
      });

      res.json({
        status: 200,
        message: 'get all spend success',
        data: allSpend,
      });
    } catch (err) {
      next(err);
    }
  },

  getSpendInMonth: async (req, res, next) => {
    try {
      //   const month = req.params;
      //   const spends = await prisma.spend.findMany({
      //     where: {
      //     }
      //   })
    } catch (err) {
      next(err);
    }
  },

  createSpend: async (req, res, next) => {
    try {
      const { waletId, typeId, moneySpend, timeSpend, note, location, image } = req.body;

      const newSpend = { waletId, typeId, moneySpend, timeSpend, note, location, image };

      const data = await prisma.spend.create({
        data: newSpend,
      });

      res.json({
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

      const { typeId, moneySpend, timeSpend, note, location, image } = req.body;

      const updateSpend = { waletId, typeId, moneySpend, timeSpend, note, location, image };

      const data = await prisma.spend.update({
        data: updateSpend,
        where: {
          id,
        },
      });

      res.json({
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
    } catch (err) {
      next(err);
    }
  },
};
