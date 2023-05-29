import prisma from '../config/db.js';

export default {
  getUserById: async (id) => {
    try {
      const data = await prisma.user.findUnique({ where: { id: Number(id) } });
      return Promise.resolve(data);
    } catch (err) {
      throw err;
    }
  },
};
