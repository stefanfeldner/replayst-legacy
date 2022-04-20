const User = require('../models/user');
const bcrypt = require('bcrypt');

async function createUser (req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({email});
  if (user) {
    return res.status(409).send({ error: '409', message: 'Wrong credentials' });
  }
  try {
    if (password === '') throw new Error();
    const pswd = await bcrypt.hash(password, 10);
    const newUser = await User.create({ ...req.body, password: pswd });
    res.status(201).send(newUser);
  } catch (err) {
    res.status(400).send({ error, message: 'Error, please retry'});
  }
}

async function addOwnedGame (req, res) {

}

module.exports = { createUser };