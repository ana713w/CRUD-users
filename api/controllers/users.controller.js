const createError = require('http-errors');
const User = require('../models/users.model');

module.exports.create = (req, res, next) => {
    const { email } = req.body;
    User.findOne({ email })
      .then((user) => {
        if (user) {
          next(createError(400, { message: 'User email already taken', errors: { email: 'Already exists' }}));
        } else {
          return User.create(req.body)
            .then((user) => res.status(201).json(user))
        }
      })
      .catch((error) => next(error))
}

module.exports.update = (req, res, next) => {
    const { id } = req.params;
    const { password } = req.body;

    User.findById(id)
        .then((user) => {
            if (!user) next(createError(404, 'Event not found'));
            
            if (password && password === user.password ) next(createError(400, 'New password cannot be the same as the current password'));
            
            
        })
        .catch((error) => next(error));
}

