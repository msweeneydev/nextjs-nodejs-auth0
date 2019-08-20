const request = require('request-promise');
const cookie = require('cookie');

module.exports = async (req, res) => {
  const options = {
    method: 'GET',
    url: `https://${process.env.AUTH0_DOMAIN}/v2/logout`
  };
  const resp = await request(options);
  const cookieOptions = (http = false) => {
    return {
      httpOnly: http,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      maxAge: Date.now()
    };
  };
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('access', '', cookieOptions(true))
  );
  res.send(resp);
};
