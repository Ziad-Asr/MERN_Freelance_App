import User from "../models/user.model.js";
// import createError from "../utils/createError.js";
import jwt from "jsonwebtoken";

export const getUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  res.status(200).send(user);
};

// export const deleteUser = async (req, res) => {
//   const user = await User.findById(req.params.id);

//   if (req.userId !== user._id.toString()) {
//     return res.status(403).json(`You can delete only your account!`);
//   }

//   await User.findByIdAndDelete(req.params.id);
//   res.status(200).send("deleted.");
// };

export const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  const token = req.cookies.accessToken;
  if (!token) {
    res.status(401).send("You are not authenticated");
  }

  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    if (payload?.id != user?._id) {
      return res.status(403).send("You can delete only your account");
    } else {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).send("Deleted.");
    }
  });
};
