const Post = require("../models/Post");

// GET /api/posts?page=1&limit=5
const getPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const total = await Post.countDocuments();
    const posts = await Post.find()
      .sort({ _id: -1 }) // sort newest first
      .skip(skip)
      .limit(limit);

    res.json({
      posts,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const createPost = async (req, res) => {
  try {
    const post = await Post.create({
      title: req.body.title,
      content: req.body.content,
      image: req.file ? req.file.filename : null,
    });
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = {
      title: req.body.title,
      content: req.body.content,
    };
    if (req.file) updatedData.image = req.file.filename;

    const post = await Post.findByIdAndUpdate(id, updatedData, { new: true });
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await Post.findByIdAndDelete(id);
    res.json({ message: "Post deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};


module.exports = {
  getPosts,
  createPost,
  getPostById, // ✅ add this
  updatePost,
  deletePost,
};
