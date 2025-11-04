const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import DB connection
require('./dbConfig/connection');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/', require('./app'));

// Root route to test deployment
app.get('/', (req, res) => {
  res.json({ message: '🚀 Server is running successfully!' });
});

// Use dynamic port for Render
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`✅ Server started successfully on port ${PORT}`);
});
