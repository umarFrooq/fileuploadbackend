const app = require('./app'); // Use the app from app.js
const connectDB = require('./config/db');
require('dotenv').config();

// It's good practice to ensure DB connection is attempted before starting the server,
// or handle connection errors gracefully. connectDB() is likely async.
// For now, keeping original placement.
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
