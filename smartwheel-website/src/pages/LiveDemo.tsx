import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Wifi, WifiOff } from 'lucide-react';
import { useWebSocket } from '../hooks/useWebSocket';
import HeartRateChart from '../components/charts/HeartRateChart';
import SpO2Gauge from '../components/charts/SpO2Gauge';
import TemperatureDisplay from '../components/charts/TemperatureDisplay';
import EmergencySimulator from '../components/EmergencySimulator';

const LiveDemo: React.FC = () => {
  const { vitals, connected } = useWebSocket('ws://localhost:3001');
  const [heartRateHistory, setHeartRateHistory] = useState<number[]>([]);
  const [timeLabels, setTimeLabels] = useState<string[]>([]);

  useEffect(() => {
    if (vitals) {
      const time = new Date(vitals.timestamp).toLocaleTimeString();
      setHeartRateHistory((prev) => {
        const newHistory = [...prev, vitals.heartRate];
        return newHistory.slice(-20); // Keep last 20 readings
      });
      setTimeLabels((prev) => {
        const newLabels = [...prev, time];
        return newLabels.slice(-20);
      });
    }
  }, [vitals]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Live Demo Dashboard
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
            Real-time vitals monitoring and emergency response simulation
          </p>

          {/* Connection Status */}
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white dark:bg-gray-800 shadow-lg">
            {connected ? (
              <>
                <Wifi className="w-5 h-5 text-secondary" />
                <span className="text-secondary font-semibold">● Live</span>
              </>
            ) : (
              <>
                <WifiOff className="w-5 h-5 text-gray-400" />
                <span className="text-gray-400 font-semibold">● Offline</span>
              </>
            )}
            <span className="text-gray-600 dark:text-gray-400 text-sm">
              {connected ? 'Connected to WebSocket' : 'Waiting for connection...'}
            </span>
          </div>
        </motion.div>

        {/* Vitals Monitoring Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center">
            <Activity className="w-6 h-6 mr-2 text-primary" />
            Real-Time Vitals Monitor
          </h2>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Heart Rate Chart */}
            <div className="lg:col-span-2 glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Heart Rate</h3>
                <div className="flex items-center space-x-2">
                  {connected && <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />}
                  <span className="text-3xl font-bold text-danger">
                    {vitals?.heartRate || '--'} <span className="text-lg text-gray-600 dark:text-gray-400">bpm</span>
                  </span>
                </div>
              </div>
              <div className="h-64">
                {heartRateHistory.length > 0 ? (
                  <HeartRateChart data={heartRateHistory} labels={timeLabels} />
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-500">
                    Waiting for data...
                  </div>
                )}
              </div>
            </div>

            {/* SpO2 Gauge */}
            <div className="glass-card p-6 flex flex-col items-center justify-center">
              <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Oxygen Saturation</h3>
              <SpO2Gauge value={vitals?.spO2 || 0} />
              <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                {vitals?.spO2 && vitals.spO2 >= 95
                  ? 'Normal Range'
                  : vitals?.spO2 && vitals.spO2 >= 90
                  ? 'Moderate Concern'
                  : vitals?.spO2
                  ? 'Critical - Alert Required'
                  : 'No Data'}
              </p>
            </div>

            {/* Temperature Display */}
            <div className="lg:col-span-3 glass-card p-6">
              <h3 className="text-xl font-semibold mb-6 text-center text-gray-900 dark:text-white">
                Body Temperature
              </h3>
              <TemperatureDisplay value={vitals?.temperature || 36.8} />
            </div>
          </div>
        </motion.div>

        {/* Emergency Alert Simulator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <EmergencySimulator />
        </motion.div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 glass-card p-6"
        >
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">How It Works</h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-700 dark:text-gray-300">
            <div>
              <h4 className="font-semibold text-primary mb-2">Real-Time Monitoring</h4>
              <p>
                SmartWheel continuously tracks vital signs every 60 seconds using MAX30102 (HR/SpO2) and MLX90614
                (temperature) sensors connected to Raspberry Pi 5.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-primary mb-2">WebSocket Sync</h4>
              <p>
                Data is transmitted via MQTT to Firebase Realtime Database, then synced to the mobile app and web
                dashboard through WebSocket connections for instant updates.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-primary mb-2">Emergency Response</h4>
              <p>
                When abnormal patterns are detected (fall + critical vitals), Cloud Functions trigger multi-channel
                alerts (FCM push, SMS, auto-call) within 5 seconds.
              </p>
            </div>
          </div>
        </motion.div>

        {!connected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg"
          >
            <p className="text-yellow-800 dark:text-yellow-200 text-sm">
              <strong>Note:</strong> WebSocket server is not running. Start the backend server to see live vitals
              updates. Emergency simulator works independently.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default LiveDemo;
