import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Navigation, Heart, Shield, MessageSquare, ArrowRight, Play,
  Zap, Users, DollarSign, Clock, Wifi, Battery, MapPin,
  Activity, AlertTriangle, Sparkles, TrendingUp, Globe, Calendar
} from 'lucide-react';

// Animated counter component
const AnimatedStat: React.FC<{ target: string; label: string; delay: number; icon?: React.ReactNode }> = ({ target, label, delay, icon }) => {
  const [count, setCount] = useState(0);
  const isNumber = !isNaN(parseInt(target.replace(/[^\d]/g, '')));
  const targetNumber = isNumber ? parseInt(target.replace(/[^\d]/g, '')) : 0;

  useEffect(() => {
    if (!isNumber) return;

    let start = 0;
    const duration = 2000;
    const increment = targetNumber / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= targetNumber) {
        setCount(targetNumber);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [targetNumber, isNumber]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      className="glass-card p-8 text-center hover:scale-105 transition-all group cursor-pointer"
    >
      {icon && (
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform">
          <div className="text-white">{icon}</div>
        </div>
      )}
      <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent mb-3 animate-pulse-slow">
        {target.includes('M') && isNumber ? `${count}M` : target.includes('%') && isNumber ? `${count}%` : target}
      </div>
      <div className="text-gray-700 dark:text-gray-300 font-semibold text-lg">{label}</div>
    </motion.div>
  );
};

// Enhanced Feature card component
const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  details: string[];
  color: string;
  delay: number
}> = ({ icon, title, description, details, color, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      className="glass-card p-8 hover:shadow-2xl transition-all group relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500" />

      <div className={`w-16 h-16 rounded-xl ${color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg relative z-10`}>
        {icon}
      </div>

      <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white relative z-10">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4 relative z-10">{description}</p>

      <ul className="space-y-2 relative z-10">
        {details.map((detail, idx) => (
          <li key={idx} className="flex items-start text-sm text-gray-700 dark:text-gray-300">
            <Sparkles className="w-4 h-4 mr-2 mt-0.5 text-accent flex-shrink-0" />
            <span>{detail}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

// Comparison card
const ComparisonCard: React.FC<{
  title: string;
  traditional: string;
  smartwheel: string;
  icon: React.ReactNode;
  delay: number;
}> = ({ title, traditional, smartwheel, icon, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="glass-card p-6 hover:shadow-xl transition-all"
    >
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mr-4">
          <div className="text-white">{icon}</div>
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">Traditional</div>
          <div className="font-semibold text-red-600 dark:text-red-400">{traditional}</div>
        </div>
        <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">SmartWheel</div>
          <div className="font-semibold text-green-600 dark:text-green-400">{smartwheel}</div>
        </div>
      </div>
    </motion.div>
  );
};

const Home: React.FC = () => {
  return (
    <div className="gradient-hero">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-6xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-gray-900 dark:text-white mt-8">
            <span className="block">SmartWheel</span>
            <span className="block mt-2 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              The Future of Mobility
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            An AI-Powered Autonomous Wheelchair with 24/7 Health Monitoring,
            <br className="hidden md:block" />
            Emergency Response, and{' '}
            <span className="text-secondary font-bold">75% Cost Reduction</span>
          </p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link
              to="/demo"
              className="btn-primary inline-flex items-center justify-center space-x-2 group px-8 py-4 text-lg"
            >
              <Play className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span>View Live Demo</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/architecture"
              className="px-8 py-4 bg-white dark:bg-gray-800 text-primary rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center justify-center space-x-2 text-lg border-2 border-primary/20"
            >
              <Zap className="w-6 h-6" />
              <span>Explore Architecture</span>
            </Link>
          </motion.div>

          {/* Statistics Grid with Icons */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <AnimatedStat
              target="12M"
              label="Target Users in Egypt"
              delay={0.6}
              icon={<Users className="w-8 h-8" />}
            />
            <AnimatedStat
              target="<5s"
              label="Emergency Response Time"
              delay={0.8}
              icon={<Clock className="w-8 h-8" />}
            />
            <AnimatedStat
              target="75%"
              label="Cost Reduction"
              delay={1.0}
              icon={<TrendingUp className="w-8 h-8" />}
            />
          </div>
        </motion.div>
      </section>

      {/* SmartWheel Infographic Section */}
      <section className="bg-white dark:bg-gray-900 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              SmartWheel System Overview
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12">
              Complete architecture and technology integration
            </p>

            {/* Infographic Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-5xl mx-auto glass-card p-8 hover:shadow-2xl transition-all"
            >
              <img
                src="/SmartWheel Infographic.png"
                alt="SmartWheel System Architecture Infographic"
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Core Features Section */}
      <section className="gradient-hero py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              Revolutionary Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Combining cutting-edge AI, real-time health monitoring, and autonomous navigation
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <FeatureCard
              icon={<Navigation className="w-8 h-8 text-white" />}
              title="AI-Powered Navigation"
              description="Visual SLAM-based obstacle avoidance with intelligent path planning"
              details={[
                'ORB-SLAM with 2-4 RGB cameras',
                'Voice command control in Arabic',
                'Real-time obstacle detection',
                'Adaptive path planning'
              ]}
              color="bg-gradient-to-br from-blue-500 to-blue-600"
              delay={0.2}
            />
            <FeatureCard
              icon={<Heart className="w-8 h-8 text-white" />}
              title="24/7 Health Monitoring"
              description="Continuous vital signs tracking with cloud synchronization"
              details={[
                'Heart rate & SpO2 sensing',
                'Non-contact temperature',
                'Real-time cloud sync via MQTT',
                'Trend analysis & alerts'
              ]}
              color="bg-gradient-to-br from-green-500 to-green-600"
              delay={0.3}
            />
            <FeatureCard
              icon={<Shield className="w-8 h-8 text-white" />}
              title="Emergency Response System"
              description="Automatic fall detection with multi-channel caregiver alerts"
              details={[
                'IMU-based fall detection',
                'Sub-5-second response time',
                'SMS + FCM push notifications',
                'GPS location tracking'
              ]}
              color="bg-gradient-to-br from-red-500 to-red-600"
              delay={0.4}
            />
            <FeatureCard
              icon={<MessageSquare className="w-8 h-8 text-white" />}
              title="AI Companion"
              description="Arabic conversational AI with emotion recognition"
              details={[
                'Natural language processing',
                'Emotion timeline tracking',
                'Personalized responses',
                'Continuous learning'
              ]}
              color="bg-gradient-to-br from-purple-500 to-purple-600"
              delay={0.5}
            />
          </div>
        </div>
      </section>

      {/* Product Showcase Section */}
      <section className="bg-white dark:bg-gray-900 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Image Side */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="glass-card p-4 hover:shadow-2xl transition-all">
                  {/* Placeholder for wheelchair image */}
                  <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-accent/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative z-10 text-center p-8">
                      <Navigation className="w-24 h-24 mx-auto mb-4 text-primary" />
                      <p className="text-gray-700 dark:text-gray-300 font-semibold">
                        SmartWheel Prototype
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        AI-Powered Autonomous Navigation
                      </p>
                    </div>
                  </div>
                </div>
                {/* Floating badge */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-br from-secondary to-green-600 text-white px-6 py-3 rounded-full shadow-xl font-bold">
                  75% Cheaper
                </div>
              </motion.div>

              {/* Content Side */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                  Innovation Meets Affordability
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  SmartWheel combines cutting-edge technology with local Egyptian manufacturing
                  to deliver a world-class autonomous wheelchair at a fraction of the cost.
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    'ORB-SLAM visual navigation system',
                    'MAX30102 health sensors (HR/SpO2)',
                    'Raspberry Pi 5 edge computing',
                    'Real-time Firebase cloud sync',
                    'Arabic voice command AI',
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <span className="text-white text-sm">✓</span>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/architecture" className="btn-primary inline-flex items-center space-x-2">
                  <Zap className="w-5 h-5" />
                  <span>Explore Technology</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="gradient-hero py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              SmartWheel vs Traditional Wheelchairs
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              See why SmartWheel is the future of accessible mobility
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <ComparisonCard
              title="Price"
              traditional="100,000+ EGP"
              smartwheel="25,000-35,000 EGP"
              icon={<DollarSign className="w-6 h-6" />}
              delay={0.2}
            />
            <ComparisonCard
              title="Navigation"
              traditional="Manual"
              smartwheel="AI-Powered SLAM"
              icon={<MapPin className="w-6 h-6" />}
              delay={0.3}
            />
            <ComparisonCard
              title="Health Monitoring"
              traditional="None"
              smartwheel="24/7 Continuous"
              icon={<Activity className="w-6 h-6" />}
              delay={0.4}
            />
            <ComparisonCard
              title="Emergency Response"
              traditional="Manual Call"
              smartwheel="<5s Auto-Alert"
              icon={<AlertTriangle className="w-6 h-6" />}
              delay={0.5}
            />
          </div>
        </div>
      </section>

      {/* Technology Highlights */}
      <section className="bg-white dark:bg-gray-900 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <Wifi className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Real-Time Sync</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  MQTT + WebSocket for instant vitals synchronization with 200ms latency
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                  <Battery className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Edge Computing</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Raspberry Pi 5 with offline SQLite buffer for network resilience
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-center"
              >
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Globe className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Cloud Infrastructure</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Firebase ecosystem with 99.9% uptime and automatic scaling
                </p>
              </motion.div>
            </div>

            {/* Impact Statement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="glass-card p-10 text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                Empowering 12 Million Egyptians
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                SmartWheel isn't just a product—it's a movement to make advanced mobility technology
                accessible to every Egyptian citizen who needs it. Through local development,
                affordable pricing, and cutting-edge features, we're revolutionizing wheelchair technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/team" className="btn-secondary inline-flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Meet Our Team</span>
                </Link>
                <Link to="/timeline" className="btn-primary inline-flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>View Development Timeline</span>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
