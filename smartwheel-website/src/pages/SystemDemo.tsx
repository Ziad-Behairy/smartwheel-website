import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Accessibility, Heart, Users, Shield, Activity, MapPin,
  Bell, Battery, Navigation as NavIcon, MessageSquare,
  FileText, Settings, AlertTriangle, TrendingUp, Map,
  Zap, Clock, CheckCircle, XCircle
} from 'lucide-react';

// Mock real-time data
interface VitalsData {
  heartRate: number;
  spO2: number;
  temperature: number;
  mood: 'Happy' | 'Neutral' | 'Sad';
  batteryLevel: number;
  isOnline: boolean;
}

interface LocationData {
  name: string;
  gps: string;
  lastUpdate: string;
}

interface Alert {
  id: number;
  type: 'critical' | 'warning' | 'info';
  message: string;
  time: string;
}

const SystemDemo: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<'wheelchair' | 'caregiver' | 'healthcare' | 'admin'>('wheelchair');
  const [vitals, setVitals] = useState<VitalsData>({
    heartRate: 83,
    spO2: 96,
    temperature: 36.8,
    mood: 'Neutral',
    batteryLevel: 81,
    isOnline: true
  });
  const [location, setLocation] = useState<LocationData>({
    name: 'Living Room',
    gps: '30.0444, 31.2357',
    lastUpdate: 'Just now'
  });
  const [alerts, setAlerts] = useState<Alert[]>([]);

  // Simulate real-time vitals updates
  useEffect(() => {
    const interval = setInterval(() => {
      setVitals(prev => ({
        heartRate: Math.floor(80 + Math.random() * 10),
        spO2: Math.floor(95 + Math.random() * 4),
        temperature: parseFloat((36.5 + Math.random() * 0.6).toFixed(1)),
        mood: prev.mood,
        batteryLevel: Math.max(0, prev.batteryLevel - 0.1),
        isOnline: true
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const userTypes = [
    {
      id: 'wheelchair' as const,
      name: 'Wheelchair User',
      icon: Accessibility,
      color: 'bg-teal-500',
      description: 'Main user interface with navigation and health monitoring'
    },
    {
      id: 'caregiver' as const,
      name: 'Caregiver App',
      icon: Users,
      color: 'bg-blue-500',
      description: 'Monitor patient vitals and location in real-time'
    },
    {
      id: 'healthcare' as const,
      name: 'Healthcare Pro',
      icon: Heart,
      color: 'bg-purple-500',
      description: 'Access medical reports and patient health data'
    },
    {
      id: 'admin' as const,
      name: 'Administrator',
      icon: Shield,
      color: 'bg-gray-700',
      description: 'System diagnostics and event simulation'
    }
  ];

  const simulateEmergency = () => {
    const newAlert: Alert = {
      id: Date.now(),
      type: 'critical',
      message: '🚨 FALL DETECTED - Emergency services notified',
      time: new Date().toLocaleTimeString()
    };
    setAlerts(prev => [newAlert, ...prev]);

    setTimeout(() => {
      setAlerts(prev => [
        {
          id: Date.now() + 1,
          type: 'warning',
          message: '📞 Caregiver contacted - ETA 5 minutes',
          time: new Date().toLocaleTimeString()
        },
        ...prev
      ]);
    }, 2000);

    setTimeout(() => {
      setAlerts(prev => [
        {
          id: Date.now() + 2,
          type: 'info',
          message: '✅ Emergency response complete - Patient stable',
          time: new Date().toLocaleTimeString()
        },
        ...prev
      ]);
    }, 5000);
  };

  const simulateLowBattery = () => {
    setVitals(prev => ({ ...prev, batteryLevel: 15 }));
    const newAlert: Alert = {
      id: Date.now(),
      type: 'warning',
      message: '🔋 Low Battery Warning - Please charge soon',
      time: new Date().toLocaleTimeString()
    };
    setAlerts(prev => [newAlert, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gray-900 dark:text-white">
            Rafeeq System Architecture Demo
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Interactive demonstration of the multi-user system with real-time data
          </p>
        </motion.div>

        {/* User Type Selector */}
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          {userTypes.map((user, index) => (
            <motion.button
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedUser(user.id)}
              className={`p-6 rounded-xl border-2 transition-all ${
                selectedUser === user.id
                  ? 'border-primary bg-white dark:bg-gray-800 shadow-xl scale-105'
                  : 'border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 hover:border-primary/50'
              }`}
            >
              <div className={`w-16 h-16 ${user.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <user.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">
                {user.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {user.description}
              </p>
            </motion.button>
          ))}
        </div>

        {/* User Interface Views */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedUser}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="glass-card p-8 rounded-2xl"
          >
            {/* Wheelchair User View */}
            {selectedUser === 'wheelchair' && (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      Marhaba, Mohamed
                    </h2>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-green-600 dark:text-green-400 font-semibold">ONLINE</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2 text-2xl font-bold text-primary">
                      <Battery className="w-8 h-8" />
                      <span>{vitals.batteryLevel.toFixed(0)}%</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Range: ~{(vitals.batteryLevel * 0.15).toFixed(1)} km
                    </p>
                  </div>
                </div>

                {/* Vitals Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-2 border-blue-200 dark:border-blue-800">
                    <div className="flex items-center justify-between mb-2">
                      <Heart className="w-8 h-8 text-blue-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">BPM</span>
                    </div>
                    <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">{vitals.heartRate}</div>
                  </div>

                  <div className="p-6 bg-cyan-50 dark:bg-cyan-900/20 rounded-xl border-2 border-cyan-200 dark:border-cyan-800">
                    <div className="flex items-center justify-between mb-2">
                      <Activity className="w-8 h-8 text-cyan-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">SpO2</span>
                    </div>
                    <div className="text-4xl font-bold text-cyan-600 dark:text-cyan-400">{vitals.spO2}%</div>
                  </div>

                  <div className="p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl border-2 border-purple-200 dark:border-purple-800">
                    <div className="flex items-center justify-between mb-2">
                      <MessageSquare className="w-8 h-8 text-purple-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Mood</span>
                    </div>
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{vitals.mood}</div>
                  </div>
                </div>

                {/* Emergency Button */}
                <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-300 dark:border-red-800 rounded-xl p-8 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="w-8 h-8 text-red-500" />
                      <span className="text-lg font-bold text-red-700 dark:text-red-400">Emergency</span>
                    </div>
                    <button className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xl transition-all hover:scale-105">
                      PRESS FOR HELP
                    </button>
                  </div>
                </div>

                {/* Navigation */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-800 dark:bg-gray-900 rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold">Navigation</h3>
                      <NavIcon className="w-6 h-6" />
                    </div>
                    <p className="text-gray-400 mb-4">Visual SLAM Map</p>
                    <button className="w-full py-3 bg-teal-500 hover:bg-teal-600 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2">
                      <span>Tap to Open</span>
                      <Map className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold">AI Companion</h3>
                      <MessageSquare className="w-6 h-6" />
                    </div>
                    <p className="text-teal-100 italic mb-4">"Say 'Take me to the kitchen...'"</p>
                    <button className="w-full py-3 bg-white/20 hover:bg-white/30 backdrop-blur rounded-lg font-semibold transition-all flex items-center justify-center space-x-2">
                      <Zap className="w-5 h-5" />
                      <span>Speak (Arabic)</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Caregiver View */}
            {selectedUser === 'caregiver' && (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      Caregiver Portal
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      Patient: Mohamed | Device: {vitals.isOnline ? 'Online' : 'Offline'}
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  {/* Live Vitals */}
                  <div className="md:col-span-1">
                    <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
                      <Activity className="w-6 h-6 mr-2 text-blue-500" />
                      Live Vitals
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg">
                        <span className="text-gray-600 dark:text-gray-400">Heart Rate</span>
                        <span className="text-xl font-bold text-blue-600 dark:text-blue-400">{vitals.heartRate} bpm</span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg">
                        <span className="text-gray-600 dark:text-gray-400">SpO2</span>
                        <span className="text-xl font-bold text-cyan-600 dark:text-cyan-400">{vitals.spO2} %</span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg">
                        <span className="text-gray-600 dark:text-gray-400">Temperature</span>
                        <span className="text-xl font-bold text-purple-600 dark:text-purple-400">{vitals.temperature}°C</span>
                      </div>
                    </div>
                  </div>

                  {/* Live Location */}
                  <div className="md:col-span-1">
                    <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
                      <MapPin className="w-6 h-6 mr-2 text-green-500" />
                      Live Location
                    </h3>
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border-2 border-green-200 dark:border-green-800">
                      <div className="w-16 h-16 bg-red-500 rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse">
                        <MapPin className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="text-2xl font-bold text-center mb-2 text-gray-900 dark:text-white">
                        {location.name}
                      </h4>
                      <p className="text-center text-gray-600 dark:text-gray-400 text-sm mb-1">
                        GPS: {location.gps}
                      </p>
                      <p className="text-center text-green-600 dark:text-green-400 text-xs">
                        Updated: {location.lastUpdate}
                      </p>
                    </div>
                  </div>

                  {/* Alert Feed */}
                  <div className="md:col-span-1">
                    <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
                      <Bell className="w-6 h-6 mr-2 text-orange-500" />
                      Alert Feed
                    </h3>
                    <div className="space-y-3">
                      {alerts.length === 0 ? (
                        <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg text-center text-gray-500">
                          No recent alerts
                        </div>
                      ) : (
                        alerts.slice(0, 5).map((alert) => (
                          <div
                            key={alert.id}
                            className={`p-4 rounded-lg border-l-4 ${
                              alert.type === 'critical'
                                ? 'bg-red-50 dark:bg-red-900/20 border-red-500'
                                : alert.type === 'warning'
                                ? 'bg-orange-50 dark:bg-orange-900/20 border-orange-500'
                                : 'bg-blue-50 dark:bg-blue-900/20 border-blue-500'
                            }`}
                          >
                            <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                              {alert.message}
                            </p>
                            <p className="text-xs text-gray-500">{alert.time}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Healthcare Professional View */}
            {selectedUser === 'healthcare' && (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      Healthcare Portal
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      Medical reports and patient health analytics
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Reports Section */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-purple-200 dark:border-purple-800">
                    <div className="flex items-center mb-6">
                      <FileText className="w-8 h-8 text-purple-500 mr-3" />
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Reports</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all cursor-pointer">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-gray-900 dark:text-white">Weekly Health Report</span>
                          <TrendingUp className="w-5 h-5 text-green-500" />
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Dec 25 - Dec 31, 2024</p>
                        <div className="mt-3 flex items-center justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Avg HR: 78 bpm</span>
                          <span className="text-gray-600 dark:text-gray-400">Avg SpO2: 97%</span>
                        </div>
                      </div>

                      <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all cursor-pointer">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-gray-900 dark:text-white">Fall Detection History</span>
                          <AlertTriangle className="w-5 h-5 text-orange-500" />
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Last 30 days</p>
                        <div className="mt-3 text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Total Incidents: 0</span>
                        </div>
                      </div>

                      <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all cursor-pointer">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-gray-900 dark:text-white">Medication Adherence</span>
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Current month</p>
                        <div className="mt-3 text-sm">
                          <span className="text-green-600 dark:text-green-400 font-semibold">98% Compliance</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Patient Stats */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-purple-200 dark:border-purple-800">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Patient Analytics</h3>
                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-600 dark:text-gray-400">Activity Level</span>
                          <span className="font-bold text-green-600 dark:text-green-400">High</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                          <div className="bg-green-500 h-3 rounded-full" style={{ width: '82%' }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-600 dark:text-gray-400">Sleep Quality</span>
                          <span className="font-bold text-blue-600 dark:text-blue-400">Good</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                          <div className="bg-blue-500 h-3 rounded-full" style={{ width: '75%' }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-600 dark:text-gray-400">Mood Score</span>
                          <span className="font-bold text-purple-600 dark:text-purple-400">Stable</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                          <div className="bg-purple-500 h-3 rounded-full" style={{ width: '70%' }} />
                        </div>
                      </div>

                      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                        <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">Recent Checkups</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">Blood Pressure</span>
                            <span className="text-gray-900 dark:text-white">120/80 mmHg</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">Weight</span>
                            <span className="text-gray-900 dark:text-white">72 kg</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">Last Visit</span>
                            <span className="text-gray-900 dark:text-white">Dec 20, 2024</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Administrator View */}
            {selectedUser === 'admin' && (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      System Administration
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      Diagnostics, monitoring, and event simulation
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Sensor Health */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700">
                    <div className="flex items-center mb-6">
                      <Settings className="w-8 h-8 text-gray-700 dark:text-gray-300 mr-3" />
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Sensor Health (Diagnostics)</h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                      Click to simulate sensor failure (Fault Injection).
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { name: 'Lidar', status: 'healthy' },
                        { name: 'IMU', status: 'healthy' },
                        { name: 'Camera', status: 'healthy' },
                        { name: 'Motor', status: 'healthy' }
                      ].map((sensor) => (
                        <div
                          key={sensor.name}
                          className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-2 border-green-300 dark:border-green-800 cursor-pointer hover:bg-green-100 dark:hover:bg-green-900/30 transition-all"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-gray-900 dark:text-white">{sensor.name}</span>
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Event Simulation */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700">
                    <div className="flex items-center mb-6">
                      <Zap className="w-8 h-8 text-orange-500 mr-3" />
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Event Simulation</h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                      Trigger scenarios to test system response.
                    </p>
                    <div className="space-y-4">
                      <button
                        onClick={simulateEmergency}
                        className="w-full p-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition-all flex items-center justify-center space-x-3"
                      >
                        <AlertTriangle className="w-6 h-6" />
                        <span>Simulate "User Fall"</span>
                      </button>

                      <button
                        onClick={simulateLowBattery}
                        className="w-full p-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg transition-all flex items-center justify-center space-x-3"
                      >
                        <Battery className="w-6 h-6" />
                        <span>Simulate "Low Battery"</span>
                      </button>
                    </div>

                    <div className="mt-6 p-4 bg-gray-900 dark:bg-black rounded-lg">
                      <div className="font-mono text-xs text-green-400">
                        <div>System Status: ONLINE</div>
                        <div>Battery Voltage: {vitals.batteryLevel.toFixed(1)}%</div>
                        <div>MQTT Stream: Active</div>
                        <div>WebSocket: Connected</div>
                        <div className="mt-2 text-yellow-400">
                          {alerts.length > 0 ? `Latest: ${alerts[0].message}` : 'No active alerts'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SystemDemo;
