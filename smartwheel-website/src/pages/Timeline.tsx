import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle, Clock, PlayCircle } from 'lucide-react';

interface SprintCardProps {
  sprint: number;
  phase: string;
  deliverables: string[];
  status: 'completed' | 'in-progress' | 'upcoming';
  delay: number;
}

const SprintCard: React.FC<SprintCardProps> = ({ sprint, phase, deliverables, status, delay }) => {
  const statusConfig = {
    completed: { icon: <CheckCircle className="w-5 h-5" />, color: 'bg-secondary', textColor: 'text-secondary' },
    'in-progress': { icon: <PlayCircle className="w-5 h-5" />, color: 'bg-primary', textColor: 'text-primary' },
    upcoming: { icon: <Clock className="w-5 h-5" />, color: 'bg-gray-400', textColor: 'text-gray-400' },
  };

  const config = statusConfig[status];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="glass-card p-6 hover:shadow-xl transition-shadow"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Sprint {sprint}</h3>
          <p className={`text-sm font-semibold ${config.textColor}`}>{phase}</p>
        </div>
        <div className={`p-3 rounded-full ${config.color} text-white`}>{config.icon}</div>
      </div>

      <ul className="space-y-2">
        {deliverables.map((item, idx) => (
          <li key={idx} className="flex items-start text-sm text-gray-700 dark:text-gray-300">
            <span className="mr-2 mt-1">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

const Timeline: React.FC = () => {
  const sprints = [
    {
      phase: 'Foundation',
      sprints: [
        { sprint: 1, deliverables: ['Project setup', 'Hardware procurement', 'Team onboarding'], status: 'completed' as const },
        { sprint: 2, deliverables: ['Raspberry Pi setup', 'Sensor integration', 'Basic Flutter app'], status: 'completed' as const },
        { sprint: 3, deliverables: ['Firebase configuration', 'MQTT broker setup', 'Auth implementation'], status: 'completed' as const },
        { sprint: 4, deliverables: ['SLAM research', 'Mobile UI/UX design', 'Cloud Functions skeleton'], status: 'completed' as const },
        { sprint: 5, deliverables: ['Basic navigation', 'Vitals reading', 'Database schema'], status: 'completed' as const },
        { sprint: 6, deliverables: ['Integration testing', 'Sprint demos', 'Foundation review'], status: 'completed' as const },
      ],
    },
    {
      phase: 'MVP',
      sprints: [
        { sprint: 7, deliverables: ['ORB-SLAM integration', 'Real-time vitals sync', 'Alert system'], status: 'in-progress' as const },
        { sprint: 8, deliverables: ['Obstacle avoidance', 'Emergency flow', 'Caregiver dashboard'], status: 'in-progress' as const },
        { sprint: 9, deliverables: ['Voice commands', 'Path planning', 'Multi-channel notifications'], status: 'upcoming' as const },
        { sprint: 10, deliverables: ['Emotion recognition', 'Offline mode', 'Performance optimization'], status: 'upcoming' as const },
        { sprint: 11, deliverables: ['Security hardening', 'Compliance check', 'User testing'], status: 'upcoming' as const },
        { sprint: 12, deliverables: ['MVP demo', 'Documentation', 'Stakeholder presentation'], status: 'upcoming' as const },
      ],
    },
    {
      phase: 'Enhancement',
      sprints: [
        { sprint: 13, deliverables: ['AI companion', 'Arabic NLP', 'Emotion timeline'], status: 'upcoming' as const },
        { sprint: 14, deliverables: ['Advanced SLAM', 'Battery optimization', 'Reports generation'], status: 'upcoming' as const },
        { sprint: 15, deliverables: ['Dark mode', 'Accessibility features', 'Localization'], status: 'upcoming' as const },
        { sprint: 16, deliverables: ['Load testing', 'Security audit', 'Final optimizations'], status: 'upcoming' as const },
      ],
    },
    {
      phase: 'Finalization',
      sprints: [
        { sprint: 17, deliverables: ['Bug fixes', 'Final testing', 'Documentation completion'], status: 'upcoming' as const },
        { sprint: 18, deliverables: ['Final demo', 'Submission', 'Project defense preparation'], status: 'upcoming' as const },
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
            Development Timeline
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-6">
            18 Sprints × 2 Weeks = 9 Months • October 2025 - June 2026
          </p>

          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg glass-card">
            <Calendar className="w-5 h-5 text-primary" />
            <span className="text-gray-700 dark:text-gray-300 font-medium">Agile/Scrum Methodology</span>
          </div>
        </motion.div>

        {/* Sprint Grid by Phase */}
        {sprints.map((phaseData, phaseIdx) => (
          <div key={phaseData.phase} className="mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: phaseIdx * 0.1 }}
              className="mb-6"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Phase {phaseIdx + 1}: {phaseData.phase}
              </h2>
              <div className="h-1 w-32 bg-gradient-to-r from-primary to-accent rounded-full"></div>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {phaseData.sprints.map((sprint, idx) => (
                <SprintCard
                  key={sprint.sprint}
                  sprint={sprint.sprint}
                  phase={phaseData.phase}
                  deliverables={sprint.deliverables}
                  status={sprint.status}
                  delay={phaseIdx * 0.1 + idx * 0.05}
                />
              ))}
            </div>
          </div>
        ))}

        {/* Agile Ceremonies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-card p-8 mt-12"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Sprint Ceremonies</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <h3 className="font-semibold text-primary mb-2">Sprint Planning</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Every 2 weeks (Monday 9AM)</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Duration: 2 hours</p>
            </div>

            <div>
              <h3 className="font-semibold text-primary mb-2">Daily Standup</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Daily (10AM, Slack async)</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Duration: 15 minutes</p>
            </div>

            <div>
              <h3 className="font-semibold text-primary mb-2">Sprint Review</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Every 2 weeks (Friday 2PM)</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Duration: 1 hour</p>
            </div>

            <div>
              <h3 className="font-semibold text-primary mb-2">Retrospective</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Every 2 weeks (Friday 3PM)</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Duration: 30 minutes</p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Key Metrics</h3>
            <div className="grid md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold text-primary">40-50</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Story Points/Sprint</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary">&gt;80%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Code Coverage</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent">&lt;5</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Bugs/1000 LOC</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-500">4/5</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Team Satisfaction</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Timeline;
