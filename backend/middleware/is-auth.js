const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }
  const [bearer, token] = authHeader.split(" ");
  if (bearer !== 'Bearer' || !token) {
    req.isAuth = false;
    return res.status(401).json({ message: "Invalid token format" });
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } 
  catch (err) {
    req.isAuth = false;
    return res.status(401).json({ message: "Token verification failed", error: err.message });
  }

  if (!decodedToken) {
    req.isAuth = false;
    return res.status(401).json({ message: "Token is invalid" });
  }

  req.isAuth = true;
  req.userId = decodedToken.userId;
  next();
};