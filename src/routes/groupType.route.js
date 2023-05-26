import express from 'express';
import groupTypeController from '../controllers/groupType.controller.js';
const router = express.Router();

//* [GET] /group-types/all/include-type  -> Get all group types include type
router.get('/all/include-type', groupTypeController.getAllGroupTypeIncludeType);

//* [GET] /group-types/all  -> Get all group types
router.get('/all', groupTypeController.getAllGroupType);

//* [GET]  /group-types/:id     -> Get a group type
router.get('/:id', groupTypeController.getOneGroupType);

//* [POST] /group-types/create      -> Create a group type
router.post('/create', groupTypeController.createGroupType);

//* [PUT] /group-types/update   -> Update a group type
router.put('/update/:id', groupTypeController.updateGroupType);

//* [DELETE] /group-types/delete    -> Delete a group type
router.delete('/delete/:id', groupTypeController.deleteGroupType);

export default router;
