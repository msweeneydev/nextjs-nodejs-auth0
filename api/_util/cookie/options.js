module.exports = (http = false) => {
  return {
    httpOnly: http,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24,
    sameSite: true
  };
};
