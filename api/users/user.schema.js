const mongoose = require('mongoose')
const crypto = require('crypto');

const authTypes = ['github', 'facebook', 'google'];


var UserSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true
    },
    lastname: { 
        type: String,
    },
    email: { 
        type: String,
        required: true
    }, 
    password: { 
        type: String,
        required: true
    },
    level: {
        type: String,
        enum: ["superadmin", "admin", "regular"],
        default: "regular"
    },
    salt: String

})

var validatePresenceOf = function(value) {
    return value && value.length;
  };

/**
 * Pre-save hook
 */
UserSchema
  .pre('save', function(next) {
    // Handle new/update passwords
    if(!this.isModified('password')) {
      return next();
    }

    if(!validatePresenceOf(this.password)) {
      if(authTypes.indexOf(this.provider) === -1) {
        return next(new Error('Invalid password'));
      } else {
        return next();
      }
    }

    // Make salt with a callback
    this.makeSalt((saltErr, salt) => {
      if(saltErr) {
        return next(saltErr);
      }
      this.salt = salt;
      this.encryptPassword(this.password, (encryptErr, hashedPassword) => {
        if(encryptErr) {
          return next(encryptErr);
        }
        this.password = hashedPassword;
        return next();
      });
    });
  });

UserSchema.methods = {
    /**
     * Authenticate - check if the passwords are the same
     *
     * @param {String} password
     * @param {Function} callback
     * @return {Boolean}
     * @api public
     */
    authenticate(password, callback) {
      if(!callback) {
        return this.password === this.encryptPassword(password);
      }
  
      this.encryptPassword(password, (err, pwdGen) => {
        console.log(password)
        if(err) {
          return callback(err);
        }
        
        // if(this.password === pwdGen) { 
        if(this.password === password) {
           console.log("try that");
          return callback(null, true);
        } else {
          console.log("try this");
          return callback(null, false);
        }
      });
    },
  
    /**
     * Make salt
     *
     * @param {Number} [byteSize] - Optional salt byte size, default to 16
     * @param {Function} callback
     * @return {String}
     * @api public
     */
    makeSalt(byteSize, callback) {
      var defaultByteSize = 16;
  
      if(typeof arguments[0] === 'function') {
        callback = arguments[0];
        byteSize = defaultByteSize;
      } else if(typeof arguments[1] === 'function') {
        callback = arguments[1];
      } else {
        throw new Error('Missing Callback');
      }
  
      if(!byteSize) {
        byteSize = defaultByteSize;
      }
  
      return crypto.randomBytes(byteSize, (err, salt) => {
        if(err) {
          return callback(err);
        } else {
          return callback(null, salt.toString('base64'));
        }
      });
    },
  
    /**
     * Encrypt password
     *
     * @param {String} password
     * @param {Function} callback
     * @return {String}
     * @api public
     */
    encryptPassword(password, callback) {
      if(!password || !this.salt) {
        if(!callback) {
          return null;
        } else {
          return callback('Missing password or salt');
        }
      }
  
      var defaultIterations = 10000;
      var defaultKeyLength = 64;
      var salt = new Buffer.alloc(10, false, 'base64');
  
      if(!callback) {
        return crypto.pbkdf2Sync(password, salt, defaultIterations, defaultKeyLength)
          .toString('base64');
      }
  
      return crypto.pbkdf2(password, salt, defaultIterations, defaultKeyLength, 'sha256', (err, key) => {
        if(err) {
          return callback(err);
        } else {
          return callback(null, key.toString('base64'));
        }
      });
    }
  };

class User extends mongoose.Model {}
module.exports = mongoose.model(User, UserSchema, 'user');