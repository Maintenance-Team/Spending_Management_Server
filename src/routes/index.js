import userRouter from './user.route.js';
import authRouter from './auth.route.js';
import spendRouter from './spend.route.js';
import groupTypeRouter from './groupType.route.js';
import typeRouter from './type.route.js';
import friendRouter from './friend.route.js';
import balanceRouter from './balance.route.js';
import waletRouter from './walet.route.js';

const route = (app) => {
  app.use('/users', userRouter);
  app.use('/auth', authRouter);
  app.use('/spends', spendRouter);
  app.use('/group-types', groupTypeRouter);
  app.use('/types', typeRouter);
  app.use('/friends', friendRouter);
  app.use('/balances', balanceRouter);
  app.use('/walets', waletRouter);
};

export default route;
