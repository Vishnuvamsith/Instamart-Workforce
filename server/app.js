// backend/app.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5002;

// Middlewares
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Routes
const mpSnapshotRoute = require('./routes/mpSnapshot');
const attendanceUploadRoute = require('./routes/attendanceUpload');

app.use('/api/mp-snapshot', mpSnapshotRoute);
app.use('/api/attendance', attendanceUploadRoute);

// Root ping
app.get('/', (req, res) => {
  res.send('Instamart Workforce Analytics Backend is running 🚀');
});

app.listen(PORT, () => {
  console.log(`✅ Server listening on http://localhost:${PORT}`);
});
