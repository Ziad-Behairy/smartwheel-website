import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import type { EmergencyEvent } from '../types';

const EmergencySimulator: React.FC = () => {
  const [alertActive, setAlertActive] = useState(false);
  const [timeline, setTimeline] = useState<EmergencyEvent[]>([]);
  const [currentTime, setCurrentTime] = useState(0);

  const emergencyEvents: EmergencyEvent[] = [
    { time: 0, message: '🚨 Fall detected (IMU: 35° tilt)', status: 'completed' },
    { time: 1000, message: '💓 Abnormal vitals: HR 145bpm, SpO2 88%', status: 'completed' },
    { time: 2000, message: '📡 MQTT message → Cloud Function triggered', status: 'completed' },
    { time: 3000, message: '🔍 Emergency contacts retrieved from Firestore', status: 'completed' },
    { time: 4000, message: '📱 SMS + FCM notifications sent', status: 'completed' },
    { time: 5000, message: '✅ Caregiver alerted successfully', status: 'completed' },
  ];

  const triggerEmergency = async () => {
    setAlertActive(true);
    setTimeline([]);
    setCurrentTime(0);

    for (const event of emergencyEvents) {
      await new Promise((resolve) => setTimeout(resolve, event.time === 0 ? 0 : 1000));
      setCurrentTime(event.time);
      setTimeline((prev) => [...prev, event]);
    }

    setTimeout(() => {
      setAlertActive(false);
      setCurrentTime(0);
    }, 7000);
  };

  return (
    <div className="glass-card p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Emergency Alert Simulator</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Demonstrates the complete emergency response flow from detection to caregiver notification
          </p>
        </div>
        {alertActive && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex items-center space-x-2 text-danger"
          >
            <Clock className="w-6 h-6 animate-pulse" />
            <span className="text-2xl font-bold font-mono">{currentTime}ms</span>
          </motion.div>
        )}
      </div>

      <button
        onClick={triggerEmergency}
        disabled={alertActive}
        className={`w-full sm:w-auto px-8 py-4 rounded-lg font-semibold text-white transition-all transform ${
          alertActive
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-danger hover:bg-red-600 hover:scale-105 shadow-lg hover:shadow-xl'
        }`}
      >
        <span className="flex items-center justify-center space-x-2">
          <AlertTriangle className="w-5 h-5" />
          <span>{alertActive ? 'Simulation Running...' : '🚨 Trigger Fall Detection'}</span>
        </span>
      </button>

      {/* Timeline */}
      <div className="mt-8 space-y-3">
        <AnimatePresence>
          {timeline.map((event, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border-l-4 border-primary"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {idx === timeline.length - 1 && timeline.length === emergencyEvents.length ? (
                    <CheckCircle className="w-6 h-6 text-secondary flex-shrink-0" />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-primary flex-shrink-0 animate-pulse" />
                  )}
                  <span className="text-gray-900 dark:text-white">{event.message}</span>
                </div>
                <span className="text-primary font-mono font-bold text-sm whitespace-nowrap ml-4">
                  {event.time}ms
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {timeline.length === 0 && !alertActive && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-500">
            Click the button above to simulate a fall detection emergency
          </div>
        )}
      </div>

      {/* Success message */}
      {timeline.length === emergencyEvents.length && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 p-6 bg-gradient-to-r from-secondary/10 to-primary/10 rounded-lg border-2 border-secondary"
        >
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-8 h-8 text-secondary" />
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Emergency Response Complete!</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Total response time: <strong className="text-secondary">5 seconds</strong> - Caregiver successfully notified
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default EmergencySimulator;
