import prisma from '../config/db.js';
import { updateBalance } from '../helpers/validation.js';
import createError from 'http-errors';

export default {
  getAllBalanceOfWalet: async (waletId) => {
    try {
      const data = await prisma.balance.findMany({ where: { waletId: Number(waletId) } });
      return Promise.resolve(data);
    } catch (err) {
      throw err;
    }
  },

  createNewBalance: async (newBalance) => {
    try {
      const data = await prisma.balance.create({ data: newBalance });
      return Promise.resolve(data);
    } catch (err) {
      throw err;
    }
  },

  updateBalanceById: async (id, newBalance) => {
    try {
      // validate object id
      const { error } = updateBalance(id);
      if (error) {
        throw createError(error.details[0].message);
      }
      //   update
      const data = await prisma.balance.updateMany({
        data: newBalance,
        where: { AND: [{ waletId: Number(id.waletId) }, { month: Number(id.month) }, { year: Number(id.year) }] },
      });
      return Promise.resolve(data);
    } catch (err) {
      throw err;
    }
  },

  deleteBalanceById: async (id) => {
    try {
      const data = await prisma.balance.delete({ where: { id: Number(id) } });
      return Promise.resolve(data);
    } catch (err) {
      throw err;
    }
  },
};
