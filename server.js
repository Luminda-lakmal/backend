const express = require('express');
const app = express();
const port = 3000;
const sequelize = require('./config/db');
const routes = require('./routes'); 
const cors = require('cors');
require('dotenv').config();
// Middleware to parse JSON
app.use(express.json());
app.use(cors());
// Routes
app.use('/api', routes);

// Sync database and start the server
sequelize.sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((error) => console.log(error));