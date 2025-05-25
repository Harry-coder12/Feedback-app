const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/feedbackDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Feedback = mongoose.model('Feedback', {
  name: String,
  email: String,
  message: String
});

app.get('/api/feedback', async (req, res) => {
  const feedbacks = await Feedback.find();
  res.json(feedbacks);
});

app.post('/api/feedback', async (req, res) => {
  const newFeedback = new Feedback(req.body);
  await newFeedback.save();
  res.sendStatus(201);
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
