const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const personRoutes = require('./routes/personRoutes');
const { loginAdmin } = require('./middleware/auth');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.post('/api/login', loginAdmin);
app.use('/api/people', personRoutes);

// Connect DB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/orgdb')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 8500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));