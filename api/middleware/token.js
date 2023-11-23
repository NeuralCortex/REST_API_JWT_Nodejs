const fs = require("fs");
const jwt = require("jsonwebtoken");

const publicKEY = fs.readFileSync("./public.key", "utf8");

const signOptions = {
  expiresIn: "1h",
  algorithm: "RS256"
};

//checkToken uses the public.key to check the token which was created with the private.key on the server.
//checkToken is the middleware to secure the REST API for not authorized users.
const checkToken = function (req, res, next) {
  try {
    var token = req.headers.authorization.split(" ")[1];
    var legit = jwt.verify(token, publicKEY, signOptions);
    next();
  } catch (err) {
    res.sendStatus(401);
  }
};

module.exports = {
  checkToken
};