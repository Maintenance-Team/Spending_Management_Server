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

  getBalanceByMonth: async (userId, month, year) => {
    try {
      if (!month || !year) {
        throw createError.ExpectationFailed('Expected "month" and "year" in request');
      }

      // let getBalanceInMonth = () => {
      //   return new Promise(async (resolve) => {
      //     const data = await prisma.balance.findFirst({
      //       where: {
      //         AND: [
      //           {
      //             walet: {
      //               user: {
      //                 id: Number(userId),
      //               },
      //             },
      //           },
      //           { month: Number(month) },
      //           { year: Number(year) },
      //         ],
      //       },
      //       select: {
      //         moneyForMonth: true,
      //       },
      //     });
      //     return resolve(data);
      //   });
      // };

      let getMoneyOfUser = () => {
        return new Promise(async (resolve) => {
          const data = await prisma.walet.aggregate({
            where: {
              userId: Number(userId),
            },
            _sum: {
              money: true,
            },
          });
          return resolve(data);
        });
      };

      let calcMoneySpendedOfWalet = () => {
        return new Promise(async (resolve) => {
          const firstDateOfMonth = new Date(year, month - 1, 1);
          const firstDateOfLastMonth = new Date(year, month, 1);
          // calc sum money spended
          const totalSpended = await prisma.spend.aggregate({
            _sum: {
              moneySpend: true,
            },
            where: {
              AND: [
                { walet: { userId: Number(userId) } },
                { timeSpend: { gt: firstDateOfMonth } },
                { timeSpend: { lt: firstDateOfLastMonth } },
              ],
            },
          });
          return resolve(totalSpended);
        });
      };

      const data = await Promise.all([getMoneyOfUser(), calcMoneySpendedOfWalet()]);

      if (!data[0]) {
        return Promise.resolve({});
      }
      // return data
      const spended = data[1]._sum.moneySpend;
      const firstBalance = data[0]._sum.money;
      const finalBalance = firstBalance > spended ? firstBalance - spended : -(spended - firstBalance);

      return Promise.resolve({ firstBalance, finalBalance, spended: -spended });
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
