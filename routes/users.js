const {Router} = require('express');
const {usersGet, userGetById, userPost, userUpdate, userDelete} = require('../controllers/users');

const router = Router();

router.get('/', usersGet);

router.get('/:_id', userGetById);

router.post('/', userPost);

router.put('/:_id', userUpdate);

router.delete('/:_id', userDelete);

module.exports = router;
