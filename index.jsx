
import dotenv from "dotenv";
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const User = require("./models/User");
const Post = require("./models/Post");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

mongoose.connect("process.env.MONGO_URI");

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(409).json("User already exists");
  await User.create({ username, email, password });
  res.json("Signup successful");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) return res.status(401).json("Invalid credentials");
  res.json({
    _id: user._id,
    username: user.username,
    email: user.email
  });
});

app.post("/create-post", upload.single("media"), async (req, res) => {
  const post = await Post.create({
    userId: req.body.userId,
    username: req.body.username,
    content: req.body.content,
    media: req.file ? `/uploads/${req.file.filename}` : null,
    likes: 0,
    comments: []
  });
  res.json(post);
});

app.get("/posts", async (req, res) => {
  const posts = await Post.find().sort({ _id: -1 });
  res.json(posts);
});

// PUT /like/:postId
app.put("/like/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).send("Post not found");

    post.likes = post.likes || [];
    post.likes.push(req.body.userId || "Anonymous");
    await post.save();

    res.status(200).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});


// POST /comment/:postId
app.post("/comment/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).send("Post not found");

    const comment = {
      username: req.body.username || "Anonymous",
      text: req.body.text,
    };

    post.comments.push(comment);
    await post.save();
    res.status(200).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});


app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});

