import React from 'react';
import { motion } from 'framer-motion';
import { Thermometer } from 'lucide-react';

interface TemperatureDisplayProps {
  value: number;
}

const TemperatureDisplay: React.FC<TemperatureDisplayProps> = ({ value }) => {
  const minTemp = 35;
  const maxTemp = 40;
  const percentage = Math.min(Math.max(((value - minTemp) / (maxTemp - minTemp)) * 100, 0), 100);

  // Determine color based on temperature
  const getColor = () => {
    if (value >= 37.5) return '#EF4444'; // Red - fever
    if (value >= 37.0) return '#F59E0B'; // Amber - elevated
    if (value >= 36.0) return '#10B981'; // Green - normal
    return '#3B82F6'; // Blue - low
  };

  return (
    <div className="flex items-center justify-center space-x-6">
      {/* Thermometer visualization */}
      <div className="relative w-8 h-48 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className="absolute bottom-0 left-0 right-0 rounded-full"
          style={{ backgroundColor: getColor() }}
          initial={{ height: '0%' }}
          animate={{ height: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
        <div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full"
          style={{ backgroundColor: getColor() }}
        />
      </div>

      {/* Temperature reading */}
      <div className="text-center">
        <div className="flex items-center space-x-2 mb-2">
          <Thermometer className="w-6 h-6" style={{ color: getColor() }} />
        </div>
        <motion.div
          key={value}
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-4xl font-bold"
          style={{ color: getColor() }}
        >
          {value.toFixed(1)}°C
        </motion.div>
        <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Body Temperature</div>
        <div className="mt-2 text-xs font-medium">
          {value >= 37.5 ? (
            <span className="text-danger">High</span>
          ) : value >= 37.0 ? (
            <span className="text-yellow-600">Elevated</span>
          ) : value >= 36.0 ? (
            <span className="text-secondary">Normal</span>
          ) : (
            <span className="text-primary">Low</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TemperatureDisplay;
