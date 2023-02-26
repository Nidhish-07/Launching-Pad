import jwt from "jsonwebtoken";
import createError from "./createError.js";

const verifyToken = async (req, res, next) => {
  const token = req.cookie.access_token;

  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }

  jwt.verify(token, process.env.SECRET, async (err, data) => {
    if (err) {
      return createError(403, "Invalid token");
    }
    req.userId = data.userId;
    req.isProvider = data.isProvider;
    next();
  });
};

export default verifyToken;
