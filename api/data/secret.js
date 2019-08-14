const verify = require('../_util/token/verify');

module.exports = async (req, res) => {
  const decoded = await verify(req);
  await console.log(decoded);
};
