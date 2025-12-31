# Quick Start Guide - SmartWheel Website with Claude Code

## Step 1: Open Claude Code

Launch Claude Code in your terminal.

## Step 2: Start the Project

Copy and paste this command into Claude Code:

```
I need to build a professional prototype website for my SmartWheel project presentation tomorrow. 

Create a modern, interactive website using:
- React + TypeScript + Vite
- Tailwind CSS for styling
- Framer Motion for animations
- Chart.js for live dashboards

The website should have 7 pages:
1. Homepage with hero section and key stats (12M users, <5s alerts, 75% cost reduction)
2. Interactive System Architecture page with 5-layer diagram
3. Technology Stack page with ADR decision cards
4. UML Diagrams page with tabbed interface
5. Live Demo Dashboard with real-time vitals simulation (heart rate chart, SpO2 gauge, emergency alert simulator)
6. Development Timeline with Agile sprint visualization
7. Team page with member cards

Key features I MUST have:
- Dark/light mode toggle
- Smooth scroll animations
- Interactive emergency alert simulation that shows 0s→5s response flow
- Real-time dashboard with animated charts (simulate WebSocket updates)
- Responsive design for mobile/tablet/desktop
- Professional color scheme (blue primary, green health, purple AI, red emergency)

Use the content from smartwheel-content.md for all the information.

Build everything in a single project directory with proper structure. Include a simple Express backend with mock API endpoints and WebSocket for the live demo.

Make it visually stunning - use glassmorphism cards, smooth gradients, micro-interactions, and professional typography.
```

## Step 3: Provide the Content

When Claude Code asks for the content or if you want to give it upfront, paste the contents of `smartwheel-content.md` file.

## Step 4: Review the Detailed Requirements

If Claude Code needs more guidance, use the `claude-code-prompt.md` file which contains:
- Complete technical specifications
- Code examples for key components
- Design system details
- API endpoint specifications
- WebSocket simulation structure

## Alternative: All-in-One Prompt

If you want to provide everything at once, use this mega-prompt:

```
Build a professional SmartWheel wheelchair system prototype website for tomorrow's presentation.

TECH STACK:
- Frontend: React + TypeScript + Vite + Tailwind CSS + Framer Motion + Chart.js
- Backend: Express + WebSocket (mock/simulation)
- Package manager: npm

PROJECT STRUCTURE:
smartwheel-website/
├── client/                  # React frontend
│   ├── src/
│   │   ├── pages/          # 7 pages (Home, Architecture, TechStack, Diagrams, Demo, Timeline, Team)
│   │   ├── components/     # Reusable components
│   │   ├── hooks/          # Custom hooks (useWebSocket)
│   │   ├── data/           # Mock JSON data
│   │   └── types/          # TypeScript interfaces
│   └── package.json
├── server/                  # Express backend
│   ├── server.js           # Main server + WebSocket
│   ├── routes/             # API routes
│   └── data/               # Mock JSON database
└── README.md

MUST-HAVE FEATURES:

1. HOMEPAGE:
   - Hero with animated stats: "12M users", "<5s alerts", "75% cost reduction"
   - 4 feature cards: Navigation, Health, Emergency, AI Companion
   - Smooth scroll animations
   - CTA buttons

2. LIVE DEMO DASHBOARD (Most Important!):
   - Real-time heart rate line chart (animated, updates every 2s)
   - SpO2 radial gauge meter (85-100%)
   - Temperature thermometer display
   - Emergency Alert Simulator:
     * Red button: "Trigger Fall Detection"
     * Shows animated timeline: 0ms→5000ms
     * Events: Fall detected → Vitals abnormal → MQTT → Cloud → SMS sent → Success
   - WebSocket connection indicator (green "Live" badge)

3. ARCHITECTURE PAGE:
   - Interactive 5-layer diagram (SVG)
   - Click layer → expand details panel
   - Technology badges with hover effects
   - Animated connections between layers

4. TECH STACK:
   - Grid of technology cards with logos
   - 4 ADR decision cards: Flutter, MQTT/WebSocket, Firebase, Auth
   - Each ADR: Decision, Rationale, Trade-offs

5. DIAGRAMS:
   - Tabs: Use Case, Class, Sequence, Activity
   - Display diagrams (use placeholders or simple Mermaid renders)
   - Explanations beside each

6. TIMELINE:
   - Visual sprint timeline (18 sprints × 2 weeks)
   - 4 phases with progress bars
   - Agile ceremony calendar

7. TEAM:
   - Team member cards with avatars
   - Roles: Ziad (Leader), Omar (App), Ahmed (AI), Mohamed (Backend), Nourhan (Navigation)

DESIGN REQUIREMENTS:
- Color scheme: Blue (#3B82F6), Green (#10B981), Purple (#8B5CF6), Red (#EF4444)
- Dark/light mode toggle in navbar
- Glassmorphism cards (backdrop-blur, semi-transparent backgrounds)
- Smooth animations (fade-in on scroll, page transitions)
- Professional fonts: Inter/Poppins
- Responsive: mobile/tablet/desktop
- Navigation bar with logo + 7 menu items

BACKEND (Simple):
- Express server on port 3000
- API endpoints:
  GET /api/vitals - current vitals
  GET /api/alerts - alert history
  POST /api/emergency - trigger alert simulation
- WebSocket on port 3001:
  - Emit vitals every 2 seconds: { heartRate, spO2, temperature, timestamp }

CONTENT:
[Paste the entire smartwheel-content.md content here]

DELIVERABLES:
- Full working website with all 7 pages
- Real-time dashboard that actually updates
- Emergency alert animation that shows the 5-second flow
- Both frontend and backend running
- README with setup instructions: npm install, npm run dev
- Production build command: npm run build

Make it look PROFESSIONAL - this is for a graduation project presentation. Use high-quality UI components, smooth animations, and attention to detail.

Start by creating the project structure, then build the most impressive parts first: Homepage and Live Demo Dashboard.
```

