import postModel from "../models/postModel.js";
import userModel from "../models/userModel.js";
import likeModel from "../models/likeModel.js";

const createPost = async (req, res) => {
  try {
    const userId = req.userId;
    console.log(req.body);
    const slugTitle = req.body.title;
    const addPost = req.body;
    addPost.user_id = userId || req.body.user_id;
    addPost.slug = slugTitle
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .replace(/-+/g, "-");
    const newPost = await postModel.create(addPost);
    if (newPost) {
      return res
        .status(201)
        .json({ message: "Post created Successfully", newPost });
    }
  } catch (error) {
    return res.status(500).json({ message: "Post creation Failed" });
  }
};

const getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postModel.findByPk(id);
    if (!post) {
      return res.status(409).json({ message: "post not found" });
    }
    return res.status(200).json({ message: "Post found", post });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await postModel.findAll({
      include: [{ model: likeModel }, { model: userModel }]
    });
    if (!posts) {
      return res.status(409).json({ message: "Posts not found" });
    }
    return res.status(200).json({
      message: "Posts returned successfully",
      token: req.token,
      data: posts.length,
      posts
    });
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const updatePost = req.body;
  try {
    const searchId = await postModel.findByPk(id);
    if (!searchId) {
      return res.status(409).json({ message: "Post not found" });
    }
    const updatedPost = await postModel.update(updatePost, {
      where: { id }
    });
    return res
      .status(200)
      .json({ message: "updated Post successful", updatedPost });
  } catch (error) {
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
