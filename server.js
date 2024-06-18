const express = require('express');
const app = express();
const port = 3000;
const sequelize = require('./config/db');
const routes = require('./routes'); 
require('dotenv').config();
// Middleware to parse JSON
app.use(express.json());

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