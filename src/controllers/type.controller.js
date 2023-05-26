import typeServices from '../services/type.services.js';

export default {
  getAllTypes: async (req, res, next) => {
    try {
      const data = await typeServices.getAllTypes();
      res.status(200).json({
        status: 200,
        message: 'get all types success',
        data,
      });
    } catch (err) {
      next(err);
    }
  },

  getType: async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await typeServices.getTypeById(id);
      res.status(200).json({
        status: 200,
        message: 'get a type success',
        data,
      });
    } catch (err) {
      next(err);
    }
  },

  createType: async (req, res, next) => {
    try {
      const { groupTypeId, name, image } = req.body;
      const newType = { groupTypeId, name, image };
      const data = await typeServices.createNewType(newType);
      res.status(201).json({
        status: 201,
        message: 'create new type success',
        data,
      });
    } catch (err) {
      next(err);
    }
  },

  updateType: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { groupTypeId, name, image } = req.body;
      const newType = { groupTypeId, name, image };
      const data = await typeServices.updateType(id, newType);
      res.status(200).json({
        status: 200,
        message: 'update a type success',
        data,
      });
    } catch (err) {
      next(err);
    }
  },

  deleteType: async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await typeServices.deleteType(id);
      res.status(200).json({
        status: 200,
        message: 'delete a type success',
        data,
      });
    } catch (err) {
      next(err);
    }
  },
};
