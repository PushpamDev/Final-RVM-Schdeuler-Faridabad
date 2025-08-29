const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: './backend/.env' });

const activityRouter = require('./routes/activity');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
try {
  app.use('/api/skills', require('./routes/skills'));
} catch (e) {
  console.error('Error loading skills route', e);
  throw e;
}
try {
  app.use('/api/faculty', require('./routes/faculty'));
} catch (e) {
  console.error('Error loading faculty route', e);
  throw e;
}
try {
  app.use('/api/batches', require('./routes/batches'));
} catch (e) {
  console.error('Error loading batches route', e);
  throw e;
}
try {
  app.use('/api/availability', require('./routes/availability'));
} catch (e) {
  console.error('Error loading availability route', e);
  throw e;
}
try {
  app.use('/api/students', require('./routes/students'));
} catch (e) {
  console.error('Error loading students route', e);
  throw e;
}
try {
  app.use('/api/free-slots', require('./routes/freeSlots'));
} catch (e) {
  console.error('Error loading free-slots route', e);
  throw e;
}
try {
  app.use('/api/activities', activityRouter);
} catch (e) {
  console.error('Error loading activities route', e);
  throw e;
}

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

app.get('/api/health', (req, res) => {
  res.status(200).send('OK');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});