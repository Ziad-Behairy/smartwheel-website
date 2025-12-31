import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Server, Cpu, Wrench, ChevronDown, ChevronUp } from 'lucide-react';

interface ADRCardProps {
  title: string;
  decision: string;
  rationale: string[];
  pros: string[];
  cons: string[];
  color: string;
}

const ADRCard: React.FC<ADRCardProps> = ({ title, decision, rationale, pros, cons, color }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="glass-card p-6">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left"
      >
        <div className="flex items-center justify-between">
          <h3 className={`text-xl font-bold ${color}`}>{title}</h3>
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
        <p className="mt-2 text-gray-700 dark:text-gray-300 font-medium">{decision}</p>
      </button>

      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-4 space-y-4"
        >
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Rationale:</h4>
            <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
              {rationale.map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-secondary mb-2">✓ Pros:</h4>
              <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                {pros.map((item, idx) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-danger mb-2">✗ Trade-offs:</h4>
              <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                {cons.map((item, idx) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

const TechStack: React.FC = () => {
  const techCategories = [
    {
      icon: <Code2 className="w-6 h-6" />,
      name: 'Frontend',
      color: 'text-blue-500',
      bgColor: 'bg-blue-500',
      technologies: [
        { name: 'Flutter', purpose: 'Cross-platform mobile app' },
        { name: 'React.js', purpose: 'Web dashboard' },
        { name: 'Dart', purpose: 'Flutter programming language' },
        { name: 'Tailwind CSS', purpose: 'UI styling' },
      ],
    },
    {
      icon: <Server className="w-6 h-6" />,
      name: 'Backend',
      color: 'text-green-500',
      bgColor: 'bg-green-500',
      technologies: [
        { name: 'Firebase Firestore', purpose: 'NoSQL database' },
        { name: 'Cloud Functions', purpose: 'Serverless compute' },
        { name: 'Firebase Auth', purpose: 'Authentication & RBAC' },
        { name: 'Cloud Storage', purpose: 'Binary data storage' },
      ],
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      name: 'Edge Computing',
      color: 'text-purple-500',
      bgColor: 'bg-purple-500',
      technologies: [
        { name: 'Raspberry Pi 5', purpose: 'Central edge compute' },
        { name: 'Python', purpose: 'ROS & sensor integration' },
        { name: 'MQTT', purpose: 'Lightweight messaging' },
        { name: 'ORB-SLAM', purpose: 'Visual navigation' },
      ],
    },
    {
      icon: <Wrench className="w-6 h-6" />,
      name: 'Tools & DevOps',
      color: 'text-orange-500',
      bgColor: 'bg-orange-500',
      technologies: [
        { name: 'GitHub', purpose: 'Version control' },
        { name: 'Jira', purpose: 'Agile project management' },
        { name: 'GitHub Actions', purpose: 'CI/CD pipeline' },
        { name: 'Slack', purpose: 'Team communication' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Technology Stack
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Carefully selected technologies for performance, scalability, and rapid development
          </p>
        </motion.div>

        {/* Technology Categories */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {techCategories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6"
            >
              <div className="flex items-center mb-4">
                <div className={`p-3 rounded-lg ${category.bgColor} text-white mr-3`}>
                  {category.icon}
                </div>
                <h2 className={`text-2xl font-bold ${category.color}`}>{category.name}</h2>
              </div>

              <div className="space-y-3">
                {category.technologies.map((tech, idx) => (
                  <div key={idx} className="flex items-start">
                    <span className={`mt-1 mr-2 ${category.color}`}>▪</span>
                    <div>
                      <span className="font-semibold text-gray-900 dark:text-white">{tech.name}</span>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{tech.purpose}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ADR Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white text-center">
            Architecture Decision Records (ADRs)
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <ADRCard
              title="ADR-001: Flutter for Cross-Platform"
              decision="Adopt Flutter for all mobile and web interfaces"
              rationale={[
                '95%+ code reuse between iOS, Android, and web',
                '40% faster development vs native development',
                'Built-in Arabic RTL support for Egyptian market',
                '60fps performance on mid-range devices',
              ]}
              pros={[
                'Reduced timeline by 6-8 weeks',
                'Consistent UI/UX across platforms',
                'Strong Firebase integration',
              ]}
              cons={[
                'Team must learn Dart (2-week ramp-up)',
                'APK 20-30MB larger than native',
              ]}
              color="text-blue-600"
            />

            <ADRCard
              title="ADR-002: Hybrid MQTT/WebSocket Protocol"
              decision="MQTT for Edge→Cloud, WebSocket for Cloud→Mobile"
              rationale={[
                '55% bandwidth reduction with MQTT binary protocol',
                'QoS levels for different message priorities',
                'Offline queue for network disconnects',
                '50KB RAM usage vs 200KB for WebSocket on Raspberry Pi',
              ]}
              pros={[
                '2.3-second average latency for critical alerts',
                'Automatic reconnection with message replay',
                'Efficient for IoT devices',
              ]}
              cons={[
                'Two protocol stacks to maintain',
                'MQTT broker infrastructure required',
              ]}
              color="text-green-600"
            />

            <ADRCard
              title="ADR-003: Firebase Backend Platform"
              decision="Use Firestore + Realtime DB + Cloud Storage hybrid"
              rationale={[
                'Real-time listeners with 200ms sync latency',
                'Offline persistence for mobile app',
                'ACID transaction guarantees',
                '99.9% cost reduction through aggregation',
                'Zero infrastructure management',
              ]}
              pros={[
                'Google-managed scaling and backups',
                'Estimated $15-25/month for 100 users',
                'Official Flutter SDK support',
              ]}
              cons={[
                'Vendor lock-in to Google ecosystem',
                'Query limitations in Firestore',
              ]}
              color="text-purple-600"
            />

            <ADRCard
              title="ADR-004: Firebase Auth + RBAC"
              decision="Firebase Authentication with role-based access control"
              rationale={[
                'Built-in support for email, phone, and SSO',
                'Custom claims for role-based permissions',
                'Device tracking and anomaly detection',
                'Declarative security rules at database level',
              ]}
              pros={[
                '2FA mandatory for caregivers',
                'Session timeout and audit logging',
                'Compliance with Egyptian Law 151/2020',
              ]}
              cons={[
                'Custom token generation complexity',
                'Limited to Firebase ecosystem',
              ]}
              color="text-orange-600"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TechStack;
