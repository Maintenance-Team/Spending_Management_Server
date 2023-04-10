import userRouter from './user.route.js';

const route = (app) => {
  app.use('/users', userRouter);
};

export default route;
