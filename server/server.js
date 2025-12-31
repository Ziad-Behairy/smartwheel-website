import express from 'express';
import cors from 'cors';
import { WebSocketServer } from 'ws';
import { createServer } from 'http';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;
const WS_PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Load mock data
const loadJSON = (filename) => {
  const path = join(__dirname, 'data', filename);
  return JSON.parse(readFileSync(path, 'utf-8'));
};

// API Routes
app.get('/api/vitals', (req, res) => {
  const vitals = loadJSON('vitals.json');
  res.json(vitals.current);
});

app.get('/api/alerts', (req, res) => {
  const alerts = loadJSON('alerts.json');
  res.json(alerts);
});

app.post('/api/emergency', (req, res) => {
  const emergencyEvent = {
    id: `emergency-${Date.now()}`,
    type: 'fall_detection',
    vitals: {
      heartRate: 145,
      spO2: 88,
      temperature: 37.2,
    },
    timestamp: Date.now(),
    response: 'Multi-channel alert sent',
  };
  res.json(emergencyEvent);
});

app.get('/api/architecture', (req, res) => {
  const architecture = {
    layers: [
      {
        id: 'presentation',
        name: 'Presentation Layer',
        technologies: ['Flutter', 'React.js', 'Android Tablet'],
      },
      {
        id: 'application',
        name: 'Application Layer',
        technologies: ['Dart', 'Python', 'Cloud Functions'],
      },
      {
        id: 'data',
        name: 'Data Layer',
        technologies: ['Firestore', 'Cloud Storage', 'Realtime DB'],
      },
      {
        id: 'event',
        name: 'Event Layer',
        technologies: ['MQTT', 'WebSocket', 'FCM'],
      },
      {
        id: 'edge',
        name: 'Edge Layer',
        technologies: ['Raspberry Pi 5', 'Arduino Mega', 'Sensors'],
      },
    ],
  };
  res.json(architecture);
});

app.get('/api/tech-stack', (req, res) => {
  const techStack = {
    frontend: ['Flutter', 'React.js', 'Tailwind CSS'],
    backend: ['Firebase', 'Cloud Functions', 'Express.js'],
    edge: ['Raspberry Pi', 'Python', 'MQTT'],
    tools: ['GitHub', 'Jira', 'Slack'],
  };
  res.json(techStack);
});

app.get('/api/timeline', (req, res) => {
  const timeline = {
    totalSprints: 18,
    duration: '9 months',
    startDate: '2025-10-01',
    endDate: '2026-06-30',
    phases: ['Foundation', 'MVP', 'Enhancement', 'Finalization'],
  };
  res.json(timeline);
});

app.get('/api/team', (req, res) => {
  const team = {
    members: [
      { name: 'Ziad Behairy', role: 'Team Leader & Technical PM' },
      { name: 'Omar Awad', role: 'Mobile App Lead' },
      { name: 'Ahmed Amin', role: 'AI/Security Lead' },
      { name: 'Mohamed Morshedy', role: 'Backend Lead' },
      { name: 'Nourhan', role: 'Navigation Lead' },
    ],
  };
  res.json(team);
});

// Start Express server
app.listen(PORT, () => {
  console.log(`✅ API Server running on http://localhost:${PORT}`);
  console.log(`📊 Available endpoints:`);
  console.log(`   GET  /api/vitals`);
  console.log(`   GET  /api/alerts`);
  console.log(`   POST /api/emergency`);
  console.log(`   GET  /api/architecture`);
  console.log(`   GET  /api/tech-stack`);
  console.log(`   GET  /api/timeline`);
  console.log(`   GET  /api/team`);
});

// WebSocket Server for Real-Time Vitals
const wss = new WebSocketServer({ port: WS_PORT });

// Generate random vitals within realistic ranges
const generateVitals = () => ({
  heartRate: Math.floor(72 + Math.random() * 20 - 10), // 62-82 bpm
  spO2: Math.floor(96 + Math.random() * 4 - 2), // 94-98%
  temperature: parseFloat((36.8 + Math.random() * 0.6 - 0.3).toFixed(1)), // 36.5-37.1°C
  timestamp: Date.now(),
});

wss.on('connection', (ws) => {
  console.log('🔌 Client connected to WebSocket');

  // Send vitals every 2 seconds
  const interval = setInterval(() => {
    const vitals = generateVitals();
    ws.send(JSON.stringify(vitals));
  }, 2000);

  // Send initial data immediately
  ws.send(JSON.stringify(generateVitals()));

  ws.on('close', () => {
    console.log('🔌 Client disconnected from WebSocket');
    clearInterval(interval);
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
    clearInterval(interval);
  });
});

console.log(`✅ WebSocket Server running on ws://localhost:${WS_PORT}`);
console.log(`📡 Broadcasting vitals every 2 seconds`);
console.log(`\n🚀 SmartWheel Backend Ready!\n`);
