'use strict'


const mutations = require('./mutations')
const queries = require('./queries')
const types = require('./types')

module.exports = {
  Query: queries,
  Mutation: mutations,
  ...types
}
