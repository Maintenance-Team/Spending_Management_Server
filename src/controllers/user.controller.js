import prisma from '../config/db.js';
import userServices from '../services/user.services.js';

export default {
  getAll: async (req, res, next) => {
    try {
      const data = await prisma.User.findMany({});

      res.status(200).json({
        status: 200,
        data: data,
      });
    } catch (err) {
      next(err);
    }
  },

  getAnUser: async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await userServices.getUserById(id);
      res.status(200).json({
        status: 200,
        message: 'get user data success',
        data,
      });
    } catch (err) {
      next(err);
    }
  },

  addNewUser: async (req, res, next) => {
    try {
      const { email, name, password } = req.body;
      const user = {
        email,
        name,
        password,
      };

      const saveUser = await prisma.User.create({
        data: user,
      });

      res.status(200).json({
        status: 200,
        message: 'success',
        data: saveUser,
      });
    } catch (err) {
      next(err);
    }
  },
};
