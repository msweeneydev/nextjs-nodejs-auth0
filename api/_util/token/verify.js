const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

module.exports = (token, callback) => {
  const client = jwksClient({
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  });
  function getKey(header, callback) {
    client.getSigningKey(header.kid, function(err, key) {
      const signingKey = key.publicKey || key.rsaPublicKey;
      callback(null, signingKey);
    });
  }
  const options = {
    algorithms: ['RS256'],
    maxAge: '1 day'
  };
  if (!!token.length) {
    try {
      jwt.verify(token, getKey, options, callback);
    } catch (err) {
      callback(err);
    }
  } else {
    callback(true);
  }
};
