'use strict'

require('dotenv').config()
const { makeExecutableSchema } = require('graphql-tools')
const express = require('express')
const cors = require('cors')
const gqlMiddleware = require('express-graphql')
const { readFileSync } = require('fs')

const resolvers = require('./lib/resolvers')
const { config } = require('./config')
const { join } = require('path')
const connectDb = require('./lib/db')
const errorHandler = require('./lib/errorHandler')


const port = config.port
const isDev = process.env.NODE_ENV !== 'production'

const app = express()
app.use(cors())

//conectarse a base de datos
connectDb()

try {
  connectDb()
} catch (error) {
  errorHandler(error)
}

// definir el schema
const typeDefs = readFileSync(
  join(__dirname, 'lib', 'schema.graphql'),
  'utf-8'
)
const schema = makeExecutableSchema({ typeDefs , resolvers })

// Define el path de nuestra app (hacia el frontend)
app.set('appPath', join(config.root, 'frontend'))

// Define nuestro GraphQL -> schema, resolvers y GUI
app.use('/api', gqlMiddleware({
  schema: schema,
  rootValue: resolvers,
  graphiql: isDev
}))

// Define el resto de las rutas en nuestra aplicacion
require('./routes').MyRoutes(app);



app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}/api`)
})
