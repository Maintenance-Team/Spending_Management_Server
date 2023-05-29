import waletServices from '../services/walet.services.js';

export default {
  getAllWaletOfUser: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const data = await waletServices.getAllWaletOfUser(userId);
      res.status(200).json({
        status: 200,
        message: 'get all walet of user success',
        data,
      });
    } catch (err) {
      next(err);
    }
  },

  getDetailWalet: async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await waletServices.getWaletById(id);
      res.status(200).json({
        status: 200,
        message: 'get detail a walet success',
        data,
      });
    } catch (err) {
      next(err);
    }
  },

  createWaletInFirst: async (req, res, next) => {
    try {
      const { userId, currencyUnit, money } = req.body;
      const newWalet = { userId, name: 'Ví mặc định', currencyUnit, money };
      const data = await waletServices.createNewWalet(newWalet);
      res.status(201).json({
        status: 201,
        message: 'create new walet in first access success',
        data,
      });
    } catch (err) {
      next(err);
    }
  },

  createWalet: async (req, res, next) => {
    try {
      const { userId, name, currencyUnit, money } = req.body;
      const newWalet = { userId, name, currencyUnit, money };
      const data = await waletServices.createNewWalet(newWalet);
      res.status(201).json({
        status: 201,
        message: 'create new walet success',
        data,
      });
    } catch (err) {
      next(err);
    }
  },

  updateWalet: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, currencyUnit, money } = req.body;
      const newWalet = { name, currencyUnit, money };
      const data = await waletServices.updateWalet(id, newWalet);
      res.status(200).json({
        status: 200,
        message: 'update walet success',
        data,
      });
    } catch (err) {
      next(err);
    }
  },

  //!!! handle delete reference
  deleteWalet: async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await waletServices.deleteWalet(id);
      res.status(200).json({
        status: 200,
        message: 'delete a walet success',
        data,
      });
    } catch (err) {
      next(err);
    }
  },
};
