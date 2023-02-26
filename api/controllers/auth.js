import User from "../models/User.js";
import bcrypt from "bcrypt";
import createError from "../middleware/createError.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(8);
    const hashPassword = bcrypt.hashSync(req.body.password, salt);

    const user = new User({ ...req.body, password: hashPassword });

    const savedUser = await user.save();
    res.status(200).send(savedUser);
  } catch (error) {
    console.log(error);
    next(createError(500, ""));
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return next(createError(404, "User not found"));
    }

    const validPassword = bcrypt.compareSync(req.body.password, user.password);

    if (!validPassword) {
      return next(createError(400, "Wrong credentials!"));
    }

    const token = jwt.sign(
      { id: user._id, isProvider: user.isProvider },
      process.env.SECRET
    );

    const { password, ...otherDetails } = user._doc;

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .send(otherDetails);
  } catch (error) {
    console.log(error);
    next(createError(500, ""));
  }
};

export const logout = async (req, res, next) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("Logged out successfully");
};
