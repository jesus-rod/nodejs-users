'use strict'

require('dotenv').config()
const { makeExecutableSchema } = require('graphql-tools')
const express = require('express')
const cors = require('cors')
const gqlMiddleware = require('express-graphql')
const { readFileSync } = require('fs')
const { join } = require('path')
const resolvers = require('./lib/resolvers')
//const passport = require('passport')
const { config } = require('./config')
const path = require('path')
const http = require('http')


const port = config.port
const isDev = process.env.NODE_ENV !== 'production'


// definir el schema
const typeDefs = readFileSync(
  join(__dirname, 'lib', 'schema.graphql'),
  'utf-8'
)

const schema = makeExecutableSchema({ typeDefs , resolvers })

const app = express()
app.use(cors())

//require('./config/express').default(app);
app.set('appPath', path.join(config.root, 'frontend'))
console.log(`${app.get('appPath')}`)
require('./routes').MyRoutes(app);

// Middleware defs
////app.use(passport.initialize())
////app.use(passport.session())

app.use('/api', gqlMiddleware({
  schema: schema,
  rootValue: resolvers,
  graphiql: isDev
}))

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}/api`)
})

var server = http.createServer(app);


function startServer() {
  app.angularFullstack = server.listen(port, "localhost", function() {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
}

setImmediate(startServer);


// Expose app
exports = module.exports = app;