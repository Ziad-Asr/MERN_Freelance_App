import jwt from "jsonwebtoken";
// import createError from "../utils/createError.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).send("You are not authenticated!");

  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    if (err) return res.status(403).send("Token is not valid!");

    // Assign the id ( [userId] or [gigId] or .... ) in the request to access it from the controller function after this
    req.userId = payload.id;
    req.isSeller = payload.isSeller;
    next();
  });
};