const jwt = require("jsonwebtoken");

function jwtChecker(req, res, next) {
    let token;
  const xToken = req.headers["x-access-token"];
  const authHeader = req.headers.authorization;
  if ((!authHeader || !authHeader.startsWith("Bearer")) && !xToken) {
    return res.status(401).json({ error: "Missing token" });
    }
    if (xToken) {
        token = xToken;
    }
    else {
     token = authHeader.split(" ")[1]; // Extract the token from the header
    }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    req.user = { user: decoded };
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }
    next();
  });
}

module.exports = {
  jwtChecker,
};
