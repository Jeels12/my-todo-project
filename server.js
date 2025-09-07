const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/tododb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Schema & Model
const todoSchema = new mongoose.Schema({
  itemName: String,
  itemDescription: String
});
const TodoItem = mongoose.model('TodoItem', todoSchema);

// POST route to accept To-Do items
app.post('/submittodoitem', async (req, res) => {
  const { itemName, itemDescription } = req.body;
  try {
    const newItem = new TodoItem({ itemName, itemDescription });
    await newItem.save();
    res.status(201).send({ message: 'Item saved successfully' });
  } catch (err) {
    res.status(500).send({ error: 'Failed to save item' });
  }
});

// Start server
app.listen(3000, () => console.log('Server running on port 3000'));
