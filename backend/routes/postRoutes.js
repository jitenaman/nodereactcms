const express = require("express");
const { getPosts, getPostById, createPost, updatePost, deletePost } = require("../controllers/postController");
const auth = require("../middleware/auth");
const multer = require("multer");
const path = require("path");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// GET paginated posts
router.get("/", getPosts);

// ✅ GET single post by id
router.get("/:id", getPostById);

// POST / PUT / DELETE
router.post("/", auth, upload.single("image"), createPost);
router.put("/:id", auth, upload.single("image"), updatePost);
router.delete("/:id", auth, deletePost);

module.exports = router;
