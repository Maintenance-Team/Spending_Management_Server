import prisma from '../config/db.js';
import createError from 'http-errors';
import { loginValidate, registerValidate } from '../helpers/validation.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

function generateTokens(user) {
  const accessToken = jwt.sign({ userId: user.id }, 'access-token-secret', { expiresIn: '1d' });
  const refreshToken = jwt.sign({ userId: user.id }, 'refresh-token-secret', { expiresIn: '7d' });
  return { accessToken, refreshToken };
}

export default {
  login: async (email, password) => {
    try {
      // validate data
      const { error } = loginValidate({ email, password });
      if (error) {
        throw createError(error.details[0].message);
      }

      // check email exists
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (!user) {
        throw createError.NotFound('This email does not exist!');
      }

      // compare password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throw createError.Unauthorized();
      }

      // generate access and refresh tokens
      const { accessToken, refreshToken } = generateTokens(user);

      return Promise.resolve({ accessToken, refreshToken });
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

      // Hash the password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      newUser.password = hashedPassword;

      // validate data
      const { error } = registerValidate(newUser);
      if (error) {
        throw createError(error.details[0].message);
      }

      // check email has been taken
      const isExistEmail = await prisma.user.findUnique({
        where: { email },
      });
      if (isExistEmail) {
        throw createError.Conflict('This email already exists');
      }

      // save new user to DB
      const data = await prisma.user.create({
        data: newUser,
      });

      const { accessToken, refreshToken } = generateTokens(data);

      return Promise.resolve({ accessToken, refreshToken });
    } catch (err) {
      throw err;
    }
  },
  verifyAccessToken: async (access_token) => {
    try {
      const decoded = jwt.verify(access_token, 'access-token-secret');
      return Promise.resolve({ message: 'success', decoded });
    } catch (err) {
      throw err;
    }
  },
};
