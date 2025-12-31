import React from 'react';
import { Github, Linkedin, Mail, Accessibility } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Accessibility className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                SmartWheel
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              AI-Powered Autonomous Wheelchair System
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
              Making mobility accessible and affordable for 12M Egyptians
            </p>
          </div>

          {/* Project Info */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Project Information</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>Zewail City University</li>
              <li>CIE 460 - Senior Design Project</li>
              <li>Fall 2025 - Spring 2026</li>
              <li>Team 06</li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-primary hover:text-white dark:hover:bg-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-primary hover:text-white dark:hover:bg-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:team@smartwheel.com"
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-primary hover:text-white dark:hover:bg-primary transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-4">
              VEX U Worlds 2025 Participants
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>© {currentYear} SmartWheel Project. All rights reserved.</p>
          <p className="mt-1">Powered by innovation and compassion for accessible mobility</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
