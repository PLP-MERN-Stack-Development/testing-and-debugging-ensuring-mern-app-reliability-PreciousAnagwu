const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const bugsRoutes = require('./routes/bugs');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/bugs', bugsRoutes);
app.use(errorHandler);

module.exports = app;

// If run directly, start listener (index.js will be used in production)
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mern-bug-tracker';
  mongoose.connect(MONGO_URI).then(() => app.listen(PORT, ()=>console.log('listening')));
}

module.exports = app;