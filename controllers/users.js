const {v4: uuidv4} = require('uuid');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');

const usersGet = async (req, res) => {
    const {limit = 5} = req.query;

    const [total, users] = await Promise.all([
        User.scan().where('state').eq(true).count().exec(),
        User.scan().where('state').eq(true).limit(Number(limit)).exec()
    ]);

    res.json({
        total,
        users
    });
}

const userGetById = async (req, res) => {
    const {_id} = req.params;
    const user = await User.scan().where('id').eq(_id).exec();

    res.json(user)
}

const userPost = async (req, res) => {
    const {name, email, password} = req.body;
    const id = uuidv4();
    const user = new User({id, name, email, password});

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();
    res.json(user.serialize());
}

const userUpdate = async (req, res) => {
    const {_id} = req.params;
    const {id, state, password, ...info} = req.body;

    // Si el usuario quiere actualizar su password
    if (password) {
        const salt = bcryptjs.genSaltSync();
        info.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.update({'id': _id}, info);
    res.json(user);
}

const userDelete = async (req, res) => {
    const {_id} = req.params;
    const user =  await User.update({'id': _id}, {'state': false});
    res.json(user);
}


module.exports = {
    usersGet,
    userGetById,
    userPost,
    userUpdate,
    userDelete
}