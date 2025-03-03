const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const { user_token } = req.cookies;
    if (!user_token) {
      return res.send({ success: false, message: "Not Authorized" });
    }
    const decode_token = jwt.verify(user_token, process.env.JWT_SECRET);
    req.body.userId = decode_token.id;
    next();
  } catch (error) {
    console.log(error);
    res.status(201).send({ message: "Auth failed!", success: false });
  }
};
