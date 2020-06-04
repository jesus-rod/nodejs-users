/**
 * Main application routes
 */

'use strict';

const errors = require('./components/errors');
const path = require('path');
const bodyParser = require('body-parser')

const MyRoutes = function(app) {
  // Insert routes below
  // parse application/json
  app.use(bodyParser.json());
  app.use('/apix/users', require('./api/users'));
  app.use('/primertutorial/posts', require('./api/posts'));

  app.use('/auth', require('./auth').router);

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(`${app.get('appPath')}/index.html`));
    });
}


module.exports = { MyRoutes };