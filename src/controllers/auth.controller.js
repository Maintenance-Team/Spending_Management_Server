import prisma from '../config/db.js';
import createError from 'http-errors';
import { loginValidate, registerValidate } from '../helpers/validation.js';

export default {
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      //   validate data
      const { error } = loginValidate(req.body);
      if (error) {
        throw createError(error.details[0].message);
      }

      //   check email exists
      const user = await prisma.User.findUnique({
        where: {
          email,
        },
      });
      if (!user) {
        throw createError.NotFound('This email is not exists!');
      }

      //   compare password
      if (password !== user.password) {
        throw createError.Unauthorized();
      }

      res.status(200).json({
        status: 200,
        message: 'Login success',
        data: user,
      });
    } catch (err) {
      next(err);
    }
  },

  register: async (req, res, next) => {
    try {
      const { email, password, name, gender, dateOfBirth } = req.body;
      //   validate data
      const { error } = registerValidate(req.body);
      if (error) {
        throw createError(error.details[0].message);
      }

      //   check email has been exists
      const isExistEmail = await prisma.User.findUnique({
        where: { email },
      });
      if (isExistEmail) {
        throw createError.Conflict('This is email already exists');
      }

      const newUser = {
        email,
        password,
        name,
        gender,
        dateOfBirth,
      };

      //   save new user to DB
      const data = await prisma.User.create({
        data: newUser,
      });

      res.status(201).json({
        status: 201,
        message: 'Register success',
        data,
      });
    } catch (err) {
      next(err);
    }
  },
};