## Tips for Best Results

1. **Be Specific**: Claude Code works better with detailed requirements
2. **Prioritize**: Mention which features are most important (Live Demo!)
3. **Provide Examples**: The code snippets in claude-code-prompt.md help
4. **Iterate**: If something isn't right, ask Claude Code to adjust specific parts
5. **Test Locally**: Run `npm install` and `npm run dev` to preview

## What to Expect

Claude Code will create:
- ✅ Complete React app with TypeScript
- ✅ All 7 pages fully functional
- ✅ Interactive components (charts, animations)
- ✅ Dark mode toggle
- ✅ Express backend with WebSocket
- ✅ Mock data for simulation
- ✅ Production-ready build

Estimated setup time: 5-10 minutes
Development by Claude Code: 20-40 minutes (depending on detail level)

## Troubleshooting

**If charts don't show:**
- Check Chart.js is installed: `npm install chart.js react-chartjs-2`

**If WebSocket doesn't connect:**
- Make sure server is running: `cd server && node server.js`
- Check ports 3000 (API) and 3001 (WebSocket) are free

**If animations are choppy:**
- Check Framer Motion is installed: `npm install framer-motion`
- Reduce animation complexity in settings

**If build fails:**
- Clear cache: `rm -rf node_modules package-lock.json`
- Reinstall: `npm install`

## For Your Presentation Tomorrow

1. **Before the presentation:**
   - Run the build: `npm run build`
   - Test all pages work
   - Practice the emergency alert demo

2. **During presentation:**
   - Start with homepage (impressive hero)
   - Navigate to Live Demo (show charts updating)
   - Click "Trigger Fall Detection" (5-second flow)
   - Show Architecture diagram (technical depth)
   - Mention key tech decisions (Flutter, Firebase, MQTT)

3. **Talking points:**
   - "Hybrid Layered-Event-Driven architecture"
   - "Sub-5-second emergency response"
   - "95% code reuse with Flutter"
   - "75% cost reduction for Egyptian market"
   - "Agile/Scrum with 18 sprints over 9 months"

## Success Criteria

Your website should:
- ✅ Load fast (<2 seconds)
- ✅ Look professional (no broken layouts)
- ✅ Charts actually animate
- ✅ Emergency simulation works
- ✅ Responsive on phone/tablet
- ✅ Dark mode switches smoothly
- ✅ No console errors

Good luck with your presentation! 🎉
