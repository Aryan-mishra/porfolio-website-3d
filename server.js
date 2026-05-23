import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve ES module paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS and JSON parsing middlewares
app.use(cors());
app.use(express.json());

// Path to store messages database
const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'messages.json');

// Ensure database file directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR);
}

// Initialize JSON database array if not present
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify([], null, 2));
}

// API endpoint to receive contact messages
app.post('/api/contact', (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate inputs
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required fields.' });
    }

    // Read existing messages
    const data = fs.readFileSync(DB_FILE, 'utf8');
    const messages = JSON.parse(data || '[]');

    // Append new message payload
    const newMessage = {
      id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
      name,
      email,
      subject: subject || 'No Subject',
      message,
      timestamp: new Date().toISOString()
    };

    messages.push(newMessage);

    // Save back to JSON file
    fs.writeFileSync(DB_FILE, JSON.stringify(messages, null, 2));
    
    console.log(`[Uplink Received] Message from ${name} (${email}) saved.`);
    return res.status(200).json({ success: true, message: 'Message logged successfully.' });

  } catch (error) {
    console.error('Error writing database file:', error);
    return res.status(500).json({ error: 'Server database read/write exception.' });
  }
});

// API endpoint to retrieve messages (Internal diagnostics, can be secured)
app.get('/api/messages', (req, res) => {
  try {
    if (!fs.existsSync(DB_FILE)) {
      return res.status(200).json([]);
    }
    const data = fs.readFileSync(DB_FILE, 'utf8');
    return res.status(200).json(JSON.parse(data || '[]'));
  } catch (error) {
    console.error('Error reading database file:', error);
    return res.status(500).json({ error: 'Server database read exception.' });
  }
});

// Serve compiled static files in production
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

// Fallback catch-all middleware for single page application routing
app.use((req, res) => {
  const indexFile = path.join(distPath, 'index.html');
  if (fs.existsSync(indexFile)) {
    res.sendFile(indexFile);
  } else {
    res.status(404).send('Vite production build files not found. Run "npm run build" first.');
  }
});

app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`🚀 Ravanji Analytics Portfolio server is active.`);
  console.log(`PORT: ${PORT}`);
  console.log(`API endpoints ready: /api/contact, /api/messages`);
  console.log(`Serving static client files from: ${distPath}`);
  console.log(`===============================================`);
});
