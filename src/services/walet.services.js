import prisma from '../config/db.js';

export default {
  getAllWaletOfUser: async (userId) => {
    try {
      const data = await prisma.walet.findMany({ where: { userId: Number(userId) } });
      return Promise.resolve(data);
    } catch (err) {
      throw err;
    }
  },

  getWaletById: async (id) => {
    try {
      const data = await prisma.walet.findUnique({ where: { id: Number(id) } });
      return Promise.resolve(data);
    } catch (err) {
      throw err;
    }
  },

  createNewWalet: async (newWalet) => {
    try {
      const data = await prisma.walet.create({ data: newWalet });
      return Promise.resolve(data);
    } catch (err) {
      throw err;
    }
  },

  updateWalet: async (id, newWalet) => {
    try {
      const data = await prisma.walet.update({ data: newWalet, where: { id: Number(id) } });
      return Promise.resolve(data);
    } catch (err) {
      throw err;
    }
  },

  deleteWalet: async (id) => {
    try {
      const data = await prisma.walet.delete({ where: { id: Number(id) } });
      return Promise.resolve(data);
    } catch (err) {
      throw err;
    }
  },
};
