const request = require('request-promise');

module.exports = async (req, res) => {
  const options = {
    method: 'GET',
    url: `https://${process.env.AUTH0_DOMAIN}/v2/logout`
  };
  const resp = await request(options);
  res.send(resp);
};
