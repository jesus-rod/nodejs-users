const passport = require('passport');
const {Strategy} = require('passport-local');

function localAuthenticate(User, email, password, done) {
  User.findOne({
    email: email.toLowerCase()
  }).exec()
    .then(user => {
      if(!user) {
        return done(null, false, {
          message: 'Este correo no se encuentra registrado en el sistema.'
        });
      }
      user.authenticate(password, function(authError, authenticated) {
        if(authError) {
          return done(authError);
        }
        if(!authenticated) {
          return done(null, false, { message: 'Clave errada.' });
        } else {
          return done(null, user);
        }
      });
    })
    .catch(err => done(err));
}

const setup = function setup(User) {
  passport.use(new Strategy({
    usernameField: 'email',
    passwordField: 'password' // this is the virtual field on the model
  }, function(email, password, done) {
    return localAuthenticate(User, email, password, done);
  }));
}

module.exports = { setup }