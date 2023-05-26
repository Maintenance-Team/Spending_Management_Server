import authServices from '../services/auth.services.js';

export default {
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await authServices.login(email, password);
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
      const data = await authServices.register(email, password, name, gender, dateOfBirth);
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
