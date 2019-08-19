module.exports = async (req, res) => {
  res.writeHead(302, {
    Location: `https://${process.env.AUTH0_DOMAIN}/v2/logout?client_id=${
      process.env.AUTH0_CLIENT_ID
    }&returnTo=${process.env.AUTH0_REDIRECT_URI}?logout=true`
  });
  res.end();
};
