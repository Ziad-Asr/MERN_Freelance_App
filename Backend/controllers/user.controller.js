import User from "../models/user.model.js";
// import createError from "../utils/createError.js";
import jwt from "jsonwebtoken";

export const getUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  res.status(200).send(user);
};

export const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (req.userId !== user._id.toString()) {
    return res.status(403).json(`You can delete only your account!`);
  }

  await User.findByIdAndDelete(req.params.id);
  res.status(200).send("deleted.");
};
