var jwt = require('jsonwebtoken');
var jwksClient = require('jwks-rsa');

module.exports = async token => {
  console.log('TOKENNNNNNNNN', Buffer.from(token, 'base64').toString());
  var client = jwksClient({
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  });
  function getKey(header, callback) {
    client.getSigningKey(header.kid, function(err, key) {
      var signingKey = key.publicKey || key.rsaPublicKey;
      callback(null, signingKey);
    });
  }
  var options = { algorithms: ['RS256'] };
  const payload = await jwt.verify(token, getKey, options);
  await console.log('PAYLOAD', payload);
};
