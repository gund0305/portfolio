const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Feedback schema and model
const feedbackSchema = new mongoose.Schema({
    type: String,
    createdAt: { type: Date, default: Date.now }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

// Routes
app.post('/feedback', async (req, res) => {
    try {
        const { type } = req.body;
        if (type !== 'yes' && type !== 'no') {
            return res.status(400).json({ message: 'Invalid feedback type' });
        }
        const feedback = new Feedback({ type });
        await feedback.save();
        res.status(201).json({ message: 'Feedback saved successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
