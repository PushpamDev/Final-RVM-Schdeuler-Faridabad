const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: './backend/.env' });

const studentsRouter = require('./routes/students');
const availabilityRouter = require('./routes/availability');
const freeSlotsRouter = require('./routes/freeSlots');
const activityRouter = require('./routes/activity');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/skills', require('./routes/skills'));
app.use('/api/faculty', require('./routes/faculty'));
app.use('/api/batches', require('./routes/batches'));
app.use('/api/availability', require('./routes/availability'));
app.use('/api/students', require('./routes/students'));
app.use('/api/free-slots', require('./routes/freeSlots'));
app.use('/api/activities', activityRouter);

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