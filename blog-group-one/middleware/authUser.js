import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();
const jwtSecret = process.env.ACCESS_TOKEN_SECRET;

const authentication = async (req, res, next) => {
  try {
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
    const tokenVariables = {
      id: findUser.id,
      email: loginInfo.email,
      username: loginInfo.username
    };
    const userToken = jwt.sign(tokenVariables, jwtSecret, {
      expiresIn: "48hr"
    });
    req.token = userToken;
    req.user = findUser;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Unable to login" });
  }
};

const verifyAuth = async (req, res, next) => {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.status(401).json({ message: "no token found" });
    }
    const decodedToken = jwt.verify(token, jwtSecret);
    if (decodedToken) {
      req.userId = decodedToken.id;
    }
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "server error, authentication failed" });
  }
};

export default { authentication, verifyAuth };
