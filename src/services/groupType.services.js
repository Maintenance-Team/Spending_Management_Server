import prisma from '../config/db.js';

export default {
  getAllGroupTypeIncludeType: async () => {
    try {
      const data = await prisma.groupType.findMany({
        include: { Type: true },
      });
      return Promise.resolve(data);
    } catch (err) {
      throw err;
    }
  },

  getAllGroupType: async () => {
    try {
      const data = await prisma.groupType.findMany();
      return Promise.resolve(data);
    } catch (err) {
      throw err;
    }
  },

  getGroupTypeById: async (id) => {
    try {
      const data = await prisma.groupType.findUnique({ where: { id: Number(id) } });
      return Promise.resolve(data);
    } catch (err) {
      throw err;
    }
  },

  createNewGroupType: async (type, groupName) => {
    try {
      const newData = { type, groupName };
      const data = await prisma.groupType.create({ data: newData });
      return Promise.resolve(data);
    } catch (err) {
      throw err;
    }
  },

  updateGroupType: async (id, type, groupName) => {
    try {
      const newData = { type, groupName };
      const data = await prisma.groupType.update({ data: newData, where: { id: Number(id) } });
      return Promise.resolve(data);
    } catch (err) {
      throw err;
    }
  },

  deleteGroupType: async (id) => {
    //!!!   handle delete all reference before delete this group type
  },
};
