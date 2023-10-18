import userModel from "../models/userModel.js";
import postModel from "../models/postModel.js";
import likeModel from "../models/likeModel.js";
import bcrypt from "bcryptjs";

//signing up for a user or loging
const registerUser = async (req, res) => {
  try {
    const addUser = req.body;
    const password = addUser.password;
    const hashPassword = await bcrypt.hash(password, 10);
    addUser.password = hashPassword;

    // checking if admin is create already with the email.

    const email = addUser.email;
    const existingUser = await userModel.findOne({ where: { email } });
    if (existingUser) {
      res.status(409).json({ message: "sorry user is already exist" });
      return;
    }

    const createUser = await userModel.create(addUser);
    if (createUser) res.status(201).json({ message: "User creat" });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unable to connect to the server", error });
    return;
  }
};

// get a one user

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const getUser = await userModel.findOne({
      where: { id },
      include: [{ model: postModel }, { model: likeModel }]
    });
    if (!getUser) {
      res.status(409).json({ message: "User can not be found" });
      return;
    } else {
      if (getUser) res.status(201).json({ message: "Successfull", getUser });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Uable able to to the serve", error });
    return;
  }
};

//user login

const loginUser = async (req, res) => {
  const token = req.token;
  const userDetails = req.body;
  const postgroup = await post.findAll({ include: [{ model: user }] });
  if (userDetails) {
    res.status(200).json({ message: "login successful", token, postgroup });
  }
};

//get all user

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
      res.status(409).json({
        message: "Successfull",
        data: getAllusers.length,
        getAllusers
      });
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unable to connect to the server" });
  }
};

// update user;

const updateUser = async (req, res) => {
  const updateUs = req.body;
  const { id } = req.params;
  try {
    const UserInformmation = await userModel.findByPk(id);

    if (!UserInformmation) {
      res.status(201).json({ message: "User is not found " });
      return;
    }

    const Updatedformat = await userModel.update(updateUs, { where: { id } });
    if (Updatedformat) {
      res.status(409).json({ message: "Successful" });
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "unable to connect to server", error });
  }
};

// delete a user

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
    console.log(error);
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
  deleteUser
};
