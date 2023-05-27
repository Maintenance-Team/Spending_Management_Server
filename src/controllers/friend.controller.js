import friendServices from '../services/friend.services.js';

export default {
  getAllFriendOfUser: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const data = await friendServices.getAllFriendOfUser(userId);
      res.status(200).json({
        status: 200,
        message: 'get all friend success',
        data,
      });
    } catch (err) {
      next(err);
    }
  },

  getFriend: async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await friendServices.getFriendById(id);
      res.status(200).json({
        status: 200,
        message: 'get a friend success',
        data,
      });
    } catch (err) {
      next(err);
    }
  },

  createFriend: async (req, res, next) => {
    try {
      const { userId, name, image } = req.body;
      const newFriend = { userId, name, image };
      const data = await friendServices.createNewFriend(newFriend);
      res.status(200).json({
        status: 200,
        message: 'create new friend success',
        data,
      });
    } catch (err) {
      next(err);
    }
  },

  updateFriend: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, image } = req.body;
      const newFriend = { name, image };
      const data = await friendServices.updateFriendById(id, newFriend);
      res.status(200).json({
        status: 200,
        message: 'update a friend success',
        data,
      });
    } catch (err) {
      next(err);
    }
  },

  deleteFriend: async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await friendServices.deleteFriend(id);
      res.status(200).json({
        status: 200,
        message: 'delete a friend success',
        data,
      });
    } catch (err) {
      next(err);
    }
  },
};
