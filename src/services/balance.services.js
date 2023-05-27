import prisma from '../config/db.js';

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
      const data = await prisma.balance.update({ data: newBalance, where: { id: Number(id) } });
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
