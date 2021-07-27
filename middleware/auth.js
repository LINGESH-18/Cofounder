const jwt = require("jsonwebtoken");
const config = require("config");
function Auth(req, res, next) {
  try {
    var secret = config.get("jwtSecret");
    var token = req.header("token");
    if (!token) {
      return res.status(401).json({ msg: "No token ,authorization failed" });
    }
    var decoded = jwt.verify(token, secret);
    req.user = decoded.user;
    next();
  } catch (err) {
    console.log("error from /middleware/auth");
    console.log(err.message);
    return res.status(501).send(err.messsage);
  }
}
module.exports = Auth;
