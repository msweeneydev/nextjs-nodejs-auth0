const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

module.exports = async req => {
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
  const { authorization } = req.headers;
  console.log('TOKEN', authorization);
  async function verify() {
    if (authorization) {
      let data;
      const token = authorization.split(' ')[1];
      try {
        jwt.verify(token, getKey, options, function(err, decoded) {
          if (decoded) {
            console.log('DECODED', decoded);
            data = decoded;
          }
          console.log('ERROR', err);
        });
      } catch (err) {
        console.log('ERROR', err);
      }
      return data;
    }
  }
  const result = await verify();
  console.log('RESULT', result);
  return result;
};
