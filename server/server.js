const express = require('express');
const app = express();
const port = 3001;

// Эндпоинт для JSON-ответа
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
}); 