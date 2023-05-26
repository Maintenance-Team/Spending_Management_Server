import groupTypeServices from '../services/groupType.services.js';

export default {
  getAllGroupTypeIncludeType: async (req, res, next) => {
    try {
      const data = await groupTypeServices.getAllGroupTypeIncludeType();
      res.status(200).json({
        status: 200,
        message: 'get all groupType include type success',
        data,
      });
    } catch (err) {
      next(err);
    }
  },

  getAllGroupType: async (req, res, next) => {
    try {
      const data = await groupTypeServices.getAllGroupType();
      res.status(200).json({
        status: 200,
        message: 'get all group type success',
        data,
      });
    } catch (err) {
      next(err);
    }
  },

  getOneGroupType: async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await groupTypeServices.getGroupTypeById(id);
      res.status(200).json({
        status: 200,
        message: 'get a group type success',
        data,
      });
    } catch (err) {
      next(err);
    }
  },

  createGroupType: async (req, res, next) => {
    try {
      const { type, groupName } = req.body;
      const data = await groupTypeServices.createNewGroupType(type, groupName);
      res.status(201).json({
        status: 201,
        message: 'create new group type success',
        data,
      });
    } catch (err) {
      next(err);
    }
  },

  updateGroupType: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { type, groupName } = req.body;
      const data = await groupTypeServices.updateGroupType(id, type, groupName);
      res.status(200).json({
        status: 200,
        message: 'update a group type success',
        data,
      });
    } catch (err) {
      next(err);
    }
  },

  deleteGroupType: async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await groupTypeServices.deleteGroupType(id);
      res.status(200).json({
        status: 200,
        message: 'delete a group type success',
        data,
      });
    } catch (err) {
      next(err);
    }
  },
};
