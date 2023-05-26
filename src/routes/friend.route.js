import express from 'express';
import friendController from '../controllers/friend.controller.js';
const router = express.Router();

//* [GET] /friends/all/:id  -> Get all friend of user
router.get('/all-of-user/:userId', friendController.getAllFriendOfUser);

//* [GET] /friends/:id      -> Get a friend by id
router.get('/:id', friendController.getFriend);

//* [POST] /friends/create      -> create new friend
router.post('/create', friendController.createFriend);

//* [PUT] /friends/update/:id   -> update a friend by id
router.put('/update/:id', friendController.updateFriend);

//* [DELETE] /friends/:id       -> delete a friend by id
router.delete('/delete/:id', friendController.deleteFriend);

export default router;
