const jwt = require('jsonwebtoken')

const [, , option, secret, nameOrToken] = process.argv

if (!option || !secret || !nameOrToken) {
    return console.log("Missing Arguments")
}

function signToken(payload, secret) {
    return jwt.sign(payload, secret)
}

function verifyToken(token, secret) {
    return jwt.verify(token, secret)
}

if (option == 'sign') {
    console.log(signToken({ sub: nameOrToken}, secret))
} else if (option == 'verify') {
    console.log(verifyToken(nameOrToken, secret))
} else {
    console.log('invalid option - use sign or verify')
}