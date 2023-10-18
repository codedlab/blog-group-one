import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const authentication = async (req, res, next) => {
  try {
    const jwtSecret = process.env.ACCESS_TOKEN_SECRET;
    const loginInfo = req.body;
    const email = loginInfo.email;
    const findUser = await userModel.findOne({ where: { email } });
    if (!findUser) {
      return res.status(401).json({ message: "invalid credentials" });
    }
    const passwordMatch = await bcryptjs.compare(
      loginInfo.password,
      findUser.password
    );
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    const userToken = jwt.sign(loginInfo, jwtSecret, { expiresIn: "48hr" });
    req.token = userToken;
    req.user = findUser;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Unable to login" });
  }
};

export default authentication;
