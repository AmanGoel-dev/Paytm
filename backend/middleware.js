const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({});
  }
  const token = authHeader.split(" ")[1];

  try {
    const verifed = jwt.verify(token, JWT_SECRET);

    if (verifed.userid) {
      req.userId = verifed.userid;
      console.log(verifed.userid);
      console.log("here");
      next();
    }
  } catch (error) {
    return res.status(403).json({
      message: "invalid js webtoken",
    });
  }
};

module.exports = {
  authMiddleware,
};
