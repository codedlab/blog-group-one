import userModel from "../models/userModel.js";
import postModel from "../models/postModel.js";
import likeModel from "../models/likeModel.js";
import bcrypt from "bcryptjs";

const registerUser = async (req, res) => {
  try {
    const addUser = req.body;
    const password = addUser.password;
    const hashPassword = await bcrypt.hash(password, 10);
    addUser.password = hashPassword;
    const email = addUser.email;
    const existingUser = await userModel.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: "sorry user is already exist" });
    }
    const createUser = await userModel.create(addUser);
    if (createUser) return res.status(201).json({ message: "User created" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Unable to connect to the server", error });
  }
};

const userPost = async (req, res) => {
  const userId = req.userId;
  const posts = await postModel.findAll({
    where: { user_id: userId },
    include: [{ model: likeModel }, { model: userModel }]
  });
  const user = await userModel.findOne({
    where: { id: userId },
    attributes: {
      exclude: ["password", "id", "createdAt", "updatedAt", "deletedAt"]
    }
  });
  res.status(200).json({ user, data: posts });
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const getUser = await userModel.findByPk(id, {
      include: [
        {
          model: postModel,
          include: [{ model: likeModel }]
        }
      ]
    });
    if (!getUser) {
      return res.status(409).json({ message: "User can not be found" });
    }
    return res.status(201).json({ message: "Successfull", getUser });
  } catch (error) {
    res.status(500).json({ message: "Uable able to to the serve", error });
    return;
  }
};

const loginUser = async (req, res, next) => {
  const token = req.token;
  const userDetails = req.body;
  next();
};

const getallUser = async (req, res) => {
  try {
    const getAllusers = await userModel.findAll({
      include: [
        {
          model: postModel,
          include: [{ model: likeModel }]
        }
      ]
    });
    if (getAllusers) {
      return res.status(201).json({
        message: "Successfull",
        data: getAllusers.length,
        getAllusers
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Unable to connect to the server" });
  }
};

const updateUser = async (req, res) => {
  const updateUs = req.body;
  const { id } = req.params;
  try {
    const UserInformmation = await userModel.findByPk(id);
    if (!UserInformmation) {
      return res.status(409).json({ message: "User is not found " });
    }
    const Updatedformat = await userModel.update(updateUs, { where: { id } });
    if (Updatedformat) {
      return res.status(200).json({ message: "Successful" });
    }
  } catch (error) {
    res.status(500).json({ message: "unable to connect to server", error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const existingUser = await userModel.findByPk(id);
    if (!existingUser) {
      return res.status(409).json({ message: "User does not exit" });
    }
    const deleteUs = await userModel.destroy({ where: { id } });
    if (deleteUs) {
      return res.status(201).json({ message: "User deleted", deleteUs });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "unable to connect to the server", error });
  }
};

export default {
  registerUser,
  getUser,
  loginUser,
  getallUser,
  updateUser,
  deleteUser,
  userPost
};
