const request = require('request-promise');

module.exports = async (req, res) => {
  const options = {
    method: 'POST',
    url: `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    form: {
      grant_type: 'authorization_code',
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      code: req.query.code,
      redirect_uri: `${process.env.AUTH0_REDIRECT_URI}/api/auth/callback/`
    },
    json: true
  };
  const auth = await request(options);
  if (!auth.error) {
    res.writeHead(302, {
      Location: `/?id=${auth.id_token}&token=${auth.access_token}`
    });
    res.end();
  }
};
