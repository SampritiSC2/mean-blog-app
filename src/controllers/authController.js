const User = require('../models/user');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).send({
        error: 'Email is required',
      });
    }
    if (!password) {
      return res.status(400).send({
        error: 'Password is required',
      });
    }
    const user = await User.findByEmailAndPassword(email, password);
    const token = await user.generateJWTToken();
    res.send({
      user,
      token,
    });
  } catch (e) {
    res.status(400).send({
      error: e.message,
    });
  }
};

const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).send({
        error: 'Email is required',
      });
    }
    if (!password) {
      return res.status(400).send({
        error: 'Password is required',
      });
    }
    const user = new User({ email, password });
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send({
      error: e.message,
    });
  }
};

const logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((tkn) => tkn.token !== req.token);
    await req.user.save();
    res.send({
      message: 'Logout Successfull',
    });
  } catch (e) {
    res.status(500).send({
      error: e.message,
    });
  }
};

module.exports = {
  login,
  signup,
  logout,
};
