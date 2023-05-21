import userRouter from './user.route.js';
import authRouter from './auth.route.js';

const route = (app) => {
  app.use('/users', userRouter);
  app.use('/auth', authRouter);
};

export default route;
