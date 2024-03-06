const express = require('express');

// Initialize the Express application
const app = express();

// Define the port to run the server on
const PORT = 3000; // INPUT_REQUIRED {Change to a desired port if 3000 is in use}

// Health check route
app.get('/ping', (req, res) => {
  res.status(200).send('Server is healthy');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error encountered:", err.stack);
  res.status(500).send('Something broke!');
});