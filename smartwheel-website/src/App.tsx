import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const Architecture = lazy(() => import('./pages/Architecture'));
const TechStack = lazy(() => import('./pages/TechStack'));
const Diagrams = lazy(() => import('./pages/Diagrams'));
const LiveDemo = lazy(() => import('./pages/LiveDemo'));
const Timeline = lazy(() => import('./pages/Timeline'));
const Team = lazy(() => import('./pages/Team'));

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/architecture" element={<Architecture />} />
                <Route path="/tech-stack" element={<TechStack />} />
                <Route path="/diagrams" element={<Diagrams />} />
                <Route path="/demo" element={<LiveDemo />} />
                <Route path="/timeline" element={<Timeline />} />
                <Route path="/team" element={<Team />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
