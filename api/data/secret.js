const verify = require('../_util/token/verify');

module.exports = async (req, res) => {
  const decoded = await verify(req);
  console.log(await decoded);
};
