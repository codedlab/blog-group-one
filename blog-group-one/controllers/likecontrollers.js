import likeModel from "../models/likeModel.js";

const registerlike = async (req, res) => {
  try {
    const addLike = req.body;
    const userId = req.userId;
    addLike["user_id"] = userId;
    const newlike = await likeModel.create(addLike);
    if (newlike) {
      return res.status(201).json({ message: "succesfully liked" });
    }
  } catch (error) {
    return res.status(500).json({ message: "unable to like" });
  }
};

const getAlllikes = async (req, res) => {
  try {
    const likes = await likeModel.findAll();
    if (!likes) {
      return res.status(409).json({ message: " likes not found" });
    }
    return res
      .status(200)
      .json({ message: "sucessful", data: likes.length, likes });
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};

const deletelike = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(409).json({ message: "like not  found" });
    }
    const deletedlike = await likeModel.destroy({ where: { id } });
    return res
      .status(200)
      .json({ message: "delete successfully", deletedlike });
  } catch (error) {
    return res.status(500).json({ message: "unable to delete like" });
  }
};

export default { registerlike, getAlllikes, deletelike };
