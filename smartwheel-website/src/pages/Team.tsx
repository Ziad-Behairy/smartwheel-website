import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Award, Users } from 'lucide-react';

interface TeamMemberCardProps {
  name: string;
  role: string;
  responsibilities: string[];
  delay: number;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ name, role, responsibilities, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="glass-card p-6 hover:shadow-2xl transition-all group"
    >
      {/* Avatar */}
      <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white text-3xl font-bold group-hover:scale-110 transition-transform">
        {name.charAt(0)}
      </div>

      {/* Name & Role */}
      <h3 className="text-xl font-bold text-center mb-1 text-gray-900 dark:text-white">{name}</h3>
      <p className="text-center text-primary font-semibold mb-4">{role}</p>

      {/* Responsibilities */}
      <ul className="space-y-2 mb-4">
        {responsibilities.map((item, idx) => (
          <li key={idx} className="flex items-start text-sm text-gray-700 dark:text-gray-300">
            <span className="text-secondary mr-2">▪</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {/* Social Links */}
      <div className="flex justify-center space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        <a
          href="#"
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-primary hover:text-white dark:hover:bg-primary transition-colors"
          aria-label="GitHub"
        >
          <Github className="w-4 h-4" />
        </a>
        <a
          href="#"
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-primary hover:text-white dark:hover:bg-primary transition-colors"
          aria-label="LinkedIn"
        >
          <Linkedin className="w-4 h-4" />
        </a>
        <a
          href="#"
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-primary hover:text-white dark:hover:bg-primary transition-colors"
          aria-label="Email"
        >
          <Mail className="w-4 h-4" />
        </a>
      </div>
    </motion.div>
  );
};

const Team: React.FC = () => {
  const teamMembers = [
    {
      name: 'Ziad Behairy',
      role: 'Team Leader & Technical PM',
      responsibilities: ['Project management', 'Scrum Master', 'Architecture decisions', 'Stakeholder communication'],
    },
    {
      name: 'Omar Awad',
      role: 'Mobile App Lead',
      responsibilities: ['Flutter development', 'UI/UX design', 'Firebase integration', 'Mobile testing'],
    },
    {
      name: 'Ahmed Amin',
      role: 'AI/Security Lead',
      responsibilities: ['Conversational AI', 'Emotion recognition', 'Security implementation', 'Compliance'],
    },
    {
      name: 'Mohamed Morshedy',
      role: 'Backend Lead',
      responsibilities: ['Cloud Functions', 'Database design', 'API development', 'DevOps'],
    },
    {
      name: 'Nourhan',
      role: 'Navigation Lead',
      responsibilities: ['SLAM implementation', 'Path planning', 'ROS integration', 'Sensor calibration'],
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
            Meet Our Team
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Team 06 - Dedicated to revolutionizing mobility for Egyptian citizens
          </p>
        </motion.div>

        {/* Team Members Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {teamMembers.map((member, index) => (
            <TeamMemberCard
              key={member.name}
              name={member.name}
              role={member.role}
              responsibilities={member.responsibilities}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Supervisor & Institution Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid md:grid-cols-2 gap-6 mb-12"
        >
          <div className="glass-card p-6">
            <div className="flex items-center mb-4">
              <Users className="w-6 h-6 mr-2 text-primary" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Supervision</h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              <strong>Academic Supervisors:</strong>
            </p>
            <ul className="space-y-1 text-gray-700 dark:text-gray-300">
              <li>• Dr. Elshafei</li>
              <li>• Dr. Abd-Rabou</li>
            </ul>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Providing guidance on architecture, methodology, and technical implementation
            </p>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center mb-4">
              <Award className="w-6 h-6 mr-2 text-accent" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Recognition</h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              <strong>VEX U Worlds 2025</strong>
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              First Egyptian university team to participate in VEX U Worlds robotics competition, demonstrating our
              commitment to innovation and engineering excellence.
            </p>
          </div>
        </motion.div>

        {/* Institution Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="glass-card p-8 text-center"
        >
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Zewail City University</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
            Center for Informatics and Electronics (CIE)
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-4">CIE 460 - Senior Design Project</p>

          <div className="flex items-center justify-center space-x-8 text-sm text-gray-600 dark:text-gray-400">
            <div>
              <strong>Project Start:</strong> October 2025
            </div>
            <div>
              <strong>Final Submission:</strong> June 2026
            </div>
            <div>
              <strong>Duration:</strong> 9 Months
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-gray-700 dark:text-gray-300 italic">
              "Building accessible, affordable mobility solutions for Egypt's 12 million citizens with mobility
              challenges"
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Team;
