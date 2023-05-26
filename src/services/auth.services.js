import prisma from '../config/db.js';
import createError from 'http-errors';
import { loginValidate, registerValidate } from '../helpers/validation.js';

export default {
  login: async (email, password) => {
    try {
      //   validate data
      const { error } = loginValidate({ email, password });
      if (error) {
        throw createError(error.details[0].message);
      }
      //   check email exists
      const user = await prisma.user.findUnique({
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
      return Promise.resolve(user);
    } catch (err) {
      throw err;
    }
  },

  register: async (email, password, name, gender, dateOfBirth) => {
    try {
      const newUser = {
        email,
        password,
        name,
        gender,
        dateOfBirth,
      };
      //   validate data
      const { error } = registerValidate(newUser);
      if (error) {
        throw createError(error.details[0].message);
      }
      //   check email has been exists
      const isExistEmail = await prisma.user.findUnique({
        where: { email },
      });
      if (isExistEmail) {
        throw createError.Conflict('This is email already exists');
      }
      //   save new user to DB
      const data = await prisma.user.create({
        data: newUser,
      });
      return Promise.resolve(data);
    } catch (err) {
      throw err;
    }
  },
};
