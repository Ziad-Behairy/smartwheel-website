import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, ChevronRight, X } from 'lucide-react';

interface Layer {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  details: string[];
  color: string;
  bgColor: string;
}

const Architecture: React.FC = () => {
  const [selectedLayer, setSelectedLayer] = useState<Layer | null>(null);

  const layers: Layer[] = [
    {
      id: 'presentation',
      name: 'Presentation Layer',
      description: 'User interfaces for wheelchair users, caregivers, and administrators',
      technologies: ['Flutter (iOS/Android)', 'React.js (Web)', 'Android Tablet UI'],
      details: [
        'MVVM architecture pattern for UI/business logic separation',
        'Cross-platform mobile app with 95%+ code reuse',
        'Real-time dashboard for healthcare professionals',
        'On-wheelchair tablet interface for user interaction',
        'Built-in Arabic RTL support for Egyptian market',
      ],
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-500',
    },
    {
      id: 'application',
      name: 'Application Layer',
      description: 'Core business logic and service orchestration',
      technologies: ['Dart', 'Python (ROS)', 'Cloud Functions', 'Node.js'],
      details: [
        'VitalProcessor: Analyzes sensor data and detects anomalies',
        'NavigationController: SLAM navigation and path planning',
        'EmergencyOrchestrator: Multi-channel notification system',
        'DataSyncManager: Offline queuing and cloud synchronization',
        'Type-safe, async-first design for real-time operations',
      ],
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-500',
    },
    {
      id: 'data',
      name: 'Data Layer',
      description: 'Persistent storage and data management',
      technologies: ['Firestore (NoSQL)', 'Cloud Storage', 'Realtime Database', 'SQLite (Edge)'],
      details: [
        'Firestore: User accounts, health records, alerts',
        'Cloud Storage: Binary data (images, reports)',
        'Realtime Database: Current vitals with 24h TTL',
        'SQLite: Offline buffer during network outages',
        'ACID guarantees for critical transactions',
      ],
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-500',
    },
    {
      id: 'event',
      name: 'Event Layer',
      description: 'Real-time communication and event-driven workflows',
      technologies: ['MQTT Broker', 'WebSocket', 'FCM', 'Cloud Functions'],
      details: [
        'MQTT: Lightweight pub/sub for Raspberry Pi → Cloud (55% bandwidth reduction)',
        'WebSocket: Full-duplex for mobile app ↔ cloud sync',
        'FCM: Push notifications to mobile devices',
        'QoS levels: 0 (location), 1 (vitals), 2 (emergencies)',
        '2.3-second average latency for critical alerts',
      ],
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-500',
    },
    {
      id: 'edge',
      name: 'Edge Layer',
      description: 'Hardware sensors and edge computing',
      technologies: ['Raspberry Pi 5', 'Arduino Mega', 'Sensors (MAX30102, MLX90614, MPU6050)', 'Cameras (ORB-SLAM)'],
      details: [
        'Raspberry Pi 5: Central edge compute running Ubuntu 22.04',
        'Arduino Mega 2560: Motor control and safety monitoring',
        'MAX30102: Heart rate and SpO2 sensing',
        'MLX90614: Non-contact temperature measurement',
        'MPU6050: IMU for fall detection',
        '2-4× RGB cameras for Visual SLAM navigation',
      ],
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-500',
    },
  ];

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
            System Architecture
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Hybrid Layered-Event-Driven Architecture combining structural clarity with real-time responsiveness
          </p>
        </motion.div>

        {/* Interactive Layer Diagram */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="glass-card p-8">
            <div className="flex items-center mb-6">
              <Layers className="w-6 h-6 mr-2 text-primary" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                5-Layer Architecture
              </h2>
            </div>

            <div className="space-y-4">
              {layers.map((layer, index) => (
                <motion.div
                  key={layer.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <button
                    onClick={() => setSelectedLayer(layer)}
                    className="w-full text-left group"
                  >
                    <div
                      className={`relative p-6 rounded-lg bg-gradient-to-r ${layer.color} text-white hover:shadow-2xl transition-all transform hover:scale-102`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold mb-2">{layer.name}</h3>
                          <p className="text-white/90 mb-3">{layer.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {layer.technologies.map((tech, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                        <ChevronRight className="w-6 h-6 ml-4 group-hover:translate-x-1 transition-transform" />
                      </div>

                      {/* Connection line to next layer */}
                      {index < layers.length - 1 && (
                        <div className="absolute left-1/2 -bottom-4 transform -translate-x-1/2">
                          <motion.div
                            animate={{ y: [0, 4, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            className="w-1 h-8 bg-gradient-to-b from-gray-400 to-transparent rounded-full"
                          />
                        </div>
                      )}
                    </div>
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Architecture Justification */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid md:grid-cols-2 gap-6"
        >
          <div className="glass-card p-6">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Why Layered Architecture?</h3>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li className="flex items-start">
                <span className="text-secondary mr-2">✓</span>
                <span>Clear separation of concerns for parallel development</span>
              </li>
              <li className="flex items-start">
                <span className="text-secondary mr-2">✓</span>
                <span>Independent scalability of each layer</span>
              </li>
              <li className="flex items-start">
                <span className="text-secondary mr-2">✓</span>
                <span>Easier testing and maintenance</span>
              </li>
              <li className="flex items-start">
                <span className="text-secondary mr-2">✓</span>
                <span>Technology flexibility per layer</span>
              </li>
            </ul>
          </div>

          <div className="glass-card p-6">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Event-Driven Benefits</h3>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li className="flex items-start">
                <span className="text-secondary mr-2">✓</span>
                <span>Real-time vitals monitoring with instant sync</span>
              </li>
              <li className="flex items-start">
                <span className="text-secondary mr-2">✓</span>
                <span>Sub-5-second emergency response</span>
              </li>
              <li className="flex items-start">
                <span className="text-secondary mr-2">✓</span>
                <span>Asynchronous, non-blocking operations</span>
              </li>
              <li className="flex items-start">
                <span className="text-secondary mr-2">✓</span>
                <span>Loose coupling between components</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Layer Detail Modal */}
        <AnimatePresence>
          {selectedLayer && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedLayer(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              >
                <div className={`p-6 bg-gradient-to-r ${selectedLayer.color} text-white rounded-t-xl`}>
                  <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold">{selectedLayer.name}</h2>
                    <button
                      onClick={() => setSelectedLayer(null)}
                      className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  <p className="mt-2 text-white/90">{selectedLayer.description}</p>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Key Technologies</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedLayer.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className={`px-4 py-2 ${selectedLayer.bgColor} text-white rounded-lg font-medium`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Detailed Components</h3>
                  <ul className="space-y-3">
                    {selectedLayer.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start text-gray-700 dark:text-gray-300">
                        <span className="text-secondary mr-2 mt-1">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Architecture;
