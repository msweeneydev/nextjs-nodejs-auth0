const verify = require('../_util/token/verify');

module.exports = async (req, res) => {
  isVerified = (err, decoded) => {
    if (!err) {
      res.send("You're logged in via Auth0!");
    } else {
      res.send('Log in so I can tell you my secret!');
    }
  };
  verify(req, isVerified);
};
