import userRouter from './user.route.js';
import authRouter from './auth.route.js';
import spendRouter from './spend.route.js';

const route = (app) => {
  app.use('/users', userRouter);
  app.use('/auth', authRouter);
  app.use('/spends', spendRouter);
};

export default route;
