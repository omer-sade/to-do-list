const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

const taskRoutes = require('./routes/taskRoutes');

dotenv.config(); // Load environment variables from a .env file

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));



// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Default route
app.get('/', (req, res) => {
    res.send('Backend is running!');
});


app.use('/api/tasks', taskRoutes); 

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
