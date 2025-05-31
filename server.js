// const app = require('./app');
const connectDB = require('./config/db');
require('dotenv').config();
connectDB();
let express=require('express')
const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
