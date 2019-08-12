module.exports = async (req, res) => {
  res.writeHead(302, {
    Location: `https://${
      process.env.AUTH0_DOMAIN
    }/authorize?response_type=code&client_id=${
      process.env.AUTH0_CLIENT_ID
    }&redirect_uri=http://localhost:3000/api/auth/callback/&audience=${
      process.env.AUTH0_AUDIENCE
    }&scope=openid%20profile%20email`
  });
  res.end();
};
