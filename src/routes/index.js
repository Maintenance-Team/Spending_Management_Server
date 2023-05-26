import userRouter from './user.route.js';
import authRouter from './auth.route.js';
import spendRouter from './spend.route.js';
import groupTypeRouter from './groupType.route.js';
import typeRouter from './type.route.js';

const route = (app) => {
  app.use('/users', userRouter);
  app.use('/auth', authRouter);
  app.use('/spends', spendRouter);
  app.use('/group-types', groupTypeRouter);
  app.use('/types', typeRouter);
};

export default route;
