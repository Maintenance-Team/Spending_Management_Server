import prisma from '../config/db.js';

export default {
  getAllFriendOfUser: async (userId) => {
    try {
      const data = await prisma.friend.findMany({ where: { userId: Number(userId) } });
      return Promise.resolve(data);
    } catch (err) {
      throw err;
    }
  },

  getFriendById: async (id) => {
    try {
      const data = await prisma.friend.findUnique({ where: { id: Number(id) } });
      return Promise.resolve(data);
    } catch (err) {
      throw err;
    }
  },

  createNewFriend: async (newFriend) => {
    try {
      const data = await prisma.friend.create({ data: newFriend });
      return Promise.resolve(data);
    } catch (err) {
      throw err;
    }
  },

  updateFriendById: async (id, newFriend) => {
    try {
      const data = await prisma.friend.update({ data: newFriend, where: { id: Number(id) } });
      return Promise.resolve(data);
    } catch (err) {
      throw err;
    }
  },

  //!!! handle delete all reference before delete this friend
  deleteFriend: async (id) => {
    try {
      const data = await prisma.friend.delete({ where: { id: Number(id) } });
      return Promise.resolve(data);
    } catch (err) {
      throw err;
    }
  },
};
