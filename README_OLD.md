# SmartWheel - Professional Prototype Website

A modern, interactive website showcasing the SmartWheel AI-powered autonomous wheelchair system. Built for the CIE 460 Senior Design Project at Zewail City University.

## 🎯 Project Overview

SmartWheel is targeting Egypt's 12 million citizens with mobility challenges, offering:
- **AI-Powered Navigation**: Visual SLAM-based obstacle avoidance
- **24/7 Health Monitoring**: Continuous vitals tracking (HR, SpO2, Temperature)
- **<5s Emergency Response**: Automatic fall detection with multi-channel alerts
- **75% Cost Reduction**: Affordable alternative to imported wheelchairs

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Clone or navigate to the project directory**
```bash
cd "d:\ZC Journey\CIE Academic Life\Grad Project\Web And App\Website"
```

2. **Install frontend dependencies**
```bash
cd smartwheel-website
npm install
```

3. **Install backend dependencies**
```bash
cd ../server
npm install
```

### Running the Application

You need to run **both** the frontend and backend servers:

#### Terminal 1: Frontend (Vite Dev Server)
```bash
cd smartwheel-website
npm run dev
```
- Opens at: [http://localhost:5173](http://localhost:5173)

#### Terminal 2: Backend (Express + WebSocket)
```bash
cd server
npm start
```
- API Server: [http://localhost:3000](http://localhost:3000)
- WebSocket: `ws://localhost:3001`

### Access the Website

Open your browser to [http://localhost:5173](http://localhost:5173)

## 📁 Project Structure

```
Website/
├── smartwheel-website/          # React Frontend
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── layout/          # Navbar, Footer
│   │   │   ├── charts/          # HeartRateChart, SpO2Gauge, TemperatureDisplay
│   │   │   └── EmergencySimulator.tsx
│   │   ├── pages/               # 7 main pages
│   │   │   ├── Home.tsx         # Hero + animated stats
│   │   │   ├── Architecture.tsx # Interactive 5-layer diagram
│   │   │   ├── TechStack.tsx    # Technologies + ADRs
│   │   │   ├── Diagrams.tsx     # UML diagrams (Mermaid.js)
│   │   │   ├── LiveDemo.tsx     # Real-time dashboard
│   │   │   ├── Timeline.tsx     # Sprint visualization
│   │   │   └── Team.tsx         # Team member cards
│   │   ├── hooks/               # useWebSocket, useTheme
│   │   ├── context/             # ThemeContext (dark/light mode)
│   │   ├── types/               # TypeScript interfaces
│   │   ├── App.tsx              # Main app with routing
│   │   └── index.css            # Tailwind + custom styles
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.ts
├── server/                      # Express Backend
│   ├── data/                    # Mock JSON files
│   │   ├── vitals.json
│   │   └── alerts.json
│   ├── server.js                # Express + WebSocket server
│   └── package.json
├── smartwheel-content.md        # Project documentation
├── claude-code-prompt.md        # Technical specifications
├── quick-start-guide.md         # Setup guide
└── README.md                    # This file
```

## 🎨 Features

### 1. Homepage
- **Hero Section**: Gradient background with animated statistics
- **Stat Cards**: 12M users, <5s alerts, 75% cost reduction (animated counters)
- **Feature Cards**: 4 core features with icons
- **Comparison Table**: SmartWheel vs Traditional Wheelchairs

### 2. Live Demo Dashboard ⭐ **Most Impressive**
- **Real-time Vitals Monitor**:
  - Heart Rate: Animated line chart (updates every 2s via WebSocket)
  - SpO2: Radial gauge meter with color-coded zones
  - Temperature: Thermometer visualization
  - Connection status indicator
- **Emergency Alert Simulator**:
  - Click "Trigger Fall Detection" button
  - Animated 0ms→5000ms timeline
  - 6-step emergency flow visualization

### 3. System Architecture
- **Interactive 5-Layer Diagram**:
  - Presentation → Application → Data → Event → Edge
  - Click any layer to view detailed modal
  - Technology badges with hover effects
  - Animated connection lines
- **Architecture Justification**: Why layered + event-driven?

### 4. Technology Stack
- **4 Categories**: Frontend, Backend, Edge, Tools
- **ADR Cards** (Expandable):
  1. Flutter for Cross-Platform
  2. Hybrid MQTT/WebSocket Protocol
  3. Firebase Backend Platform
  4. Firebase Auth + RBAC
- Each ADR shows: Decision, Rationale, Pros, Trade-offs

### 5. UML Diagrams (Mermaid.js)
- **Tabbed Interface**: Use Case | Class | Sequence | Activity
- **Professional Rendering**: Auto-generated from code
- **Explanations**: Clear descriptions beside each diagram

### 6. Development Timeline
- **18 Sprints** across 4 phases (Oct 2025 - Jun 2026)
- **Sprint Cards**: Deliverables, status (completed/in-progress/upcoming)
- **Agile Ceremonies**: Planning, Daily Standup, Review, Retrospective
- **Key Metrics**: 40-50 story points/sprint, >80% code coverage

### 7. Team Page
- **5 Team Members**: Cards with roles and responsibilities
- **Supervisors**: Dr. Elshafei, Dr. Abd-Rabou
- **Recognition**: VEX U Worlds 2025 participation
- **Institution**: Zewail City University - CIE 460

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS (glassmorphism, gradients)
- **Animations**: Framer Motion (page transitions, scroll effects)
- **Icons**: Lucide React
- **Routing**: React Router DOM v6
- **Charts**: Chart.js + react-chartjs-2 (line chart)
- **Diagrams**: Mermaid.js (UML rendering)
- **State Management**: React Context (theme)

### Backend
- **Server**: Express.js
- **WebSocket**: ws package
- **CORS**: Enabled for local development
- **Data**: JSON files (mock database)

## 🎯 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/vitals` | Current vitals data |
| GET | `/api/alerts` | Recent alerts (last 10) |
| POST | `/api/emergency` | Trigger emergency simulation |
| GET | `/api/architecture` | Architecture layer details |
| GET | `/api/tech-stack` | Technology information |
| GET | `/api/timeline` | Sprint timeline data |
| GET | `/api/team` | Team member information |

**WebSocket**: `ws://localhost:3001`
- Emits vitals every 2 seconds
- Format: `{ heartRate, spO2, temperature, timestamp }`

## 🎨 Design System

### Color Palette
- **Primary Blue**: `#3B82F6` (trust, healthcare)
- **Secondary Green**: `#10B981` (health, vitality)
- **Accent Purple**: `#8B5CF6` (innovation, AI)
- **Danger Red**: `#EF4444` (emergency alerts)

### Typography
- **Headings**: Inter (bold, modern)
- **Body**: Inter or system fonts
- **Code**: Tailwind's default monospace

### UI Components
- **Glassmorphism Cards**: `backdrop-blur-md bg-white/70 dark:bg-gray-800/70`
- **Smooth Shadows**: `shadow-xl shadow-blue-500/10`
- **Rounded Corners**: `rounded-lg` (8px) or `rounded-xl` (12px)
- **Gradients**: `bg-gradient-to-br from-blue-50 to-purple-50`

## 🌙 Dark Mode

- **Toggle**: Navbar (top-right corner)
- **Persistence**: Saved in localStorage
- **System Preference**: Auto-detects on first load
- **Smooth Transitions**: All elements transition smoothly

## 📱 Responsive Design

Tested and optimized for:
- **Mobile**: 320px+
- **Tablet**: 768px+
- **Desktop**: 1024px+
- **Large Desktop**: 1280px+

## 🧪 Testing

### Manual Testing Checklist
- [ ] All 7 pages load correctly
- [ ] Navigation menu works (desktop + mobile)
- [ ] Dark/light mode toggle functional
- [ ] WebSocket connection establishes
- [ ] Charts update every 2 seconds
- [ ] Emergency simulator completes 5-second flow
- [ ] Architecture layer modals open/close
- [ ] ADR cards expand/collapse
- [ ] Mermaid diagrams render
- [ ] Responsive on mobile viewport

### Quick Test
```bash
# Terminal 1: Start backend
cd server && npm start

# Terminal 2: Start frontend
cd smartwheel-website && npm run dev

# Visit http://localhost:5173
# Click "Live Demo" → Should see live charts updating
# Click "Trigger Fall Detection" → Should see 5-second animation
```

## 📦 Production Build

```bash
cd smartwheel-website
npm run build
```

Output: `smartwheel-website/dist/`

Preview production build:
```bash
npm run preview
```

## 🐛 Troubleshooting

### Charts not showing
```bash
cd smartwheel-website
npm install chart.js react-chartjs-2
```

### WebSocket won't connect
- Ensure backend server is running: `cd server && npm start`
- Check ports 3000 (API) and 3001 (WebSocket) are free
- Look for "✅ WebSocket Server running" message in terminal

### Mermaid diagrams not rendering
```bash
cd smartwheel-website
npm install mermaid
```

### Build fails
```bash
cd smartwheel-website
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Dark mode not working
- Clear browser localStorage
- Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

## 🎤 Presentation Tips

### Demo Flow (5 minutes)
1. **Homepage** (30s): Show hero, animated stats, feature cards
2. **Live Demo** (2 min):
   - Show real-time charts updating
   - Click "Trigger Fall Detection"
   - Highlight sub-5-second response
3. **Architecture** (1.5 min):
   - Click each layer to show details
   - Explain hybrid architecture
4. **Tech Stack** (1 min):
   - Expand 1-2 ADR cards
   - Mention key decisions (Flutter, Firebase)

### Talking Points
- "12 million Egyptian citizens with mobility challenges"
- "75% cost reduction vs imported wheelchairs"
- "Sub-5-second emergency response via MQTT/WebSocket"
- "Hybrid layered-event-driven architecture"
- "95% code reuse with Flutter cross-platform"
- "Agile/Scrum with 18 sprints over 9 months"

## 👥 Team 06

- **Ziad Behairy**: Team Leader & Technical PM
- **Omar Awad**: Mobile App Lead (Flutter)
- **Ahmed Amin**: AI/Security Lead
- **Mohamed Morshedy**: Backend Lead (Firebase)
- **Nourhan**: Navigation Lead (SLAM/ROS)

**Supervisors**: Dr. Elshafei, Dr. Abd-Rabou

## 📄 License

Academic Project - Zewail City University
CIE 460 - Senior Design Project - Fall 2025

## 🙏 Acknowledgments

- Zewail City University - Center for Informatics and Electronics
- VEX U Worlds 2025 - Robotics Competition Experience
- Firebase, Flutter, and open-source communities

---

**Built with ❤️ for accessible mobility**

*SmartWheel - Revolutionizing mobility for 12 million Egyptians*
