'use strict'

function erroHandler(error) {
  console.error(error);
  throw new Error('Fallo en operacion del servidor')
}

module.exports = erroHandler
