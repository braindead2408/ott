const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB (Replace 'your_database_url' with your MongoDB connection string)
mongoose.connect('mongodb+srv://brainsniper2408:x8ZDkOZaU7wfCObG@overt.ukymbwd.mongodb.net/?retryWrites=true&w=majority&appName=OverT', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define models
const User = mongoose.model('User', {
  username: String,
  email: String,
  password: String,
  thoughts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Thought' }],
  bio: String,
  profilePhoto: String,
});

const ThoughtSchema = new mongoose.Schema({
  text: String,
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [{ text: String, user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } }],
});

const Thought = mongoose.model('Thought', ThoughtSchema);

// Thoughts API
app.post('/api/thoughts', async (req, res) => {
  try {
    const { thought } = req.body;
    const newThought = new Thought({ text: thought });
    await newThought.save();

    res.status(200).json({ message: 'Thought submitted successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Likes API
app.post('/api/thoughts/:thoughtId/like', async (req, res) => {
  try {
    const { userId } = req.body;
    const { thoughtId } = req.params;

    const thought = await Thought.findById(thoughtId);
    if (thought.likes.includes(userId)) {
      return res.status(400).json({ error: 'User already liked this thought' });
    }

    thought.likes.push(userId);
    await thought.save();

    res.status(200).json({ message: 'Thought liked successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Comments API
app.post('/api/thoughts/:thoughtId/comment', async (req, res) => {
  try {
    const { userId, text } = req.body;
    const { thoughtId } = req.params;

    const thought = await Thought.findById(thoughtId);
    thought.comments.push({ text, user: userId });
    await thought.save();

    res.status(200).json({ message: 'Comment added successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// User Signup API
app.post('/api/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// User Login API
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful', userId: user._id });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// User Profile API
app.get('/api/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/api/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { bio, profilePhoto } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.bio = bio;
    user.profilePhoto = profilePhoto;
    await user.save();

    res.status(200).json({ message: 'User profile updated successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
