require('dotenv').config();
const path = require('path')

const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 3000,
  secrets: {
    // Secret for session, you will want to change this and make it an environment variable
    session: 'mysecret'
  },
  // Root path of server
  root: path.normalize(`${__dirname}`),
};

module.exports = { config };