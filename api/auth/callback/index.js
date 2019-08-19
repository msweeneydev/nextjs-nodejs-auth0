const request = require('request-promise');
var cookie = require('cookie');

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
  const cookieOptions = {
    httpOnly: false,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24
  };
  if (!auth.error) {
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('id', String(auth.id_token), cookieOptions)
    );
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('access', String(auth.access_token), cookieOptions)
    );
    res.setHeader('Location', '/');
    res.status(302).end();
  }
};
