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
      const data = await prisma.spend.findMany({
        where: {
          walet: {
            user: {
              id: Number(userId),
            },
          },
        },
        include: {
          type: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      });
      return Promise.resolve(data);
    } catch (err) {
      throw err;
    }
  },

  getAllSpendByDate: async (userId, date) => {
    try {
      const inputDate = new Date(date.slice(1, 11));
      const prevDate = new Date(inputDate);
      const nextDate = new Date(inputDate);
      prevDate.setDate(inputDate.getDate() - 1);
      nextDate.setDate(inputDate.getDate() + 1);

      // calc income spend and total spend money in date
      let totalTypeIncome = () => {
        return new Promise(async (resolve) => {
          const data = await prisma.spend.aggregate({
            _sum: {
              moneySpend: true,
            },
            where: {
              AND: [
                { walet: { user: { id: Number(userId) } } },
                { type: { groupType: { type: 'income' } } },
                { timeSpend: { gt: prevDate } },
                { timeSpend: { lt: nextDate } },
              ],
            },
          });
          return resolve(data);
        });
      };

      let totalTypeSpend = () => {
        return new Promise(async (resolve) => {
          const data = await prisma.spend.aggregate({
            _sum: {
              moneySpend: true,
            },
            where: {
              AND: [
                { walet: { user: { id: Number(userId) } } },
                { type: { groupType: { type: 'spend' } } },
                { timeSpend: { gt: prevDate } },
                { timeSpend: { lt: nextDate } },
              ],
            },
          });
          return resolve(data);
        });
      };

      // get all  spend in date
      let getAllSpendInDate = () => {
        return new Promise(async (resolve) => {
          const data = await prisma.spend.findMany({
            where: {
              AND: [
                {
                  walet: {
                    user: {
                      id: Number(userId),
                    },
                  },
                },
                { timeSpend: { gt: prevDate } },
                { timeSpend: { lt: nextDate } },
              ],
            },
          });
          return resolve(data);
        });
      };

      const data = await Promise.all([totalTypeIncome(), totalTypeSpend(), getAllSpendInDate()]);
      const income = data[0]._sum.moneySpend ?? 0;
      const spended = data[1]._sum.moneySpend ?? 0;

      return Promise.resolve({ income, spended, total: Number(income - spended), spendIndates: data[2] });
    } catch (err) {
      throw err;
    }
  },

  getAllSpendByMonth: async (userId, month, year) => {
    try {
      const firstDateOfMonth = new Date(year, month - 1, 1);
      const firstDateOfLastMonth = new Date(year, month, 1);
      const data = await prisma.spend.findMany({
        where: {
          AND: [
            {
              walet: {
                user: {
                  id: Number(userId),
                },
              },
            },
            { timeSpend: { gt: firstDateOfMonth } },
            { timeSpend: { lt: firstDateOfLastMonth } },
          ],
        },
        include: {
          type: {
            select: {
              name: true,
              image: true,
            },
          },
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
