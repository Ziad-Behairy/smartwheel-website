# PROMPT FOR CLAUDE CODE - SmartWheel Professional Prototype Website

## Project Overview
Build a professional, modern website prototype for SmartWheel - an AI-powered autonomous wheelchair system. This is for a **project discussion presentation tomorrow**, so focus on impressive UI/UX with minimal backend illustration.

## Tech Stack Requirements

### Frontend (Primary Focus)
- **React.js** with TypeScript (modern, component-based)
- **Tailwind CSS** for styling (rapid development, professional look)
- **Framer Motion** for smooth animations
- **Lucide React** for icons
- **React Router** for navigation

### Backend Illustration (Minimal)
- **Node.js/Express** for simple API endpoints
- **JSON files** as mock database (simulate Firebase)
- **WebSocket** demo for real-time monitoring simulation

### Build Tool
- **Vite** for fast development and hot reload

## Website Structure

### Pages (7 total)

1. **Homepage** (`/`)
   - Hero section with 3D wheelchair animation/illustration
   - Key statistics: 12M users, 75% cost reduction, <5s alerts
   - Feature cards: Navigation, Health, Emergency, AI Companion
   - Call-to-action buttons: "View Demo" | "Architecture"

2. **System Architecture** (`/architecture`)
   - Interactive layered architecture diagram
   - 5 layers with expandable details (Presentation → Edge)
   - Technology stack badges with hover effects
   - Architecture justification cards

3. **Technology Stack** (`/tech-stack`)
   - Grid layout of technologies with logos
   - Categorized: Frontend, Backend, Edge, Tools
   - Each tech card: logo, name, purpose, why chosen
   - ADR summary cards (4 key decisions)

4. **UML Diagrams** (`/diagrams`)
   - Tabbed interface: Use Case | Class | Sequence | Activity
   - High-quality diagram renders (use Mermaid.js or images)
   - Explanations beside each diagram
   - Download buttons for full diagrams

5. **Live Demo Dashboard** (`/demo`)
   - **Real-time Vitals Monitor** (simulated):
     - Heart rate graph (Chart.js or Recharts)
     - SpO2 gauge meter
     - Temperature display
     - Live update simulation (WebSocket)
   - **Emergency Alert Simulator**:
     - Button: "Trigger Fall Detection"
     - Animated alert flow visualization
     - Timeline showing 0s→5s response
   - **Navigation Map**: Simple 2D grid showing wheelchair path

6. **Development Timeline** (`/timeline`)
   - Interactive Gantt chart or timeline
   - 18 sprints across 9 months (Oct 2025 - Jun 2026)
   - Phase markers: Foundation → MVP → Enhancement → Finalization
   - Agile ceremony calendar view

7. **Team & Contact** (`/team`)
   - Team member cards with photos/avatars
   - Roles: Ziad (Leader), Omar (App), Ahmed (AI), etc.
   - GitHub/LinkedIn links (placeholder)
   - Supervisor information
   - Sponsorship section: VEX U Worlds achievement

### Shared Components

**Navigation Bar:**
- Logo: "SmartWheel" with wheelchair icon
- Menu: Home | Architecture | Tech Stack | Diagrams | Live Demo | Timeline | Team
- Dark/Light mode toggle
- Responsive hamburger menu for mobile

**Footer:**
- Zewail City branding
- Project info: CIE 460 - Fall 2025
- Social links (placeholder)
- Copyright notice

## Design Requirements

