const express = require('express');
const cors = require('cors');
const path = require('path');


const activityRouter = require('./routes/activity');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

app.use('/api/skills', require('./routes/skills'));
app.use('/api/faculty', require('./routes/faculty'));
app.use('/api/batches', require('./routes/batches'));
app.use('/api/availability', require('./routes/availability'));
app.use('/api/students', require('./routes/students'));
app.use('/api/free-slots', require('./routes/freeSlots'));
app.use('/api/activities', activityRouter);

if (process.env.NODE_ENV === 'production') {
  // Serve the static files from the built frontend
  app.use(express.static(path.join(__dirname, '../spa')));

  // For any other request, send the frontend's index.html file
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../spa/index.html'));
  });
}

app.get('/api/health', (req, res) => {
  res.status(200).send('OK');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});