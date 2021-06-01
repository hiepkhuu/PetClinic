const db = require('./db/models')

const loginUser = (req, res, user) => {
  req.session.auth = {
    userId: user.id,
  };
};

const logoutUser = (req, res) => {
  delete req.session.auth;
};

const restoreUser = (req, res, next) => {
  // token being parsed from request header by the bearerToken middleware
  // function in app.js:
  const { token } = req;

  if (!token) {
    // Send a "401 Unauthorized" response status code
    // along with an "WWW-Authenticate" header value of "Bearer".
    return res.set("WWW-Authenticate", "Bearer").status(401).end();
  }

  return jwt.verify(token, secret, null, async (err, jwtPayload) => {
    if (err) {
      err.status = 401;
      return next(err);
    }

    const { id } = jwtPayload.data;

    try {
      req.user = await User.findByPk(id);
    } catch (e) {
      return next(e);
    }

    if (!req.user) {
      // Send a "401 Unauthorized" response status code
      // along with an "WWW-Authenticate" header value of "Bearer".
      return res.set("WWW-Authenticate", "Bearer").status(401).end();
    }

    return next();
  });
};

module.exports = {
  loginUser,
  restoreUser,
  logoutUser,
};