### Visual Style
- **Color Scheme**:
  - Primary: Blue (#3B82F6) - trust, healthcare
  - Secondary: Green (#10B981) - health, vitality
  - Accent: Purple (#8B5CF6) - innovation, AI
  - Danger: Red (#EF4444) - emergency alerts
  - Neutral: Grays for backgrounds/text
  
- **Typography**:
  - Headings: Inter or Poppins (bold, modern)
  - Body: Inter or system fonts
  - Code: Fira Code or JetBrains Mono

- **Components**:
  - Glassmorphism cards (frosted glass effect)
  - Smooth shadows and gradients
  - Rounded corners (8-16px)
  - Micro-interactions (hover, click animations)

### Animation & Interactivity
- Fade-in on scroll (Intersection Observer)
- Smooth page transitions (Framer Motion)
- Parallax effects on hero section
- Animated number counters (12M users)
- Pulse effect on "Live Demo" button
- Chart animations on data load

### Responsiveness
- Mobile-first design
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly on mobile/tablet
- Collapsible sections for diagrams on mobile

## Backend Simulation

### API Endpoints (Express.js)

```javascript
// Mock API structure
GET  /api/vitals          → Current vitals data
GET  /api/alerts          → Recent alerts
POST /api/emergency       → Trigger emergency (returns alert flow)
GET  /api/architecture    → Architecture layer details
GET  /api/timeline        → Sprint timeline data
```

### WebSocket Demo

```javascript
// WebSocket endpoint for live dashboard
ws://localhost:3001

// Send simulated vitals every 2 seconds:
{
  heartRate: 72 + random(-10, 10),
  spO2: 96 + random(-2, 2),
  temperature: 36.8 + random(-0.3, 0.3),
  timestamp: Date.now()
}
```

### Mock Data Files

Create JSON files:
- `vitals.json` - Historical vitals data
- `alerts.json` - Emergency events
- `architecture.json` - Layer descriptions
- `tech-stack.json` - Technologies with details
- `timeline.json` - Sprint data

## Special Features to Impress

### 1. Architecture Interactive Diagram
- SVG layered diagram (5 layers stacked)
- Click layer → Expand details panel
- Connections between layers animated with flowing dots
- Technology icons appear on hover

### 2. Emergency Alert Visualization
- Button: "Simulate Fall Detection"
- Animated sequence diagram:
  - Wheelchair icon shakes
  - Sensor data appears (HR, SpO2)
  - Alert propagates: RPi → Cloud → Mobile
  - Timer counts: 0s → 5s
  - Success checkmark

### 3. Real-time Dashboard Charts
- **Heart Rate**: Animated line chart (60-150 bpm)
- **SpO2**: Radial gauge (85-100%)
- **Temperature**: Thermometer visual (35-38°C)
- **Alert Log**: Scrolling event timeline

### 4. Comparison Table
| Feature | Traditional Wheelchair | SmartWheel |
|---------|------------------------|------------|
| Price | 100,000+ EGP | 25,000-35,000 EGP |
| Navigation | Manual | AI-Powered SLAM |
| Health Monitoring | None | 24/7 Continuous |
| Emergency Response | Manual call | <5s Auto-Alert |

### 5. 3D Wheelchair Model (Optional)
If time permits, integrate Three.js:
- Rotating 3D wheelchair model on homepage
- Interactive (mouse drag to rotate)
- Hotspots showing: sensors, cameras, Raspberry Pi

## Code Quality Standards

- **TypeScript**: Strict typing, interfaces for all data
- **Component Structure**: Functional components with hooks
- **State Management**: React Context or Zustand (lightweight)
- **Code Organization**:
  ```
  src/
  ├── components/      # Reusable UI components
  ├── pages/           # Page components
  ├── hooks/           # Custom React hooks
  ├── utils/           # Helper functions
  ├── data/            # Mock JSON data
  ├── types/           # TypeScript interfaces
  └── styles/          # Global CSS/Tailwind config
  ```
- **Comments**: JSDoc for complex functions
- **Formatting**: Prettier configuration
- **Performance**: Code splitting, lazy loading for pages

## Deployment Preparation

- Build script: `npm run build`
- Include README with:
  - Setup instructions
  - Environment variables (if any)
  - Run commands: `npm install`, `npm run dev`
- Production optimizations:
  - Minified JS/CSS
  - Image optimization
  - Lighthouse score >90

## Deliverables Checklist

Frontend:
- [ ] 7 fully functional pages
- [ ] Responsive design (mobile/tablet/desktop)
- [ ] Dark/light mode toggle
- [ ] Smooth animations and transitions
- [ ] Interactive architecture diagram
- [ ] Real-time dashboard with charts
- [ ] Emergency alert simulation

Backend:
- [ ] Express server with 5 API routes
- [ ] WebSocket server for live updates
- [ ] Mock JSON data files
- [ ] CORS configured

Documentation:
- [ ] README with setup instructions
- [ ] Component documentation (JSDoc)
- [ ] API endpoint documentation

Build:
- [ ] Production build works
- [ ] No console errors/warnings
- [ ] Fast load times (<2s initial)

## Example Code Snippets

### Hero Section (Homepage)

```tsx
import { motion } from 'framer-motion';
import { Heart, Navigation, Shield, MessageSquare } from 'lucide-react';

export default function Hero() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-6">
            SmartWheel
            <span className="text-blue-600"> Revolution</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            AI-Powered Autonomous Wheelchair • 24/7 Health Monitoring • 
            <span className="text-green-600 font-semibold"> 75% More Affordable</span>
          </p>
          
          {/* Statistics Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <StatCard number="12M" label="Target Users in Egypt" />
            <StatCard number="<5s" label="Emergency Response Time" />
            <StatCard number="75%" label="Cost Reduction" />
          </div>

          {/* Feature Icons */}
          <div className="grid md:grid-cols-4 gap-6">
            <FeatureCard icon={<Navigation />} title="Auto Navigation" />
            <FeatureCard icon={<Heart />} title="Health Monitor" />
            <FeatureCard icon={<Shield />} title="Emergency System" />
            <FeatureCard icon={<MessageSquare />} title="AI Companion" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

### Live Dashboard (Demo Page)

```tsx
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useWebSocket } from '../hooks/useWebSocket';

export default function LiveDashboard() {
  const { vitals, connected } = useWebSocket('ws://localhost:3001');
  const [heartRateData, setHeartRateData] = useState([]);

  useEffect(() => {
    if (vitals) {
      setHeartRateData(prev => [...prev.slice(-20), vitals.heartRate]);
    }
  }, [vitals]);

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {/* Heart Rate Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Heart Rate</h3>
          <span className={`px-3 py-1 rounded-full text-sm ${connected ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
            {connected ? '● Live' : '● Offline'}
          </span>
        </div>
        <div className="text-4xl font-bold text-blue-600 mb-2">
          {vitals?.heartRate || '--'} <span className="text-lg">bpm</span>
        </div>
        <Line data={chartData} options={chartOptions} />
      </div>

      {/* SpO2 Gauge */}
      <GaugeMeter value={vitals?.spO2 || 0} label="SpO2" unit="%" max={100} />

      {/* Temperature */}
      <Thermometer value={vitals?.temperature || 0} />
    </div>
  );
}
```

### Emergency Simulation

```tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function EmergencySimulator() {
  const [alertActive, setAlertActive] = useState(false);
  const [timeline, setTimeline] = useState([]);

  const triggerEmergency = async () => {
    setAlertActive(true);
    setTimeline([]);

    const events = [
      { time: 0, message: 'Fall detected (IMU: 35° tilt)' },
      { time: 1000, message: 'Abnormal vitals: HR 145bpm, SpO2 88%' },
      { time: 2000, message: 'MQTT → Cloud Function triggered' },
      { time: 3000, message: 'Emergency contacts retrieved from Firestore' },
      { time: 4000, message: 'SMS + FCM notifications sent' },
      { time: 5000, message: '✓ Caregiver alerted successfully' },
    ];

    for (const event of events) {
      await new Promise(resolve => setTimeout(resolve, event.time));
      setTimeline(prev => [...prev, event]);
    }

    setTimeout(() => setAlertActive(false), 7000);
  };

  return (
    <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-8">
      <h2 className="text-3xl font-bold mb-6">Emergency Alert Simulator</h2>
      
      <button
        onClick={triggerEmergency}
        disabled={alertActive}
        className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold disabled:opacity-50 transition-all transform hover:scale-105"
      >
        🚨 Trigger Fall Detection
      </button>

      <div className="mt-8 space-y-3">
        <AnimatePresence>
          {timeline.map((event, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md"
            >
              <span className="text-blue-600 font-mono">{event.time}ms</span>
              <span className="ml-4">{event.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
```

## Final Notes

**Priority Order:**
1. Homepage (impressive first impression)
2. Live Demo (interactive, shows functionality)
3. Architecture (technical depth)
4. Tech Stack (decision justification)
5. Other pages (supporting content)

**Time Allocation (if limited):**
- 40% - Homepage + Navigation
- 30% - Live Demo Dashboard
- 20% - Architecture page
- 10% - Other pages + polish

**Make it stand out:**
- Use high-quality visuals (icons, gradients, shadows)
- Smooth animations (don't overdo it)
- Professional typography hierarchy
- Consistent spacing (Tailwind scale: 4, 8, 16, 24...)
- Accessibility (keyboard navigation, ARIA labels)

**For tomorrow's presentation:**
- Open browser to homepage
- Demo the live dashboard (auto-updating charts)
- Show emergency alert simulation (impressive 5-second flow)
- Walk through architecture diagram (interactive layers)
- Mention tech stack decisions (Flutter, Firebase, MQTT)

Good luck with your project discussion! 🚀
