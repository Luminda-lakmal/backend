const express = require('express');
const app = express();
const port = 3000;
const sequelize = require('./config/db');
const userRoutes = require('./routes/index');

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api', userRoutes);

// Sync database and start the server
sequelize.sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((error) => console.log(error));