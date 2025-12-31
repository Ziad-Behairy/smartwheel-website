# SmartWheel Website - Quick Start Guide

## ⚡ Fast Setup (5 Minutes)

### 1. Install Dependencies

Open **TWO** terminal windows in this directory.

**Terminal 1 - Frontend:**
```bash
cd smartwheel-website
npm install
```

**Terminal 2 - Backend:**
```bash
cd server
npm install
```

### 2. Start the Servers

**Terminal 1 - Frontend (Vite):**
```bash
cd smartwheel-website
npm run dev
```
✅ Opens at: http://localhost:5173

**Terminal 2 - Backend (Express + WebSocket):**
```bash
cd server
npm start
```
✅ API: http://localhost:3000
✅ WebSocket: ws://localhost:3001

### 3. Open Your Browser

Navigate to: **http://localhost:5173**

## 🎯 What to Test

### Priority 1 - Critical Pages (Must See for Presentation)
1. **Homepage** - Animated stats, feature cards
2. **Live Demo** (`/demo`) - Real-time charts updating, click "Trigger Fall Detection"
3. **Architecture** (`/architecture`) - Click on any layer to see details

### Priority 2 - Supporting Pages
4. **Tech Stack** (`/tech-stack`) - Expand ADR cards
5. **UML Diagrams** (`/diagrams`) - Switch between diagram types
6. **Timeline** (`/timeline`) - View sprint progress
7. **Team** (`/team`) - Team member information

### Features to Showcase
- ✅ **Dark Mode Toggle** - Top-right corner of navbar
- ✅ **Live Charts** - Watch heart rate/SpO2/temperature update every 2 seconds
- ✅ **Emergency Simulator** - Complete 5-second alert flow animation
- ✅ **Responsive Design** - Resize browser window to see mobile layout

## 🐛 Troubleshooting

### Charts not updating?
- Check Terminal 2 shows: "✅ WebSocket Server running"
- Refresh the browser page

### Build errors?
```bash
cd smartwheel-website
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### WebSocket won't connect?
- Ensure both servers are running
- Check ports 3000 and 3001 are not in use by other apps

## 📊 For Tomorrow's Presentation

### Demo Flow (5 minutes):
1. Start on **Homepage** - Show stats (30 seconds)
2. Navigate to **Live Demo** - Show real-time vitals (1 minute)
3. Click **"Trigger Fall Detection"** - Watch 5-second animation (1 minute)
4. Go to **Architecture** - Click 2-3 layers to show details (1.5 minutes)
5. Visit **Tech Stack** - Expand one ADR card (1 minute)

### Key Talking Points:
- "12 million target users in Egypt"
- "75% cost reduction vs imports"
- "Sub-5-second emergency response"
- "Hybrid layered-event-driven architecture"
- "95% code reuse with Flutter"
- "18 sprints over 9 months (Agile/Scrum)"

## 📦 Production Build

```bash
cd smartwheel-website
npm run build
npm run preview
```

---

✨ **Website is ready for your presentation!** Good luck! 🚀
