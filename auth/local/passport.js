const passport = require('passport');
const { Strategy } = require('passport-local');
// const mongoose = require('mongoose')
// const User = require('../api/users/user.schema')
const connectDb = require('../../lib/db')

const localAuthenticate = async(User, email, password, done) => {
 console.log('local authenticate with email', email)
 
     
  let user
  let db

    try {
      db = await connectDb()
      user = await User.findOne({
        email: email.toLowerCase()
      })
      console.log("user name is", user.name)
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
          return done(null, false, {
             message: ' Authentication Failed :( '
            });
        } else {
          return done(null, user);
        }
      });
    } catch(e) {
        console.log("error:", e)
        done(e);
    }
     
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