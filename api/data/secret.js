const verify = require('../_util/token/verify');

module.exports = async (req, res) => {
  isVerified = (err, decoded) => {
    if (!err) {
      res.send('VERIFIED');
    } else {
      res.send('UNVERIFIED');
    }
  };
  verify(req, isVerified);
};
