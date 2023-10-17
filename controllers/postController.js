import postModel from "../models/postModel.js";
// import { v4 as uuidv4 } from "uuidv4";

//create a post

const createPost = async (req, res) => {
  try {
    const addPost = req.body;
    const newPost = await postModel.create(addPost);
    if (newPost) {
      return res
        .status(201)
        .json({ message: "Post created Successfully", newPost });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Post creation Failed" });
  }
};

//get a Post

const getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postModel.findByPk(id);
    if (!post) {
      return res.status(409).json({ message: "post not found" });
    }
    return res.status(200).json({ message: "Post found", post });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

// get all posts

const getAllPosts = async (req, res) => {
  try {
    const posts = await postModel.findAll();
    if (!posts) {
      return res.status(409).json({ message: "Posts not found" });
    }
    return res
      .status(200)
      .json({ message: "Posts returned successfully", posts });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
};

//update single post
const updatePost = async (req, res) => {
  const { id } = req.params;
  const updatePost = req.body;
  try {
    const searchId = await postModel.findByPk(id);
    if (!searchId) {
      return res.status(409).json({ message: "Post not found" });
    }
    const updatedPost = await postModel.update(updatePost, { where: { id } });
    return res
      .status(200)
      .json({ message: "updated Post successful", updatedPost });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(409).json({ message: "Post not found" });
    }
    const deletedPost = await postModel.destroy({ where: { id } });
    return res
      .status(200)
      .json({ message: "deleted successfully", deletedPost });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
};

export default {
  createPost,
  getPost,
  getAllPosts,
  updatePost,
  deletePost
};
