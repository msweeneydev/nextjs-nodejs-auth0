const request = require('request-promise');
const cookie = require('cookie');

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
  const cookieOptions = (http = false) => {
    return {
      httpOnly: http,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24,
      sameSite: true
    };
  };
  if (!auth.error) {
    res.setHeader('Set-Cookie', [
      cookie.serialize('id_token', String(auth.id_token), cookieOptions()),
      cookie.serialize(
        'access_token',
        String(auth.access_token),
        cookieOptions(true)
      )
    ]);
    res.setHeader('Location', '/');
    res.status(302).end();
  }
};
