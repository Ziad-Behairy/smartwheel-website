# SmartWheel - AI-Powered Autonomous Wheelchair System

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com)
[![Tests](https://img.shields.io/badge/tests-7%20passing-brightgreen)](./TESTING_AND_BENCHMARKS.md)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev/)
[![License](https://img.shields.io/badge/license-Academic-orange)](LICENSE)

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Software Engineering Principles](#software-engineering-principles)
3. [Architecture & Design Patterns](#architecture--design-patterns)
4. [Technology Stack](#technology-stack)
5. [Getting Started](#getting-started)
6. [Testing & Quality Assurance](#testing--quality-assurance)
7. [Performance & Benchmarks](#performance--benchmarks)
8. [Project Structure](#project-structure)
9. [Development Workflow](#development-workflow)
10. [Deployment](#deployment)
11. [Team](#team)

---

## 📌 Project Overview

**SmartWheel** is a revolutionary AI-powered autonomous wheelchair system designed for the Egyptian market, combining:

- 🤖 **AI-Powered Autonomous Navigation** using ORB-SLAM
- ❤️ **24/7 Health Monitoring** (Heart Rate, SpO2, Temperature)
- 🚨 **Sub-5-Second Emergency Response** with fall detection
- 🗣️ **Arabic Voice Command AI** for natural interaction
- 💰 **75% Cost Reduction** vs. imported alternatives

### Key Metrics

- **Target Users**: 12 million wheelchair users in Egypt
- **Cost Savings**: 75% reduction compared to imports
- **Emergency Response**: <5 seconds from fall to alert
- **Development Period**: 9 months, 18 sprints (Agile/Scrum)

### This Repository

This repository contains the **professional prototype website** showcasing the SmartWheel system for academic presentation and stakeholder demos. It demonstrates:

- Real-time health vitals monitoring dashboard
- Interactive system architecture visualization
- Live emergency alert simulation
- UML diagrams and technical documentation

---

## 🏗️ Software Engineering Principles

This project demonstrates **industry-standard software engineering practices** taught in modern Computer Science curriculums:

### 1. **SOLID Principles**

#### Single Responsibility Principle (SRP)
Each component has one clear purpose:
```typescript
// ✅ Good: Single responsibility
export const HeartRateChart: React.FC<Props> = ({ data }) => {
  // Only responsible for rendering heart rate chart
};

// ❌ Bad: Multiple responsibilities
// Component that renders chart AND manages WebSocket AND handles auth
```

**Examples in codebase**:
- `useWebSocket.ts`: Only handles WebSocket connection logic
- `ThemeContext.tsx`: Only manages dark/light theme state
- `Navbar.tsx`: Only handles navigation and layout

#### Open/Closed Principle (OCP)
Components open for extension, closed for modification:
```typescript
// Base reusable Card component
export const Card: React.FC<CardProps> = ({ children, className }) => (
  <div className={`glass-card ${className}`}>
    {children}
  </div>
);

// Extended without modifying original
const StatCard = () => <Card className="stat-specific">{...}</Card>;
```

#### Liskov Substitution Principle (LSP)
All chart components implement consistent interface:
```typescript
interface ChartProps {
  data: VitalsData | null;
  connected: boolean;
}

// All charts interchangeable
<HeartRateChart {...chartProps} />
<SpO2Gauge {...chartProps} />
<TemperatureDisplay {...chartProps} />
```

#### Interface Segregation Principle (ISP)
Focused TypeScript interfaces:
```typescript
// ✅ Good: Specific interfaces
interface VitalsData {
  heartRate: number;
  spO2: number;
  temperature: number;
  timestamp: number;
}

interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  message: string;
}

// ❌ Bad: One giant interface with everything
```

#### Dependency Inversion Principle (DIP)
Depend on abstractions (types), not concrete implementations:
```typescript
// ✅ Depend on interface, not implementation
const useWebSocket = (url: string): WebSocketHook => {
  // Implementation details hidden
};

// Components don't know WebSocket internals
const LiveDemo = () => {
  const { vitals, connected } = useWebSocket(WS_URL);
};
```

### 2. **DRY (Don't Repeat Yourself)**

- **Reusable Components**: `Card`, `Button`, `StatCard` used across all pages
- **Shared Utilities**: `api.ts` centralizes all fetch logic
- **Custom Hooks**: `useWebSocket`, `useTheme` encapsulate common logic
- **Tailwind CSS**: Utility classes prevent CSS duplication

**Example**:
```typescript
// Instead of repeating fetch logic everywhere:
// ✅ Centralized
export const fetchVitals = () => fetch('/api/vitals').then(r => r.json());

// ❌ Repeated in every component
const data = await fetch('/api/vitals')...
```

### 3. **KISS (Keep It Simple, Stupid)**

- Simple React Context for theming (no Redux overkill)
- Functional components over class components
- Direct WebSocket connection over complex abstraction layers
- Tailwind CSS over custom CSS frameworks

**Example**:
```typescript
// ✅ Simple theme toggle
const toggleTheme = () => {
  setTheme(prev => prev === 'light' ? 'dark' : 'light');
};

// ❌ Overly complex
// class ThemeManager with Singleton pattern, observers, etc.
```

### 4. **YAGNI (You Aren't Gonna Need It)**

- No premature abstractions (avoided "Enterprise FizzBuzz" pattern)
- Features implemented only when required
- No unnecessary middleware or state management layers

### 5. **Separation of Concerns (SoC)**

Clear separation between layers:

```
┌─────────────────────────────────────┐
│  Presentation (React Components)    │  ← UI logic only
├─────────────────────────────────────┤
│  Business Logic (Hooks, Context)    │  ← State management
├─────────────────────────────────────┤
│  Data Layer (API utils, Types)      │  ← Data fetching
├─────────────────────────────────────┤
│  Backend (Express, WebSocket)       │  ← Server logic
└─────────────────────────────────────┘
```

**File structure reflects separation**:
- `src/components/` - Presentation
- `src/hooks/` - Business logic
- `src/utils/` - Data layer
- `server/` - Backend

### 6. **Convention Over Configuration**

- Standard Vite project structure
- React Router default conventions
- Tailwind CSS default configuration
- TypeScript recommended settings (strict mode)

### 7. **Fail Fast Principle**

```typescript
// ✅ TypeScript catches errors at compile time
interface VitalsData {
  heartRate: number; // Not string!
}

// ✅ Strict mode catches issues early
"strict": true,
"noUnusedLocals": true,

// ✅ ESLint catches code smells
"react-hooks/exhaustive-deps": "warn"
```

### 8. **Principle of Least Astonishment**

- Intuitive component names: `Navbar`, `Footer`, `LiveDemo`
- Standard React patterns (no weird abstractions)
- Predictable file structure
- Clear function naming: `toggleTheme()`, `fetchVitals()`

---

## 🏛️ Architecture & Design Patterns

### 1. **Component-Based Architecture (React)**

**Pattern**: Composition over inheritance

```typescript
// Large components composed of smaller ones
<HomePage>
  <Navbar />
  <Hero />
  <FeatureCards>
    <FeatureCard icon={...} />
    <FeatureCard icon={...} />
  </FeatureCards>
  <Footer />
</HomePage>
```

**Benefits**:
- Reusability
- Testability (unit test small components)
- Maintainability (change one component without affecting others)

### 2. **Observer Pattern (React Context + Hooks)**

**Implementation**: ThemeContext

```typescript
// Subject (ThemeProvider)
export const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  // Notifies all observers when theme changes
};

// Observers (Components using useTheme)
const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  // Automatically re-renders when theme changes
};
```

**Benefits**:
- Decoupled communication
- Automatic updates across components
- No prop drilling

### 3. **Singleton Pattern (WebSocket Connection)**

```typescript
// Only one WebSocket connection per URL
export const useWebSocket = (url: string) => {
  const wsRef = useRef<WebSocket | null>(null);

  if (!wsRef.current) {
    wsRef.current = new WebSocket(url);
  }
  return wsRef.current;
};
```

### 4. **Factory Pattern (Component Factories)**

```typescript
// Factory function for creating stat cards
const createStatCard = (target: string, label: string, icon: React.ReactNode) => (
  <AnimatedStat target={target} label={label} icon={icon} />
);

// Usage
const statCards = [
  createStatCard('12M', 'Users in Egypt', <Users />),
  createStatCard('<5s', 'Emergency Response', <Clock />),
  createStatCard('75%', 'Cost Reduction', <TrendingUp />),
];
```

### 5. **Module Pattern (ES Modules)**

```typescript
// utils/api.ts - Encapsulated API module
const API_BASE = 'http://localhost:3000/api';

export const fetchVitals = () => { /* ... */ };
export const fetchAlerts = () => { /* ... */ };
// Private helper functions not exported
```

### 6. **Lazy Loading Pattern (Code Splitting)**

```typescript
// Pages loaded only when needed
const Home = lazy(() => import('./pages/Home'));
const LiveDemo = lazy(() => import('./pages/LiveDemo'));

<Suspense fallback={<LoadingSpinner />}>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/demo" element={<LiveDemo />} />
  </Routes>
</Suspense>
```

**Benefits**:
- Faster initial load (only load what's needed)
- Better UX (progressive loading)
- Reduced bandwidth usage

### 7. **Container/Presentational Pattern**

```typescript
// Container (logic)
const LiveDemoContainer = () => {
  const { vitals, connected } = useWebSocket(WS_URL);
  return <LiveDemoView vitals={vitals} connected={connected} />;
};

// Presentational (UI only)
const LiveDemoView: React.FC<Props> = ({ vitals, connected }) => (
  <div>{/* Render UI based on props */}</div>
);
```

### 8. **Repository Pattern (API Layer)**

```typescript
// server/data/ acts as repository
const vitalsRepository = {
  getAll: () => JSON.parse(fs.readFileSync('data/vitals.json')),
  save: (data) => fs.writeFileSync('data/vitals.json', JSON.stringify(data)),
};

// Abstracted from HTTP layer
app.get('/api/vitals', (req, res) => {
  res.json(vitalsRepository.getAll());
});
```

---

## 🛠️ Technology Stack

### Frontend

| Technology | Version | Purpose | Why Chosen |
|------------|---------|---------|------------|
| **React** | 19.2 | UI Framework | Industry standard, component-based, virtual DOM |
| **TypeScript** | 5.9 | Type Safety | Catch errors at compile time, better IDE support |
| **Vite** | 7.2 | Build Tool | 10x faster than Webpack, HMR, ES modules |
| **Tailwind CSS** | 3.4 | Styling | Utility-first, no CSS bloat, responsive design |
| **Framer Motion** | 12.23 | Animations | Declarative, 60fps animations, gesture support |
| **React Router** | 7.11 | Routing | Standard SPA routing, code splitting ready |
| **Chart.js** | 4.5 | Charts | Lightweight, customizable, real-time updates |
| **Recharts** | 3.6 | Gauges | React-native charts, composable |
| **Mermaid** | 11.12 | UML Diagrams | Professional diagrams from text, version control friendly |
| **Lucide React** | 0.562 | Icons | Modern, tree-shakeable, 1000+ icons |

### Backend

| Technology | Version | Purpose | Why Chosen |
|------------|---------|---------|------------|
| **Express.js** | Latest | API Server | Minimal, flexible, widely adopted |
| **WebSocket (ws)** | Latest | Real-time | Bidirectional, low-latency, persistent connection |
| **CORS** | Latest | Security | Cross-origin resource sharing for local dev |
| **Nodemon** | Latest | Dev Tool | Auto-restart server on file changes |

### Testing & Quality

| Technology | Version | Purpose |
|------------|---------|---------|
| **Vitest** | 4.0 | Unit Testing | Vite-native, 10x faster than Jest |
| **Testing Library** | 16.3 | Component Testing | User-centric testing, best practices |
| **ESLint** | 9.39 | Linting | Code quality, catch bugs early |
| **TypeScript** | 5.9 | Static Analysis | Type checking, intellisense |

### Infrastructure

- **Node.js**: 20+ (LTS)
- **npm**: Package management
- **Git**: Version control
- **GitHub**: Code hosting, CI/CD ready

---

## 🚀 Getting Started

### Prerequisites

```bash
# Check Node.js version (must be 18+)
node --version

# Check npm version
npm --version
```

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/Ziad-Behairy/smartwheel-website
cd smartwheel-website
```

#### 2. Install Frontend Dependencies
```bash
cd smartwheel-website
npm install
```

#### 3. Install Backend Dependencies
```bash
cd ../server
npm install
```

### Running the Application

**You need TWO terminal windows:**

#### Terminal 1: Frontend (React + Vite)
```bash
cd smartwheel-website
npm run dev
```
✅ Opens at: `http://localhost:5173`

#### Terminal 2: Backend (Express + WebSocket)
```bash
cd server
npm start
```
✅ API: `http://localhost:3000`
✅ WebSocket: `ws://localhost:3001`

### Building for Production

```bash
cd smartwheel-website

# Run tests first
npm test

# Build optimized bundle
npm run build

# Preview production build
npm run preview
```

**Output**: `dist/` folder with optimized static files

---

## 🧪 Testing & Quality Assurance

### Testing Philosophy

We follow the **Testing Trophy** approach (Kent C. Dodds):

```
    🏆
   /  \     E2E (few)
  /    \
 /      \   Integration (some)
/        \
|        |  Unit (many)
|________|  Static Analysis (TypeScript, ESLint)
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

### Test Results

✅ **7/7 tests passing** (100% success rate)

See [TESTING_AND_BENCHMARKS.md](./TESTING_AND_BENCHMARKS.md) for detailed results.

### Code Quality Tools

#### TypeScript Strict Mode
```json
{
  "strict": true,
  "noUnusedLocals": true,
  "noUnusedParameters": true,
  "noFallthroughCasesInSwitch": true
}
```

#### ESLint Rules
- React Hooks exhaustive deps
- No unused variables
- Import order enforcement
- React refresh compliance

### Continuous Integration Ready

This project is configured for CI/CD pipelines (GitHub Actions, GitLab CI, etc.):

```yaml
# Example GitHub Actions workflow
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm install
      - run: npm test
      - run: npm run build
```

---

## 📊 Performance & Benchmarks

### Build Metrics

- **Build Time**: 14.91 seconds
- **Bundle Size (gzipped)**: 115.37 KB (main chunk)
- **Total Modules**: 5,794
- **Code Splitting**: 65 chunks (route-based)

### Runtime Performance

- **First Contentful Paint**: ~0.8s
- **Time to Interactive**: ~1.5s
- **WebSocket Update Frequency**: 2 seconds
- **Chart Rendering**: 60 FPS

### Optimization Techniques Applied

1. ✅ **Code Splitting**: React.lazy() for all routes
2. ✅ **Tree Shaking**: Unused code eliminated
3. ✅ **Minification**: UglifyJS + cssnano
4. ✅ **Gzip Compression**: 70% size reduction
5. ✅ **Lazy Loading**: Images and components on-demand
6. ✅ **Memoization**: useMemo, useCallback for expensive operations

See [TESTING_AND_BENCHMARKS.md](./TESTING_AND_BENCHMARKS.md) for detailed benchmarks.

---

## 📁 Project Structure

```
smartwheel-website/
├── smartwheel-website/          # Frontend (React)
│   ├── public/                  # Static assets
│   │   ├── SmartWheel Infographic.png
│   │   └── images/              # Product images
│   ├── src/
│   │   ├── components/          # React components
│   │   │   ├── layout/          # Navbar, Footer
│   │   │   ├── charts/          # Chart components
│   │   │   └── EmergencySimulator.tsx
│   │   ├── pages/               # Page components (lazy loaded)
│   │   │   ├── Home.tsx
│   │   │   ├── LiveDemo.tsx
│   │   │   ├── Architecture.tsx
│   │   │   ├── TechStack.tsx
│   │   │   ├── Diagrams.tsx
│   │   │   ├── Timeline.tsx
│   │   │   └── Team.tsx
│   │   ├── hooks/               # Custom React hooks
│   │   │   ├── useWebSocket.ts
│   │   │   └── useTheme.ts
│   │   ├── context/             # React Context
│   │   │   └── ThemeContext.tsx
│   │   ├── types/               # TypeScript interfaces
│   │   │   └── index.ts
│   │   ├── utils/               # Helper functions
│   │   │   └── api.ts
│   │   ├── test/                # Test setup
│   │   ├── App.tsx              # Main app component
│   │   ├── main.tsx             # Entry point
│   │   └── index.css            # Global styles (Tailwind)
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── vitest.config.ts
├── server/                      # Backend (Express)
│   ├── data/                    # Mock JSON data
│   │   ├── vitals.json
│   │   ├── alerts.json
│   │   ├── architecture.json
│   │   ├── tech-stack.json
│   │   ├── timeline.json
│   │   └── team.json
│   ├── server.js                # Express + WebSocket server
│   └── package.json
├── .gitignore
├── README.md                    # This file
├── QUICKSTART.md                # Quick setup guide
├── IMAGE_GUIDE.md               # Image addition guide
└── TESTING_AND_BENCHMARKS.md   # Test results & metrics
```

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                      User's Browser                         │
├─────────────────────────────────────────────────────────────┤
│  React App (http://localhost:5173)                         │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐  │
│  │  Components   │  │  Custom Hooks │  │    Context    │  │
│  │  - Navbar     │  │  - useWS      │  │  - Theme      │  │
│  │  - Pages      │  │  - useTheme   │  │               │  │
│  │  - Charts     │  │               │  │               │  │
│  └───────────────┘  └───────────────┘  └───────────────┘  │
└─────────────┬───────────────────────┬───────────────────────┘
              │                       │
              │ HTTP (REST API)       │ WebSocket (Real-time)
              │                       │
┌─────────────▼───────────────────────▼───────────────────────┐
│              Backend Servers                                │
├─────────────────────────────────────────────────────────────┤
│  Express Server              WebSocket Server               │
│  (http://localhost:3000)     (ws://localhost:3001)         │
│  ┌─────────────────┐        ┌─────────────────┐           │
│  │  API Endpoints  │        │  Vitals Stream  │           │
│  │  /api/vitals    │        │  (every 2s)     │           │
│  │  /api/alerts    │        │                 │           │
│  │  /api/team      │        └─────────────────┘           │
│  │  ...            │                                       │
│  └─────────────────┘                                       │
│          │                                                  │
│          ▼                                                  │
│  ┌─────────────────┐                                       │
│  │  Mock Data      │                                       │
│  │  (JSON files)   │                                       │
│  └─────────────────┘                                       │
└─────────────────────────────────────────────────────────────┘
```

---

## 💻 Development Workflow

### Git Workflow (Feature Branch)

```bash
# 1. Create feature branch
git checkout -b feature/new-dashboard-widget

# 2. Make changes
# ... edit files ...

# 3. Run tests
npm test

# 4. Commit with descriptive message
git add .
git commit -m "feat: add battery level widget to dashboard"

# 5. Push to remote
git push origin feature/new-dashboard-widget

# 6. Create Pull Request on GitHub
# 7. Code Review → Merge to main
```

### Commit Message Convention (Conventional Commits)

```
feat: add new feature
fix: bug fix
docs: documentation changes
style: formatting, missing semicolons, etc.
refactor: code restructuring without changing behavior
test: adding or updating tests
chore: build process, dependencies, etc.
```

**Example**:
```bash
git commit -m "feat: implement emergency alert timeline animation"
git commit -m "fix: resolve WebSocket reconnection infinite loop"
git commit -m "docs: update README with testing section"
```

### Code Review Checklist

Before submitting PR:
- [ ] All tests pass (`npm test`)
- [ ] Build succeeds (`npm run build`)
- [ ] No TypeScript errors (`tsc --noEmit`)
- [ ] No ESLint warnings (`npm run lint`)
- [ ] Code follows project conventions
- [ ] Added tests for new features
- [ ] Updated documentation if needed

### Development Best Practices

1. **Small, Focused Commits**: One logical change per commit
2. **Descriptive Commit Messages**: Explain why, not what
3. **Test Before Commit**: Never commit broken code
4. **Keep Dependencies Updated**: Regular `npm audit` checks
5. **Use TypeScript**: Always type your functions and props
6. **Write Tests**: Test-driven development when possible

---

## 🌐 Deployment

### Static Hosting (Recommended)

The frontend is a static site after build, deployable to:

#### Vercel (Zero Configuration)
```bash
npm install -g vercel
cd smartwheel-website
vercel
```

#### Netlify
```bash
cd smartwheel-website
npm run build

# Drag-drop dist/ folder to Netlify dashboard
# OR use CLI:
netlify deploy --prod --dir=dist
```

#### GitHub Pages
```bash
cd smartwheel-website
npm run build

# Deploy dist/ folder
gh-pages -d dist
```

### Backend Deployment

#### Railway / Render / Heroku
```bash
cd server

# Create Procfile
echo "web: node server.js" > Procfile

# Deploy via platform CLI or GitHub integration
```

#### Docker Container
```dockerfile
# Dockerfile (example)
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY . .
EXPOSE 3000 3001
CMD ["node", "server.js"]
```

### Environment Variables

Create `.env` file for production:

```bash
# Frontend (.env)
VITE_API_URL=https://api.smartwheel.com
VITE_WS_URL=wss://ws.smartwheel.com

# Backend (.env)
PORT=3000
WS_PORT=3001
NODE_ENV=production
```

---

## 👥 Team

### Development Team

| Name | Role | Responsibilities |
|------|------|------------------|
| **Ziad Behairy** | Team Leader, Technical PM | Project management, technical architecture |
| **Omar Awad** | Mobile App Lead | Flutter app development, UI/UX |
| **Ahmed Amin** | AI/Security Lead | Machine learning, security protocols |
| **Mohamed Morshedy** | Backend Lead | Firebase, API development |
| **Nourhan** | Navigation Lead | ORB-SLAM, autonomous navigation |

### Academic Supervision

- **University**: Zewail City University
- **Course**: CIE 460 - Fall 2025
- **Department**: Computer and Information Engineering

---

## 📚 Learning Resources

### Software Engineering Concepts Applied

This project is an excellent reference for learning:

1. **React Patterns**: Hooks, Context, Lazy Loading, Code Splitting
2. **TypeScript**: Strict typing, interfaces, generics
3. **Testing**: Unit tests, component tests, mocking
4. **Build Tools**: Vite, bundling, optimization
5. **Real-time Communication**: WebSocket, event-driven architecture
6. **API Design**: RESTful endpoints, JSON responses
7. **Version Control**: Git workflow, feature branches
8. **Software Principles**: SOLID, DRY, KISS, YAGNI

### Recommended Reading

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Clean Code (Robert C. Martin)](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882)
- [Design Patterns (Gang of Four)](https://en.wikipedia.org/wiki/Design_Patterns)
- [Testing Library Best Practices](https://testing-library.com/docs/react-testing-library/intro/)

---

## 🤝 Contributing

This is an academic project, but contributions are welcome for learning purposes:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is developed for academic purposes at Zewail City University.

**Academic Use Only** - Not licensed for commercial use.

---

## 🙏 Acknowledgments

- **Zewail City University** for providing resources and guidance
- **React Team** for the excellent framework
- **Vite Team** for the blazing-fast build tool
- **Open Source Community** for the amazing libraries used

---

## 📞 Contact

For questions about this project:

- **GitHub**: https://github.com/YOUR_USERNAME/smartwheel-website

---

## 🔮 Future Roadmap

- [ ] Add E2E tests with Playwright
- [ ] Implement CI/CD pipeline (GitHub Actions)
- [ ] Add accessibility (a11y) improvements (WCAG 2.1 AA)
- [ ] Implement service worker for offline support
- [ ] Add internationalization (i18n) for Arabic/English
- [ ] Performance monitoring with Sentry
- [ ] Add visual regression testing

---

**Built with ❤️ by the SmartWheel Team**

*Last Updated: December 31, 2024*

---

## Quick Links

- [📖 Quick Start Guide](./QUICKSTART.md)
- [📸 Image Addition Guide](./IMAGE_GUIDE.md)
- [🧪 Testing & Benchmarks](./TESTING_AND_BENCHMARKS.md)
- [🌐 Live Demo](http://localhost:5173) (requires local setup)
- [📊 Architecture Docs](http://localhost:5173/architecture) (requires local setup)

---
