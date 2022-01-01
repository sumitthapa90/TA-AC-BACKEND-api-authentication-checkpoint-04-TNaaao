var jwt = require("jsonwebtoken");

module.exports = {
  verifyToken: async (req, res, next) => {
    let token = req.headers.authorization;
    if (!token) {
      return res.status(200).json({ error: "Token Error" });
    }

    try {
      var payload = await jwt.verify(token, "thisissecret");
      req.user = payload;
      next();
    } catch (error) {
      next(error);
    }
  },
};
