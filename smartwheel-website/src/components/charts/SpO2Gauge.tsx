import React from 'react';
import { motion } from 'framer-motion';

interface SpO2GaugeProps {
  value: number;
}

const SpO2Gauge: React.FC<SpO2GaugeProps> = ({ value }) => {
  const percentage = Math.min(Math.max(value, 0), 100);
  const circumference = 2 * Math.PI * 90; // radius = 90
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Determine color based on value
  const getColor = () => {
    if (percentage >= 95) return '#10B981'; // Green - healthy
    if (percentage >= 90) return '#F59E0B'; // Amber - warning
    return '#EF4444'; // Red - critical
  };

  return (
    <div className="relative w-48 h-48 mx-auto">
      <svg className="transform -rotate-90 w-48 h-48">
        {/* Background circle */}
        <circle
          cx="96"
          cy="96"
          r="90"
          stroke="currentColor"
          strokeWidth="12"
          fill="none"
          className="text-gray-200 dark:text-gray-700"
        />
        {/* Progress circle */}
        <motion.circle
          cx="96"
          cy="96"
          r="90"
          stroke={getColor()}
          strokeWidth="12"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </svg>
      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.div
          key={value}
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-4xl font-bold"
          style={{ color: getColor() }}
        >
          {percentage}
        </motion.div>
        <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">% SpO2</div>
      </div>
    </div>
  );
};

export default SpO2Gauge;
