module.exports = async (req, res) => {
  res.writeHead(302, {
    Location: `https://${
      process.env.AUTH0_DOMAIN
    }/authorize?response_type=code&audience=${
      process.env.AUTH0_AUDIENCE
    }&client_id=${process.env.AUTH0_CLIENT_ID}&redirect_uri=${
      process.env.AUTH0_REDIRECT_URI
    }/api/auth/callback/&scope=openid%20profile%20email`
  });
  res.end();
};
