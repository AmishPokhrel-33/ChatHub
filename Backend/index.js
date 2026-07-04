const express = require("express");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const Feeds = [
  {
    id: 1,
    content:
      "Welcome to ChatsHub! 🎉 This is a student-made anonymous confession page for our college where you can share your thoughts, confessions, crushes, funny moments, opinions, and experiences without revealing your identity. Please be respectful to everyone, avoid hate speech, bullying, fake rumors, or sharing anyone's personal information. Keep the community fun, friendly, and positive. Posts that violate these guidelines may be removed. Enjoy posting and have fun! ❤️",
  },
];

// Add a feed
app.post("/api/feed", (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({
      success: false,
      message: "Content is required",
    });
  }

  const post = {
    id: Date.now(),
    content,
  };

  Feeds.push(post);

  console.log(Feeds);

  res.status(201).json({
    success: true,
    message: "Feed added successfully",
    data: post,
  });
});

// Get all feeds
app.get("/api/feed", (req, res) => {
  res.json(Feeds);
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});