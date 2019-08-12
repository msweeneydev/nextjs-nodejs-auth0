module.exports = async (req, res) => {
  res.writeHead(302, {
    Location: `https://${process.env.AUTH0_DOMAIN}/v2/logout?client_id=${
      process.env.AUTH0_CLIENT_ID
    }&returnTo=http://localhost:3000`
  });
  res.end();
};
