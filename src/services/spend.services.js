import prisma from '../config/db.js';

export default {
  getSpendById: async (id) => {
    try {
      const data = await prisma.spend.findUnique({ where: { id: Number(id) } });
      return Promise.resolve(data);
    } catch (err) {
      throw err;
    }
  },

  getAllSpend: async () => {
    try {
      const data = await prisma.spend.findMany();
      return Promise.resolve(data);
    } catch (err) {
      throw err;
    }
  },

  getAllSpendByMonth: async (month, year) => {
    try {
      const firstDateOfMonth = new Date(year, month - 1, 1);
      const firstDateOfLastMonth = new Date(year, month, 1);
      const data = await prisma.spend.findMany({
        where: {
          AND: [{ timeSpend: { gt: firstDateOfMonth } }, { timeSpend: { lt: firstDateOfLastMonth } }],
        },
      });
      return Promise.resolve(data);
    } catch (err) {
      throw err;
    }
  },

  createNewSpend: async (newSpend) => {
    try {
      const data = await prisma.spend.create({ data: newSpend });
      return Promise.resolve(data);
    } catch (err) {
      throw err;
    }
  },

  updateSpendById: async (id, newSpend) => {
    try {
      const data = await prisma.spend.update({ data: newSpend, where: { id: Number(id) } });
      return Promise.resolve(data);
    } catch (err) {
      throw err;
    }
  },

  //!!! handle delete all reference before delete this spend
  deleteSpendById: async (id) => {
    try {
      const data = await prisma.spend.delete({ where: { id: Number(id) } });
      return Promise.resolve(data);
    } catch (err) {
      throw err;
    }
  },
};
