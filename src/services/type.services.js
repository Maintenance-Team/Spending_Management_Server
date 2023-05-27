import prisma from '../config/db.js';

export default {
  getAllTypes: async () => {
    try {
      const data = await prisma.type.findMany();
      return Promise.resolve(data);
    } catch (err) {
      throw err;
    }
  },

  getTypeById: async (id) => {
    try {
      const data = await prisma.type.findUnique({ where: { id: Number(id) } });
      return Promise.resolve(data);
    } catch (err) {
      throw err;
    }
  },

  createNewType: async (newType) => {
    try {
      const data = await prisma.type.create({ data: newType });
      return Promise.resolve(data);
    } catch (err) {
      throw err;
    }
  },

  updateType: async (id, newType) => {
    try {
      const data = await prisma.type.update({ data: newType, where: { id: Number(id) } });
      return Promise.resolve(data);
    } catch (err) {
      throw err;
    }
  },

  deleteType: async (id) => {
    try {
      //!!! handle delete all reference before delete this type
    } catch (err) {
      throw err;
    }
  },
};
