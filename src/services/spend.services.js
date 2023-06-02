import prisma from '../config/db.js';

export default {
  getSpendById: async (id) => {
    try {
      const data = await prisma.spend.findUnique({
        where: { id: Number(id) },
        include: { SpendFriend: true },
      });
      // Create alias
      data.listFriends = data.SpendFriend;
      delete data.SpendFriend;
      return Promise.resolve(data);
    } catch (err) {
      throw err;
    }
  },

  getAllSpend: async (userId) => {
    try {
      const data = await prisma.spend.findMany({ where: { id: Number(userId) } });
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

  createNewSpend: async (newSpendData, listFriendId) => {
    try {
      // create spend
      const newSpend = await prisma.spend.create({ data: newSpendData });
      // create many spend_friend
      let spendFriends;
      if (Array.isArray(listFriendId) && listFriendId.length > 0) {
        spendFriends = await prisma.spendFriend.createMany({
          data: listFriendId.map((friendId) => ({
            friendId: Number(friendId),
            spendId: Number(newSpend.id),
          })),
        });
      }
      return Promise.resolve({ newSpend, spendFriends });
    } catch (err) {
      throw err;
    }
  },

  updateSpendById: async (id, newSpend, listFriendId) => {
    try {
      //** update spend infor
      const spendUpdated = await prisma.spend.update({
        data: newSpend,
        where: { id: Number(id) },
        include: { SpendFriend: { select: { friendId: true } } },
      });
      //** update many spend_friend
      const currentFriendId = spendUpdated.SpendFriend.map((friend) => friend.friendId);
      let deleteFriends = Array.isArray(listFriendId) ? currentFriendId.filter((id) => !listFriendId.includes(id)) : [];
      let newFriends = Array.isArray(listFriendId) ? listFriendId.filter((id) => !currentFriendId.includes(id)) : [];

      //* delete friends in spend after update
      if (Array.isArray(deleteFriends) && deleteFriends.length > 0) {
        deleteFriends = await prisma.spendFriend.deleteMany({ where: { friendId: { in: deleteFriends } } });
      }

      //* create new friend in spend after update
      if (Array.isArray(newFriends) && newFriends.length > 0) {
        newFriends = await prisma.spendFriend.createMany({
          data: newFriends.map((friendId) => ({
            friendId: Number(friendId),
            spendId: Number(id),
          })),
        });
      }

      delete spendUpdated.SpendFriend;
      return Promise.resolve({ spendUpdated, deleteFriends, newFriends });
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
