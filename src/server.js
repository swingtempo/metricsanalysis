const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, '..', 'public')));

// Serve CSV files from the project root
app.get('/metrics.csv', (req, res) => {
  const csvPath = path.join(__dirname, '..', 'metrics.csv');
  if (fs.existsSync(csvPath)) {
    res.sendFile(csvPath);
  } else {
    res.status(404).json({ error: 'metrics.csv not found' });
  }
});

// List available CSV files
app.get('/api/files', (req, res) => {
  const dir = path.join(__dirname, '..');
  const files = fs.readdirSync(dir)
    .filter(f => f.endsWith('.csv'))
    .map(f => ({ name: f, size: fs.statSync(path.join(dir, f)).size }));
  res.json(files);
});

app.listen(PORT, () => {
  console.log(`\n  Metrics Viewer running at http://localhost:${PORT}\n`);
});
